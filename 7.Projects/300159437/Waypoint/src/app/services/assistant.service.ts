import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config';
import { NOMS_STATUTS } from '../models';
import { AuthService } from './auth.service';
import { LangueService } from './langue.service';
import { ParcoursService } from './parcours.service';
import { ProfilService } from './profil.service';

export interface MessageIA {
  role: 'user' | 'assistant';
  texte: string;
}

const CLE = 'waypoint.assistant';
const PROVINCES: Record<string, string> = { QC: 'Québec', ON: 'Ontario' };

/**
 * Assistant IA : la conversation reste sur le téléphone, et chaque question
 * passe par la fonction serveur Supabase « assistant » (la clé de l'IA y est cachée).
 */
@Injectable({ providedIn: 'root' })
export class AssistantService {
  constructor(
    private auth: AuthService,
    private profil: ProfilService,
    private parcours: ParcoursService,
    private langue: LangueService
  ) {}

  historique(): MessageIA[] {
    return JSON.parse(ApplicationSettings.getString(CLE, '[]'));
  }

  private garder(messages: MessageIA[]): void {
    ApplicationSettings.setString(CLE, JSON.stringify(messages.slice(-40)));
  }

  effacer(): void {
    ApplicationSettings.remove(CLE);
  }

  /** Ce que l'IA sait de la personne, pour des réponses adaptées. */
  private contexte(): object {
    const p = this.profil.get();
    const etapes = this.parcours.etapes();
    return {
      langue: this.langue.langue().anglais,
      origine: p?.origine ?? '',
      province: p ? PROVINCES[p.province] ?? p.province : '',
      ville: p?.ville ?? '',
      statut: p ? NOMS_STATUTS[p.statut] : '',
      jour: this.profil.jour(),
      faites: etapes.filter((e) => this.parcours.estFaite(e.id)).map((e) => e.titre),
      restantes: etapes.filter((e) => !this.parcours.estFaite(e.id)).map((e) => e.titre),
    };
  }

  /** Envoie la question, retourne la conversation mise à jour. */
  async demander(question: string): Promise<MessageIA[]> {
    const jeton = await this.auth.jeton();
    if (!jeton) throw new Error("Connecte-toi pour utiliser l'assistant.");

    // La question n'est gardée qu'avec sa réponse : en cas d'erreur, rien n'est enregistré.
    const messages = [...this.historique(), { role: 'user', texte: question } as MessageIA];

    let rep: Response;
    try {
      rep = await fetch(`${SUPABASE_URL}/functions/v1/assistant`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${jeton}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messages.slice(-12), contexte: this.contexte() }),
      });
    } catch {
      throw new Error('Pas de connexion Internet. Vérifie ton réseau.');
    }

    const texte = await rep.text();
    let json: any = {};
    try {
      json = texte ? JSON.parse(texte) : {};
    } catch {
      /* réponse non JSON */
    }
    if (rep.status === 404) throw new Error("L'assistant n'est pas encore installé sur le serveur (voir ASSISTANT-IA.md).");
    if (!rep.ok || !json.texte) throw new Error(json.erreur || "L'assistant ne répond pas pour le moment. Réessaie.");

    const suite = [...messages, { role: 'assistant', texte: json.texte } as MessageIA];
    this.garder(suite);
    return suite;
  }
}
