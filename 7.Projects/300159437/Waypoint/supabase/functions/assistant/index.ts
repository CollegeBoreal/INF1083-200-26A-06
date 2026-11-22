/*
 * Waypoint — fonction serveur « assistant » (Supabase Edge Function, Deno).
 *
 * Trois services, tous avec Gemini (Google) et la clé gardée sur le serveur :
 *   mode "chat"      l'assistant répond (utilisateur connecté obligatoire)
 *   mode "voix"      transforme un texte en voix (fichier WAV)
 *   mode "traduire"  traduit les textes de l'app dans la langue choisie
 * La clé de l'IA n'est JAMAIS dans l'app.
 *
 * Secrets à définir dans Supabase (voir ASSISTANT-IA.md) :
 *   GEMINI_API_KEY    clé de https://aistudio.google.com/apikey
 *   GEMINI_MODEL      (facultatif) modèle texte, par défaut gemini-3.5-flash
 *   GEMINI_TTS_MODEL  (facultatif) modèle voix, par défaut gemini-3.1-flash-tts-preview
 *   GEMINI_VOICE      (facultatif) nom de la voix, par défaut Kore
 */

const GEMINI_KEY = Deno.env.get('GEMINI_API_KEY') ?? '';
const MODELE = Deno.env.get('GEMINI_MODEL') ?? 'gemini-3.5-flash';
const MODELE_VOIX = Deno.env.get('GEMINI_TTS_MODEL') ?? 'gemini-3.1-flash-tts-preview';
const NOM_VOIX = Deno.env.get('GEMINI_VOICE') ?? 'Kore';
const GEMINI = 'https://generativelanguage.googleapis.com/v1beta/models';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

