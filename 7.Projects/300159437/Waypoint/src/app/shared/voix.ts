import { File, isAndroid, isIOS, knownFolders, path } from '@nativescript/core';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config';

/*
 * Voix de l'assistant : une voix d'IA naturelle (Gemini), générée en ligne
 * par la fonction serveur Supabase « assistant » (mode "voix").
 * Chaque phrase n'est générée qu'une fois : le fichier est gardé pour les fois suivantes.
 */

const G: any = globalThis;

let lecteur: any = null; // Android MediaPlayer ou iOS AVAudioPlayer
let tour = 0; // pour ignorer une voix arrivée après un « stop »

function cle(texte: string, langue: string): string {
  let h = 5381;
  const s = langue + '|' + texte;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return 'v' + (h >>> 0).toString(36);
}

function dossierVoix(): string {
  return knownFolders.documents().getFolder('voix').path;
}

/** Écrit l'audio reçu (base64) dans un fichier .wav. */
function ecrireWav(base64: string, chemin: string): void {
  if (isAndroid) {
    const octets = G.android.util.Base64.decode(base64, G.android.util.Base64.DEFAULT);
    const flux = new G.java.io.FileOutputStream(chemin);
    flux.write(octets);
    flux.close();
  } else if (isIOS) {
    const data = G.NSData.alloc().initWithBase64EncodedStringOptions(base64, 0);
    data.writeToFileAtomically(chemin, true);
  }
}

/** Joue le fichier et retourne sa durée en millisecondes. */
function jouer(chemin: string): number {
  arreterLecteur();
  if (isAndroid) {
    const mp = new G.android.media.MediaPlayer();
    mp.setDataSource(chemin);
    mp.prepare();
    mp.start();
    lecteur = mp;
    return mp.getDuration();
  }
  if (isIOS) {
    try {
      // La voix s'entend même si le téléphone est en mode silencieux.
      G.AVAudioSession.sharedInstance().setCategoryError(G.AVAudioSessionCategoryPlayback);
    } catch {
      /* sans importance */
    }
    const p = G.AVAudioPlayer.alloc().initWithContentsOfURLError(G.NSURL.fileURLWithPath(chemin));
    p.play();
    lecteur = p;
    return Math.round(p.duration * 1000);
  }
  return 0;
}

function arreterLecteur(): void {
  try {
    if (lecteur) {
      if (isAndroid) {
        lecteur.stop();
        lecteur.release();
      } else lecteur.stop();
    }
  } catch {
    /* rien */
  }
  lecteur = null;
}

/**
 * Fait parler l'assistant. Retourne la durée de la phrase (ms), ou 0 si la voix
 * n'a pas pu être obtenue (pas d'Internet, serveur pas encore installé…).
 */
export async function parler(texte: string, langue: string): Promise<number> {
  const monTour = ++tour;
  try {
    const chemin = path.join(dossierVoix(), cle(texte, langue) + '.wav');
    if (!File.exists(chemin)) {
      const rep = await fetch(`${SUPABASE_URL}/functions/v1/assistant`, {
        method: 'POST',
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'voix', texte, langue }),
      });
      const json: any = await rep.json();
      if (!rep.ok || !json.audio) {
        console.log('Voix indisponible :', json?.erreur ?? rep.status);
        return 0;
      }
      ecrireWav(json.audio, chemin);
    }
    if (monTour !== tour) return 0; // on a demandé d'arrêter entre-temps
    return jouer(chemin);
  } catch (e) {
    console.log('Voix indisponible', e);
    return 0;
  }
}

export function arreterVoix(): void {
  tour++;
  arreterLecteur();
}
