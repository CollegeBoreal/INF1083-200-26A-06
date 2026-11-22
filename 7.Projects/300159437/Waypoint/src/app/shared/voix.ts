import { isAndroid, isIOS, Utils } from '@nativescript/core';

/*
 * Voix de l'assistant : la synthèse vocale intégrée au téléphone
 * (Android TextToSpeech, iOS AVSpeechSynthesizer).
 * Gratuite, instantanée, fonctionne sans Internet. Aucun plugin à installer.
 */

const G: any = globalThis;

let tts: any = null; // Android
let ttsPret = false;
let enAttente: (() => void) | null = null;
let synth: any = null; // iOS

/** Le moteur de synthèse prononce mal « Waypoint » en français : on l'écrit comme il se dit. */
function prononciation(texte: string, langue: string): string {
  return langue.startsWith('fr') ? texte.replace(/Waypoint/g, 'Ouaye-pointe') : texte;
}

function demarrerAndroid(): void {
  if (tts) return;
  const TTS = G.android.speech.tts.TextToSpeech;
  tts = new TTS(
    Utils.android.getApplicationContext(),
    new TTS.OnInitListener({
      onInit(statut: number) {
        ttsPret = statut === TTS.SUCCESS;
        if (ttsPret && enAttente) {
          const f = enAttente;
          enAttente = null;
          f();
        }
      },
    })
  );
}

/** Prépare la voix à l'avance (Android met un moment à s'initialiser). */
export function preparerVoix(): void {
  if (isAndroid) demarrerAndroid();
}

/** Fait parler l'assistant. `langue` : ex. « fr-CA », « ar », « zh-CN ». */
export function parler(texte: string, langue: string): void {
  const dit = prononciation(texte, langue);
  try {
    if (isAndroid) {
      const lancer = () => {
        const TTS = G.android.speech.tts.TextToSpeech;
        tts.setLanguage(G.java.util.Locale.forLanguageTag(langue));
        tts.setSpeechRate(0.95);
        tts.speak(dit, TTS.QUEUE_FLUSH, null, 'waypoint');
      };
      demarrerAndroid();
      if (ttsPret) lancer();
      else enAttente = lancer;
    } else if (isIOS) {
      try {
        // La voix s'entend même si le téléphone est en mode silencieux.
        G.AVAudioSession.sharedInstance().setCategoryError(G.AVAudioSessionCategoryPlayback);
      } catch {
        /* sans importance */
      }
      if (!synth) synth = G.AVSpeechSynthesizer.new();
      synth.stopSpeakingAtBoundary(0);
      const u = G.AVSpeechUtterance.speechUtteranceWithString(dit);
      const v = G.AVSpeechSynthesisVoice.voiceWithLanguage(langue);
      if (v) u.voice = v;
      synth.speakUtterance(u);
    }
  } catch (e) {
    console.log('Voix indisponible', e);
  }
}

export function arreterVoix(): void {
  try {
    if (isAndroid && tts) tts.stop();
    if (isIOS && synth) synth.stopSpeakingAtBoundary(0);
  } catch {
    /* rien */
  }
  enAttente = null;
}

/** Durée approximative de la phrase (pour l'animation de l'onde). */
export function dureeParole(texte: string): number {
  return Math.min(14000, Math.max(2500, texte.length * 75));
}