const MAX_MESSAGES = 12; // on garde les derniers échanges seulement
const MAX_CARACTERES = 2000; // par message

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function repondre(statut: number, corps: Record<string, unknown>): Response {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { ...CORS, 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function court(v: unknown, max = 120): string {
  return typeof v === 'string' ? v.slice(0, max) : '';
}

function liste(v: unknown): string {
  if (!Array.isArray(v)) return 'aucune';
  const items = v.filter((x) => typeof x === 'string').slice(0, 20).map((x) => court(x));
  return items.length ? items.join(' ; ') : 'aucune';
}

/** Consignes données à l'IA à chaque question. */
function consignes(ctx: Record<string, unknown>): string {
  return `Tu es l'assistant de Waypoint, une application qui guide les nouveaux arrivants au Canada pendant leurs premières semaines (NAS, banque, carte santé, logement, téléphone, permis de conduire, cours de langue, crédit, impôts).

Comment répondre :
- Réponds en ${court(ctx.langue) || 'French'} (la langue choisie dans l'app). Si la personne t'écrit dans une autre langue, réponds dans la langue de son message. Ton chaleureux et simple ; en français, tutoie-la.
- Sois court et concret : 2 à 6 phrases, ou une courte liste avec des tirets. Pas de Markdown (pas d'astérisques, pas de titres).
- Donne la prochaine action claire quand c'est possible (où aller, quel document apporter).
- Quand c'est utile, nomme le site officiel à vérifier (canada.ca, quebec.ca, ontario.ca, ramq.gouv.qc.ca, servicecanada.gc.ca…).
- N'invente jamais un lien, un prix, un délai, une adresse ou un numéro de téléphone. Si tu n'es pas sûr, dis-le et indique où vérifier. Les règles changent : rappelle de confirmer sur le site officiel pour les démarches importantes.
- Tu donnes de l'information générale, pas un avis juridique. Pour une question sur un statut d'immigration, un permis d'études ou de travail, une demande ou un refus, conseille de vérifier sur canada.ca (IRCC) et, si besoin, de consulter un avocat ou un consultant réglementé (membre du CICC).
- Ne demande jamais un numéro d'assurance sociale, de passeport, de carte bancaire ou un mot de passe. Si la personne en écrit un, conseille-lui de ne pas le partager.
- En cas de danger immédiat : 911. En cas de détresse ou d'idées suicidaires : 988 (appel ou texto, partout au Canada).
- Si la question n'a rien à voir avec l'installation au Canada, réponds brièvement puis propose de l'aide pour son installation.

Ce que l'on sait de la personne (elle l'a entré dans l'app) :
- Pays d'origine : ${court(ctx.origine) || 'non précisé'}
- Province : ${court(ctx.province) || 'non précisée'} · Ville : ${court(ctx.ville) || 'non précisée'}
- Statut : ${court(ctx.statut) || 'non précisé'}
- Jour ${Number(ctx.jour) || 1} depuis son arrivée
- Étapes déjà faites : ${liste(ctx.faites)}
- Étapes qui restent : ${liste(ctx.restantes)}`;
}


async function appelerGemini(modele: string, corps: unknown): Promise<Response> {
  return await fetch(`${GEMINI}/${modele}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_KEY },
    body: JSON.stringify(corps),
  });
}

function erreurGemini(g: Response): Response {
  if (g.status === 429) return repondre(429, { erreur: "Le service d'IA est très demandé. Réessaie dans une minute." });
  return repondre(502, { erreur: "Le service d'IA ne répond pas pour le moment. Réessaie." });
}

/** PCM 16 bits mono (ce que renvoie Gemini) → fichier WAV lisible par le téléphone. */
function pcmVersWav(pcm: Uint8Array, frequence = 24000): Uint8Array {
  const wav = new Uint8Array(44 + pcm.length);
  const v = new DataView(wav.buffer);
  const ecrire = (pos: number, txt: string) => [...txt].forEach((c, i) => (wav[pos + i] = c.charCodeAt(0)));
  ecrire(0, 'RIFF');
  v.setUint32(4, 36 + pcm.length, true);
  ecrire(8, 'WAVE');
  ecrire(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); // PCM
  v.setUint16(22, 1, true); // mono
  v.setUint32(24, frequence, true);
  v.setUint32(28, frequence * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  ecrire(36, 'data');
  v.setUint32(40, pcm.length, true);
  wav.set(pcm, 44);
  return wav;
}

function base64VersOctets(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function octetsVersBase64(octets: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < octets.length; i += 0x8000) bin += String.fromCharCode(...octets.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** Mode "voix" : le texte est lu par une voix d'IA naturelle. */
async function voix(corps: any): Promise<Response> {
  const texte = typeof corps?.texte === 'string' ? corps.texte.trim().slice(0, 700) : '';
  if (!texte) return repondre(400, { erreur: 'Texte manquant.' });
  const g = await appelerGemini(MODELE_VOIX, {
    contents: [{ parts: [{ text: texte }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: NOM_VOIX } } },
    },
  });
  if (!g.ok) {
    console.error('Gemini voix', g.status, await g.text());
    return erreurGemini(g);
  }
  const json: any = await g.json();
  const donnees = (json?.candidates?.[0]?.content?.parts ?? []).find((p: any) => p?.inlineData?.data)?.inlineData?.data;
  if (!donnees) return repondre(502, { erreur: 'Aucune voix reçue.' });
  return repondre(200, { audio: octetsVersBase64(pcmVersWav(base64VersOctets(donnees))) });
}

/** Mode "traduire" : traduit une liste de textes de l'app (même ordre, même nombre). */
async function traduire(corps: any): Promise<Response> {
  const langue = court(corps?.langue, 60);
  const textes: string[] = Array.isArray(corps?.textes)
    ? corps.textes.filter((t: unknown) => typeof t === 'string').slice(0, 80).map((t: string) => t.slice(0, 1500))
    : [];
  if (!langue || !textes.length) return repondre(400, { erreur: 'Requête invalide.' });

  const consigne = `Translate each French string of this JSON array into ${langue}, for the interface of a mobile app that helps newcomers settle in Canada.
Rules:
- Return ONLY a JSON array of strings, same length and same order.
- Keep placeholders like {n}, {ville}, {jours} exactly as they are.
- Keep the names Waypoint, TikTok, YouTube, Service Canada, IRCC, RAMQ, NAS/SIN numbers and URLs unchanged.
- Short, natural, friendly wording (informal "you"). Keep capital letters when the French is in capitals.
- Canadian context: keep official program names recognisable (you may add the English or French name in parentheses only if very useful).`;

  const g = await appelerGemini(MODELE, {
    systemInstruction: { parts: [{ text: consigne }] },
    contents: [{ role: 'user', parts: [{ text: JSON.stringify(textes) }] }],
    generationConfig: { temperature: 0.2, responseMimeType: 'application/json', maxOutputTokens: 16000 },
  });
  if (!g.ok) {
    console.error('Gemini traduire', g.status, await g.text());
    return erreurGemini(g);
  }
  const json: any = await g.json();
  const brut = (json?.candidates?.[0]?.content?.parts ?? [])
    .filter((p: any) => !p?.thought && typeof p?.text === 'string')
    .map((p: any) => p.text)
    .join('');
  try {
    const liste = JSON.parse(brut);
    if (!Array.isArray(liste) || liste.length !== textes.length) throw new Error('longueur');
    return repondre(200, { traductions: liste.map((t: unknown, i: number) => (typeof t === 'string' && t.trim() ? t : textes[i])) });
  } catch {
    console.error('Traduction illisible', brut.slice(0, 500));
    return repondre(502, { erreur: 'Traduction impossible pour le moment. Réessaie.' });
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return repondre(405, { erreur: 'Méthode non permise.' });

  if (!GEMINI_KEY) {
    return repondre(500, { erreur: "L'assistant n'est pas encore configuré sur le serveur (secret GEMINI_API_KEY manquant)." });
  }

  let corps: any;
  try {
    corps = await req.json();
  } catch {
    return repondre(400, { erreur: 'Requête invalide.' });
  }

  // Voix et traduction : utilisés dès le choix de la langue, avant la connexion.
  try {
    if (corps?.mode === 'voix') return await voix(corps);
    if (corps?.mode === 'traduire') return await traduire(corps);
  } catch (e) {
    console.error(e);
    return repondre(502, { erreur: "Le service d'IA ne répond pas pour le moment. Réessaie." });
  }

  // 1. Chat : seuls les utilisateurs connectés peuvent utiliser l'assistant.
  const autorisation = req.headers.get('Authorization') ?? '';
  const qui = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: autorisation },
  });
  if (!qui.ok) return repondre(401, { erreur: "Connecte-toi pour utiliser l'assistant." });

  // 2. Lire et nettoyer la conversation.
  const bruts: any[] = Array.isArray(corps?.messages) ? corps.messages.slice(-MAX_MESSAGES) : [];
  const contents = bruts
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m?.texte === 'string' && m.texte.trim())
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.texte.slice(0, MAX_CARACTERES) }] }));
  while (contents.length && contents[0].role !== 'user') contents.shift(); // Gemini commence par l'utilisateur
  if (!contents.length || contents[contents.length - 1].role !== 'user') {
    return repondre(400, { erreur: 'Écris une question.' });
  }

  // 3. Demander à Gemini.
  let g: Response;
  try {
    g = await appelerGemini(MODELE, {
      systemInstruction: { parts: [{ text: consignes(corps?.contexte ?? {}) }] },
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
    });
  } catch {
    return repondre(502, { erreur: "L'assistant ne répond pas pour le moment. Réessaie." });
  }

  if (g.status === 429) {
    return repondre(429, { erreur: "L'assistant reçoit beaucoup de questions. Réessaie dans une minute." });
  }
  if (!g.ok) {
    console.error('Gemini', g.status, await g.text());
    return repondre(502, { erreur: "L'assistant ne répond pas pour le moment. Réessaie." });
  }

  const json: any = await g.json();
  const texte = (json?.candidates?.[0]?.content?.parts ?? [])
    .filter((p: any) => !p?.thought && typeof p?.text === 'string')
    .map((p: any) => p.text)
    .join('')
    .replace(/\*\*/g, '')
    .trim();

  if (!texte) return repondre(502, { erreur: "Je n'ai pas pu répondre à cette question. Essaie de la formuler autrement." });
  return repondre(200, { texte });
});
