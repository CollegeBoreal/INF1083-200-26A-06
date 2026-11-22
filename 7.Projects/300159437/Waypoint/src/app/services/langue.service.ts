import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { Langue, trouverLangue } from '../data/langues';
import { arreterVoix, parler } from '../shared/voix';

const CLE_LANGUE = 'waypoint.langue';
const CLE_VOIX = 'waypoint.voix';

@Injectable({ providedIn: 'root' })
export class LangueService {
  /** L'assistant a déjà salué depuis l'ouverture de l'app. */
  dejaSalue = false;

  get choisie(): boolean {
    return ApplicationSettings.hasKey(CLE_LANGUE);
  }

  get code(): string {
    return ApplicationSettings.getString(CLE_LANGUE, 'fr');
  }

  langue(): Langue {
    return trouverLangue(this.code);
  }

  choisir(code: string): void {
    ApplicationSettings.setString(CLE_LANGUE, code);
  }

  /** Voix de l'assistant activée (oui par défaut). */
  get voixActive(): boolean {
    return ApplicationSettings.getBoolean(CLE_VOIX, true);
  }

  set voixActive(v: boolean) {
    ApplicationSettings.setBoolean(CLE_VOIX, v);
    if (!v) arreterVoix();
  }

  /** Fait parler l'assistant dans la langue choisie, si la voix est activée. */
  dire(texte: string, forcer = false): void {
    if (this.voixActive || forcer) parler(texte, this.langue().voix);
  }
}
