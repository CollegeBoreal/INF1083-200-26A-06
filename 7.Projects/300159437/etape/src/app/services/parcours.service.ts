import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { ETAPES_CANADA } from '../data/parcours-canada';
import { Etape } from '../models';
import { ProfilService } from './profil.service';

const CLE_FAITES = 'etape.faites';

@Injectable({ providedIn: 'root' })
export class ParcoursService {
  constructor(private profil: ProfilService) {}

  /** Les étapes qui concernent ce profil, dans l'ordre. */
  etapes(): Etape[] {
    const p = this.profil.get();
    if (!p) return [];
    return ETAPES_CANADA.filter(
      (e) =>
        (e.statuts === 'tous' || e.statuts.includes(p.statut)) &&
        (!e.provinces || e.provinces.includes(p.province))
    );
  }

  get(id: string): Etape | undefined {
    return ETAPES_CANADA.find((e) => e.id === id);
  }

  private faites(): string[] {
    return JSON.parse(ApplicationSettings.getString(CLE_FAITES, '[]'));
  }

  estFaite(id: string): boolean {
    return this.faites().includes(id);
  }

  basculer(id: string): void {
    const f = this.faites();
    const i = f.indexOf(id);
    if (i >= 0) f.splice(i, 1);
    else f.push(id);
    ApplicationSettings.setString(CLE_FAITES, JSON.stringify(f));
  }

  prochaine(): Etape | undefined {
    return this.etapes().find((e) => !this.estFaite(e.id));
  }

  progression(): { faites: number; total: number; pourcent: number } {
    const toutes = this.etapes();
    const faites = toutes.filter((e) => this.estFaite(e.id)).length;
    const total = toutes.length;
    return { faites, total, pourcent: total ? Math.round((faites / total) * 100) : 0 };
  }

  reinitialiser(): void {
    ApplicationSettings.remove(CLE_FAITES);
  }
}
