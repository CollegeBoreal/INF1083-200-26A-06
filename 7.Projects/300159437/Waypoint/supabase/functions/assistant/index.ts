/*
 * Waypoint — fonction serveur « assistant » (Supabase Edge Function, Deno).
 *
 * L'app envoie la conversation ici ; cette fonction ajoute les consignes,
 * appelle Gemini (Google) avec la clé gardée sur le serveur, et renvoie la réponse.
 * La clé de l'IA n'est JAMAIS dans l'app.
 *
 * Secrets à définir dans Supabase (voir ASSISTANT-IA.md) :
 *   GEMINI_API_KEY   clé de https://aistudio.google.com/apikey
 *   GEMINI_MODEL     (facultatif) modèle, par défaut gemini-3.5-flash
 */

const GEMINI_KEY = Deno.env.get('GEMINI_API_KEY') ?? '';
const MODELE = Deno.env.get('GEMINI_MODEL') ?? 'gemini-3.5-flash';
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return repondre(405, { erreur: 'Méthode non permise.' });

  if (!GEMINI_KEY) {
    return repondre(500, { erreur: "L'assistant n'est pas encore configuré sur le serveur (secret GEMINI_API_KEY manquant)." });
  }

  // 1. Seuls les utilisateurs connectés peuvent utiliser l'assistant.
  const autorisation = req.headers.get('Authorization') ?? '';
  const qui = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: autorisation },
  });
  if (!qui.ok) return repondre(401, { erreur: "Connecte-toi pour utiliser l'assistant." });

  // 2. Lire et nettoyer la conversation.
  let corps: any;
  try {
    corps = await req.json();
  } catch {
    return repondre(400, { erreur: 'Requête invalide.' });
  }
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
    g = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODELE}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: consignes(corps?.contexte ?? {}) }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
      }),
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
