import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config';
import { AuthService } from './auth.service';
import { ParcoursService } from './parcours.service';
import { ProfilService } from './profil.service';

const CLE_DERNIERE = 'etape.derniere-synchro';

/**
 * Sauvegarde en ligne du profil et des étapes faites (table "progression").
 * Les documents du coffre ne sont JAMAIS envoyés : ils restent sur le téléphone.
 */
@Injectable({ providedIn: 'root' })
export class SyncService {
  constructor(private auth: AuthService, private profil: ProfilService, private parcours: ParcoursService) {}

  get derniereSynchro(): string {
    return ApplicationSettings.getString(CLE_DERNIERE, '');
  }

  private async entetes(): Promise<Record<string, string> | null> {
    const jeton = await this.auth.jeton();
    if (!jeton) return null;
    return { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${jeton}`, 'Content-Type': 'application/json' };
  }

  /** Envoie la progression locale vers le serveur. */
  async envoyer(): Promise<boolean> {
    const h = await this.entetes();
    if (!h) return false;
    try {
      const rep = await fetch(`${SUPABASE_URL}/rest/v1/progression?on_conflict=user_id`, {
        method: 'POST',
        headers: { ...h, Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({
          user_id: this.auth.userId,
          profil: this.profil.get(),
          faites: this.parcours.faitesListe(),
          mis_a_jour: new Date().toISOString(),
        }),
      });
      if (rep.ok) ApplicationSettings.setString(CLE_DERNIERE, new Date().toISOString());
      return rep.ok;
    } catch {
      return false; // hors ligne
    }
  }

  /** Récupère la progression du serveur (ex. nouveau téléphone). */
  async recuperer(): Promise<boolean> {
    const h = await this.entetes();
    if (!h) return false;
    try {
      const rep = await fetch(`${SUPABASE_URL}/rest/v1/progression?select=profil,faites&user_id=eq.${this.auth.userId}`, { headers: h });
      if (!rep.ok) return false;
      const lignes = await rep.json();
      if (lignes.length) {
        if (lignes[0].profil) this.profil.enregistrer(lignes[0].profil);
        this.parcours.remplacerFaites(lignes[0].faites ?? []);
      }
      ApplicationSettings.setString(CLE_DERNIERE, new Date().toISOString());
      return true;
    } catch {
      return false;
    }
  }

  /** Après une connexion : si le serveur a déjà un parcours, on le prend ; sinon on envoie celui du téléphone. */
  async apresConnexion(): Promise<void> {
    const h = await this.entetes();
    if (!h) return;
    try {
      const rep = await fetch(`${SUPABASE_URL}/rest/v1/progression?select=user_id&user_id=eq.${this.auth.userId}`, { headers: h });
      const lignes = rep.ok ? await rep.json() : [];
      if (lignes.length) await this.recuperer();
      else if (this.profil.get()) await this.envoyer();
    } catch {
      /* hors ligne */
    }
  }
}
