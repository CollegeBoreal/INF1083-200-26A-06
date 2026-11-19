import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config';

interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number; // secondes (epoch)
  user: { id: string; email: string };
}

const CLE_SESSION = 'etape.session';
const CLE_INVITE = 'etape.invite';

/** Traduit les messages d'erreur de Supabase en français simple. */
function messageErreur(corps: any): string {
  const brut: string = corps?.error_description || corps?.msg || corps?.message || corps?.error || '';
  const m = brut.toLowerCase();
  if (m.includes('invalid login')) return 'Courriel ou mot de passe incorrect.';
  if (m.includes('already registered') || m.includes('already been registered')) return 'Ce courriel a déjà un compte. Connecte-toi.';
  if (m.includes('password') && m.includes('6')) return 'Le mot de passe doit avoir au moins 6 caractères.';
  if (m.includes('email not confirmed')) return 'Confirme ton courriel avec le lien reçu, puis reconnecte-toi.';
  if (m.includes('invalid') && m.includes('email')) return 'Ce courriel n\'est pas valide.';
  return brut || 'Une erreur est survenue. Réessaie.';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private get session(): Session | null {
    const s = ApplicationSettings.getString(CLE_SESSION);
    return s ? JSON.parse(s) : null;
  }

  private set session(s: Session | null) {
    if (s) ApplicationSettings.setString(CLE_SESSION, JSON.stringify(s));
    else ApplicationSettings.remove(CLE_SESSION);
  }

  get connecte(): boolean {
    return !!this.session;
  }

  get email(): string {
    return this.session?.user.email ?? '';
  }

  get userId(): string {
    return this.session?.user.id ?? '';
  }

  /** L'utilisateur a choisi « Continuer sans compte ». */
  get invite(): boolean {
    return ApplicationSettings.getBoolean(CLE_INVITE, false);
  }

  continuerSansCompte(): void {
    ApplicationSettings.setBoolean(CLE_INVITE, true);
  }

  private async appeler(chemin: string, corps: object, jeton?: string): Promise<any> {
    let rep: Response;
    try {
      rep = await fetch(`${SUPABASE_URL}${chemin}`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          ...(jeton ? { Authorization: `Bearer ${jeton}` } : {}),
        },
        body: JSON.stringify(corps),
      });
    } catch {
      throw new Error('Pas de connexion Internet. Vérifie ton réseau.');
    }
    const texte = await rep.text();
    const json = texte ? JSON.parse(texte) : {};
    if (!rep.ok) throw new Error(messageErreur(json));
    return json;
  }

  private garder(json: any): void {
    this.session = {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_at: json.expires_at ?? Math.floor(Date.now() / 1000) + (json.expires_in ?? 3600),
      user: { id: json.user.id, email: json.user.email },
    };
    ApplicationSettings.remove(CLE_INVITE);
  }

  /** Crée un compte. Retourne false si Supabase demande de confirmer le courriel d'abord. */
  async inscrire(email: string, motDePasse: string): Promise<boolean> {
    const json = await this.appeler('/auth/v1/signup', { email, password: motDePasse });
    if (json.access_token) {
      this.garder(json);
      return true;
    }
    return false; // confirmation par courriel activée
  }

  async connecter(email: string, motDePasse: string): Promise<void> {
    const json = await this.appeler('/auth/v1/token?grant_type=password', { email, password: motDePasse });
    this.garder(json);
  }

  /** Jeton valide pour appeler la base (renouvelé automatiquement). */
  async jeton(): Promise<string | null> {
    const s = this.session;
    if (!s) return null;
    const maintenant = Math.floor(Date.now() / 1000);
    if (s.expires_at - 60 > maintenant) return s.access_token;
    try {
      const json = await this.appeler('/auth/v1/token?grant_type=refresh_token', { refresh_token: s.refresh_token });
      this.garder(json);
      return json.access_token;
    } catch {
      return null; // hors ligne : on réessaiera plus tard
    }
  }

  async deconnecter(): Promise<void> {
    const s = this.session;
    if (s) {
      try {
        await this.appeler('/auth/v1/logout', {}, s.access_token);
      } catch {
        /* hors ligne : on efface quand même la session locale */
      }
    }
    this.session = null;
  }
}
