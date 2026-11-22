import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Dialogs, Page } from '@nativescript/core';
import { NOMS_STATUTS } from '../models';
import { AuthService } from '../services/auth.service';
import { LangueService } from '../services/langue.service';
import { ProfilService } from '../services/profil.service';
import { SyncService } from '../services/sync.service';
import { preparerPage } from '../shared/ui';
import { tr } from '../i18n/i18n';

@Component({
  selector: 'compte',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ScrollView class="fond">
      <StackLayout class="page">
        <GridLayout class="rond-btn" horizontalAlignment="left" (tap)="router.back()">
          <Label class="ico rond-ico" text="&#xe5cb;"></Label>
        </GridLayout>

        <Label class="titre entree" marginTop="20" [text]="t('Mon compte')"></Label>

        @if (auth.connecte) {
          <GridLayout columns="auto, *" class="carte entree-2" marginTop="16">
            <GridLayout col="0" class="tuile-ico tuile-ico-noire">
              <Label class="ico tuile-ico-txt blanc" text="&#xe7fd;"></Label>
            </GridLayout>
            <StackLayout col="1" verticalAlignment="center">
              <Label class="ligne-txt" [text]="auth.email" textWrap="true"></Label>
              <Label class="petit" [text]="etatSynchro"></Label>
            </StackLayout>
          </GridLayout>

          <FlexboxLayout class="btn btn-noir entree-2" marginTop="14" justifyContent="center" alignItems="center" (tap)="synchroniser()">
            <Label class="ico btn-ico" text="&#xe627;"></Label>
            <Label class="btn-txt" [text]="enCours ? t('Synchronisation…') : t('Synchroniser maintenant')"></Label>
          </FlexboxLayout>
        } @else {
          <StackLayout class="carte-noire entree-2">
            <Label class="oeil-clair" [text]="t('SANS COMPTE')"></Label>
            <Label class="carte-titre" textWrap="true" [text]="t('Sauvegarde ton parcours en ligne.')"></Label>
            <Label class="meta" textWrap="true" marginBottom="16" [text]="t('Si tu perds ou changes de téléphone, tu retrouves tout.')"></Label>
            <FlexboxLayout class="btn btn-accent" justifyContent="center" alignItems="center" (tap)="seConnecter()">
              <Label class="btn-txt" [text]="t('Créer un compte ou se connecter')"></Label>
            </FlexboxLayout>
          </StackLayout>
        }

        @if (profilTxt) {
          <Label class="etiquette entree-3" [text]="t('MON PROFIL')"></Label>
          <StackLayout class="carte entree-3">
            <Label class="ligne-txt" [text]="profilTxt" textWrap="true"></Label>
          </StackLayout>
        }

        <Label class="etiquette entree-3" [text]="t('OPTIONS')"></Label>
        <StackLayout class="liste entree-3">
          <GridLayout columns="auto, *, auto" class="ligne" (tap)="changerLangue()">
            <GridLayout col="0" class="tuile-ico"><Label class="ico tuile-ico-txt" text="&#xe894;"></Label></GridLayout>
            <StackLayout col="1" verticalAlignment="center">
              <Label class="ligne-txt" [text]="t('Langue')"></Label>
              <Label class="petit" [text]="nomLangue"></Label>
            </StackLayout>
            <Label col="2" class="ico chevron" text="&#xe5cc;"></Label>
          </GridLayout>
          <GridLayout columns="auto, *, auto" class="ligne" (tap)="basculerVoix()">
            <GridLayout col="0" class="tuile-ico">
              @if (voix) { <Label class="ico tuile-ico-txt" text="&#xe050;"></Label> } @else { <Label class="ico tuile-ico-txt" text="&#xe04f;"></Label> }
            </GridLayout>
            <StackLayout col="1" verticalAlignment="center">
              <Label class="ligne-txt" [text]="t('Voix de l\\'assistant')"></Label>
              <Label class="petit" [text]="voix ? t('Elle te parle quand tu ouvres l’app') : t('Désactivée')"></Label>
            </StackLayout>
            <Switch col="2" [checked]="voix" isUserInteractionEnabled="false" class="interrupteur"></Switch>
          </GridLayout>
          <GridLayout columns="auto, *, auto" class="ligne" [class.ligne-derniere]="!auth.connecte" (tap)="recommencer()">
            <GridLayout col="0" class="tuile-ico"><Label class="ico tuile-ico-txt" text="&#xe042;"></Label></GridLayout>
            <Label col="1" class="ligne-txt" [text]="t('Refaire les 3 questions')"></Label>
            <Label col="2" class="ico chevron" text="&#xe5cc;"></Label>
          </GridLayout>
          @if (auth.connecte) {
            <GridLayout columns="auto, *, auto" class="ligne ligne-derniere" (tap)="deconnecter()">
              <GridLayout col="0" class="tuile-ico tuile-ico-rouge"><Label class="ico tuile-ico-txt accent-texte" text="&#xe9ba;"></Label></GridLayout>
              <Label col="1" class="ligne-txt accent-texte" [text]="t('Se déconnecter')"></Label>
              <Label col="2" class="ico chevron" text="&#xe5cc;"></Label>
            </GridLayout>
          }
        </StackLayout>

        <Label class="petit centre" marginTop="24" textWrap="true"
               [text]="t('Tes documents du coffre ne quittent jamais ton téléphone. Seule ta progression est sauvegardée en ligne.')"></Label>
      </StackLayout>
    </ScrollView>
  `,
})
export class CompteComponent {
  t = tr;
  enCours = false;
  profilTxt = '';
  nomLangue = '';
  voix = true;

  constructor(
    private cdr: ChangeDetectorRef,
    page: Page,
    public auth: AuthService,
    private sync: SyncService,
    private profil: ProfilService,
    private langue: LangueService,
    public router: RouterExtensions
  ) {
    preparerPage(page);
    page.on('navigatedTo', () => this.charger());
    this.charger();
  }

  get etatSynchro(): string {
    const d = this.sync.derniereSynchro;
    if (!d) return tr('Pas encore synchronisé');
    const date = new Date(d);
    return tr('Synchronisé le {date} à {heure}', { date: date.toLocaleDateString(), heure: date.toLocaleTimeString().slice(0, 5) });
  }

  charger(): void {
    const p = this.profil.get();
    this.profilTxt = p ? `${p.origine} → ${p.ville} · ${tr(NOMS_STATUTS[p.statut])}` : '';
    this.nomLangue = this.langue.langue().nom;
    this.voix = this.langue.voixActive;
    this.cdr.markForCheck();
  }

  async synchroniser(): Promise<void> {
    if (this.enCours) return;
    this.enCours = true;
    this.cdr.markForCheck();
    const ok = await this.sync.envoyer();
    this.enCours = false;
    this.cdr.markForCheck();
    if (!ok) Dialogs.alert({ message: tr('Impossible de synchroniser. Vérifie ta connexion Internet.'), okButtonText: 'OK' });
  }

  changerLangue(): void {
    this.router.navigate(['/langue'], { transition: { name: 'slideLeft', duration: 250 } });
  }

  basculerVoix(): void {
    this.langue.voixActive = !this.langue.voixActive;
    this.voix = this.langue.voixActive;
    this.cdr.markForCheck();
  }

  seConnecter(): void {
    this.router.navigate(['/connexion'], { transition: { name: 'slideTop', duration: 250 } });
  }

  async recommencer(): Promise<void> {
    const ok = await Dialogs.confirm({
      title: tr('Recommencer ?'),
      message: tr('Tu vas répondre de nouveau aux 3 questions. Tes documents restent dans ton coffre.'),
      okButtonText: tr('Recommencer'),
      cancelButtonText: tr('Annuler'),
    });
    if (ok) {
      this.profil.effacer();
      this.router.navigate(['/bienvenue'], { clearHistory: true });
    }
  }

  async deconnecter(): Promise<void> {
    const ok = await Dialogs.confirm({
      message: tr('Te déconnecter ?'),
      okButtonText: tr('Se déconnecter'),
      cancelButtonText: tr('Annuler'),
    });
    if (!ok) return;
    await this.auth.deconnecter();
    this.router.navigate(['/connexion'], { clearHistory: true });
  }
}
