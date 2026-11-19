import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { Profil } from '../models';

const CLE = 'etape.profil';

@Injectable({ providedIn: 'root' })
export class ProfilService {
  get(): Profil | null {
    const brut = ApplicationSettings.getString(CLE);
    return brut ? (JSON.parse(brut) as Profil) : null;
  }

  enregistrer(profil: Profil): void {
    ApplicationSettings.setString(CLE, JSON.stringify(profil));
  }

  effacer(): void {
    ApplicationSettings.remove(CLE);
  }

  /** Jour 1 = le jour de l'arrivée. */
  jour(): number {
    const p = this.get();
    if (!p) return 1;
    const ms = Date.now() - new Date(p.arrivee).getTime();
    return Math.max(1, Math.floor(ms / 86400000) + 1);
  }
}
