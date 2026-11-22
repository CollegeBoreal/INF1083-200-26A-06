import { Injectable } from '@angular/core';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config';
import { Langue } from '../data/langues';
import { ETAPES_CANADA } from '../data/parcours-canada';
import { activerLangue, enregistrerTraductions, tr, traductions } from '../i18n/i18n';
import { TEXTES_UI } from '../i18n/textes-ui';
import { NOMS_DOCS, NOMS_STATUTS } from '../models';

const TAILLE_LOT = 60;

/** Tous les textes de l'app à traduire : l'interface + le contenu des étapes. */
function tousLesTextes(): string[] {
  const ens = new Set<string>(TEXTES_UI);
  for (const e of ETAPES_CANADA) {
    ens.add(e.titre);
    ens.add(e.pourquoi);
    ens.add(e.duree);
    e.comment.forEach((c) => ens.add(c));
  }
  Object.values(NOMS_DOCS).forEach((n) => ens.add(n));
  Object.values(NOMS_STATUTS).forEach((n) => ens.add(n));
  return [...ens].filter((s) => s && /[A-Za-zÀ-ÿ]/.test(s));
}

@Injectable({ providedIn: 'root' })
export class TraductionService {
  /** Combien de textes ne sont pas encore traduits dans cette langue. */
  manquants(code: string): number {
    if (code === 'fr') return 0;
    const d = traductions(code);
    return tousLesTextes().filter((s) => !d[s]).length;
  }

  /**
   * Active la langue et fait traduire en ligne, par l'IA, les textes qui manquent.
   * Les traductions sont gardées sur le téléphone : la prochaine fois, c'est immédiat.
   */
  async preparer(l: Langue, progres?: (pourcent: number) => void): Promise<void> {
    activerLangue(l.code);
    if (l.code === 'fr') return progres?.(100);
    const d = { ...traductions(l.code) };
    const manque = tousLesTextes().filter((s) => !d[s]);
    if (!manque.length) return progres?.(100);

    const lots: string[][] = [];
    for (let i = 0; i < manque.length; i += TAILLE_LOT) lots.push(manque.slice(i, i + TAILLE_LOT));
    let faits = 0;
    progres?.(2);
    // 3 lots à la fois pour aller plus vite
    for (let i = 0; i < lots.length; i += 3) {
      await Promise.all(
        lots.slice(i, i + 3).map(async (lot) => {
          const res = await this.appeler(l.anglais, lot);
          lot.forEach((s, j) => (d[s] = res[j]));
          faits += lot.length;
          enregistrerTraductions(l.code, d);
          progres?.(Math.round((faits / manque.length) * 100));
        })
      );
    }
  }

  private async appeler(langue: string, textes: string[]): Promise<string[]> {
    let rep: Response;
    try {
      rep = await fetch(`${SUPABASE_URL}/functions/v1/assistant`, {
        method: 'POST',
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'traduire', langue, textes }),
      });
    } catch {
      throw new Error(tr('Pas de connexion Internet. Vérifie ton réseau.'));
    }
    let json: any = {};
    try {
      json = await rep.json();
    } catch {
      /* réponse vide */
    }
    if (rep.status === 404) throw new Error("L'assistant n'est pas encore installé sur le serveur (voir ASSISTANT-IA.md).");
    if (!rep.ok || !Array.isArray(json.traductions)) throw new Error(json.erreur || 'Traduction impossible pour le moment. Réessaie.');
    return json.traductions;
  }
}
