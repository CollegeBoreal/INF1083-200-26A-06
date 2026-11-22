import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { supabaseConfigure } from '../config';
import { AuthService } from '../services/auth.service';
import { ProfilService } from '../services/profil.service';
import { SyncService } from '../services/sync.service';
import { LogoComponent } from '../shared/logo.component';
import { preparerPage } from '../shared/ui';
import { tr } from '../i18n/i18n';

@Component({
  selector: 'connexion',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, LogoComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" class="fond">
      <ScrollView row="0">
        <StackLayout class="page">
          <StackLayout class="entree" marginTop="8"><logo-etape></logo-etape></StackLayout>

          <StackLayout class="entree-2" marginTop="28" marginBottom="20">
            <Label class="titre" [text]="modeInscription ? t('Crée ton compte.') : t('Content de te revoir.')" textWrap="true"></Label>
            <Label class="texte" textWrap="true" [text]="t('Ton parcours est sauvegardé en ligne. Tu le retrouves sur n\\'importe quel téléphone.')"></Label>
          </StackLayout>

          <StackLayout class="question entree-3">
            <Label class="q-titre" [text]="t('Courriel')"></Label>
            <TextField class="champ r" hint="toi@exemple.com" keyboardType="email" autocapitalizationType="none"
                       autocorrect="false" [(ngModel)]="email"></TextField>
            <Label class="q-titre" marginTop="16" [text]="t('Mot de passe')"></Label>
            <TextField class="champ r" [hint]="t('6 caractères minimum')" secure="true" [(ngModel)]="motDePasse"></TextField>
          </StackLayout>

          @if (erreur) {
            <GridLayout columns="auto, *" class="carte-alerte">
              <Label col="0" class="ico accent-texte" fontSize="20" marginRight="10" text="&#xe002;"></Label>
              <Label col="1" class="sb" fontSize="14" [text]="erreur" textWrap="true"></Label>
            </GridLayout>
          }
          @if (info) {
            <StackLayout class="carte" marginTop="16">
              <Label class="sb" fontSize="14" [text]="info" textWrap="true"></Label>
            </StackLayout>
          }

          <Label class="b accent-texte centre" fontSize="15" marginTop="20"
                 [text]="modeInscription ? t('J\\'ai déjà un compte') : t('Créer un compte')" (tap)="basculerMode()"></Label>
        </StackLayout>
      </ScrollView>

      <StackLayout row="1" class="pied">
        <FlexboxLayout class="btn btn-accent" [opacity]="chargement ? 0.6 : 1" justifyContent="center" alignItems="center" (tap)="valider()">
          <Label class="btn-txt" [text]="chargement ? t('Un instant…') : (modeInscription ? t('Créer mon compte') : t('Se connecter'))"></Label>
        </FlexboxLayout>
      </StackLayout>
    </GridLayout>
  `,
})
export class ConnexionComponent {
  t = tr;
  email = '';
  motDePasse = '';
  modeInscription = false;
  chargement = false;
  erreur = '';
  info = '';

  constructor(
    private cdr: ChangeDetectorRef,
    page: Page,
    private auth: AuthService,
    private sync: SyncService,
    private profil: ProfilService,
    private router: RouterExtensions,
    route: ActivatedRoute
  ) {
    preparerPage(page);
    this.modeInscription = route.snapshot.queryParamMap.get('inscription') === '1';
    if (!supabaseConfigure()) {
      this.erreur = tr('Le serveur n\'est pas encore configuré (fichier src/app/config.ts).');
    }
  }

  basculerMode(): void {
    this.modeInscription = !this.modeInscription;
    this.erreur = '';
    this.info = '';
  }

  async valider(): Promise<void> {
    if (this.chargement) return;
    this.erreur = '';
    this.info = '';
    const email = this.email.trim().toLowerCase();
    if (!email || this.motDePasse.length < 6) {
      this.erreur = tr('Entre ton courriel et un mot de passe de 6 caractères minimum.');
      return;
    }
    this.chargement = true;
    this.cdr.markForCheck();
    try {
      if (this.modeInscription) {
        const ok = await this.auth.inscrire(email, this.motDePasse);
        if (!ok) {
          this.info = tr('Compte créé. Ouvre le lien reçu par courriel pour le confirmer, puis connecte-toi.');
          this.modeInscription = false;
          return;
        }
      } else {
        await this.auth.connecter(email, this.motDePasse);
      }
      await this.sync.apresConnexion();
      this.suite();
    } catch (e: any) {
      this.erreur = tr(e?.message ?? 'Une erreur est survenue.');
    } finally {
      this.chargement = false;
      this.cdr.markForCheck();
    }
  }

  private suite(): void {
    const cible = this.profil.get() ? '/parcours' : '/bienvenue';
    this.router.navigate([cible], { clearHistory: true, transition: { name: 'fade', duration: 200 } });
  }
}
