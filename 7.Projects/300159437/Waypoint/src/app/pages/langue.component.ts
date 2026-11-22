import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, OnDestroy } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { Langue, LANGUES } from '../data/langues';
import { tr } from '../i18n/i18n';
import { LangueService } from '../services/langue.service';
import { TraductionService } from '../services/traduction.service';
import { LogoComponent } from '../shared/logo.component';
import { OndeComponent } from '../shared/onde.component';
import { preparerPage } from '../shared/ui';
import { arreterVoix } from '../shared/voix';

/**
 * Premier écran : choisir sa langue.
 * L'assistant se présente avec une voix d'IA, puis l'app entière est préparée dans cette langue.
 */
@Component({
  selector: 'langue',
  standalone: true,
  imports: [NativeScriptCommonModule, LogoComponent, OndeComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" class="fond">
      <ScrollView row="0">
        <StackLayout class="page">
          <StackLayout marginTop="8"><logo-etape></logo-etape></StackLayout>

          <StackLayout marginTop="24">
            <Label class="titre" [text]="choix ? choix.choisir : 'Choisis ta langue'" textWrap="true"></Label>
            <Label class="petit" color="#5F6368" marginTop="4" textWrap="true"
                   text="Choose your language · Elige tu idioma · اختر لغتك · 选择你的语言"></Label>
          </StackLayout>

          <!-- L'assistant parle -->
          @if (choix) {
            <GridLayout columns="auto, *, auto" class="carte-voix" (tap)="reecouter()">
              <GridLayout col="0" class="chat-avatar">
                <Label class="ico chat-avatar-ico" text="&#xe39f;"></Label>
              </GridLayout>
              <StackLayout col="1">
                <onde-voix [actif]="parle"></onde-voix>
                <Label class="voix-txt" [text]="choix.accueil" textWrap="true" [textAlignment]="choix.rtl ? 'right' : 'left'"></Label>
                @if (chargementVoix) {
                  <Label class="petit gris-clair" marginTop="6" text="…"></Label>
                }
              </StackLayout>
              <Label col="2" class="ico voix-rejouer" verticalAlignment="top" text="&#xe050;"></Label>
            </GridLayout>
          }

          <FlexboxLayout flexWrap="wrap" justifyContent="space-between" marginTop="18">
            @for (l of langues; track l.code) {
              <StackLayout class="langue" [class.langue-active]="choix?.code === l.code" (tap)="choisir(l)">
                <Label class="langue-nom" [class.blanc]="choix?.code === l.code" [text]="l.nom"></Label>
                <Label class="langue-sous" [class.gris-clair]="choix?.code === l.code" [text]="l.anglais"></Label>
              </StackLayout>
            }
          </FlexboxLayout>
        </StackLayout>
      </ScrollView>

      <StackLayout row="1" class="pied">
        @if (preparation) {
          <Label class="sb centre" fontSize="15" marginBottom="10" textWrap="true"
                 [text]="'Waypoint · ' + choix?.nom + ' · ' + pourcent + ' %'"></Label>
          <FlexboxLayout class="segments" marginBottom="12">
            <StackLayout class="seg seg-plein" [width]="(pourcent || 2) + '%'"></StackLayout>
          </FlexboxLayout>
        }
        @if (erreur) {
          <GridLayout columns="auto, *" class="carte-alerte" marginTop="0" marginBottom="12">
            <Label col="0" class="ico accent-texte" fontSize="20" marginRight="10" text="&#xe002;"></Label>
            <Label col="1" class="sb" fontSize="14" [text]="erreur" textWrap="true"></Label>
          </GridLayout>
        }
        <FlexboxLayout class="btn" [class.btn-gris]="!choix || preparation" [class.btn-accent]="!!choix && !preparation"
                       justifyContent="center" alignItems="center" (tap)="continuer()">
          <Label class="btn-txt" [class.btn-txt-noir]="!choix || preparation" [text]="choix ? choix.continuer : 'Continuer · Continue'"></Label>
          <Label class="ico btn-ico" [class.btn-ico-noir]="!choix || preparation" marginLeft="8" marginRight="0" text="&#xe5c8;"></Label>
        </FlexboxLayout>
      </StackLayout>
    </GridLayout>
  `,
})
export class LangueComponent implements OnDestroy {
  langues = LANGUES;
  choix?: Langue;
  parle = false;
  chargementVoix = false;
  preparation = false;
  pourcent = 0;
  erreur = '';
  private minuterie: any;

  constructor(
    private cdr: ChangeDetectorRef,
    page: Page,
    private langue: LangueService,
    private traduction: TraductionService,
    private router: RouterExtensions
  ) {
    preparerPage(page);
    if (this.langue.choisie) this.choix = this.langue.langue();
  }

  choisir(l: Langue): void {
    if (this.preparation) return;
    this.choix = l;
    this.erreur = '';
    this.langue.dejaSalue = true;
    this.cdr.markForCheck();
    this.presenter(l);
  }

  reecouter(): void {
    if (this.choix && !this.preparation) this.presenter(this.choix);
  }

  /** L'assistant se présente avec la voix d'IA, dans la langue choisie. */
  private async presenter(l: Langue): Promise<void> {
    arreterVoix();
    this.parle = false;
    this.chargementVoix = true;
    this.cdr.markForCheck();
    this.langue.choisir(l.code); // pour que la voix parle la bonne langue
    const duree = await this.langue.dire(l.accueil, true);
    this.chargementVoix = false;
    if (this.choix?.code === l.code && duree) {
      this.parle = true;
      clearTimeout(this.minuterie);
      this.minuterie = setTimeout(() => {
        this.parle = false;
        this.cdr.markForCheck();
      }, duree);
    }
    this.cdr.markForCheck();
  }

  /** Prépare toute l'app dans la langue choisie (traduction en ligne), puis continue. */
  async continuer(): Promise<void> {
    if (!this.choix || this.preparation) return;
    this.preparation = true;
    this.erreur = '';
    this.pourcent = 0;
    this.cdr.markForCheck();
    this.langue.choisir(this.choix.code);
    try {
      await this.traduction.preparer(this.choix, (p) => {
        this.pourcent = p;
        this.cdr.markForCheck();
      });
    } catch (e: any) {
      this.preparation = false;
      this.erreur = tr(e?.message ?? 'Une erreur est survenue. Réessaie.');
      this.cdr.markForCheck();
      return;
    }
    arreterVoix();
    // On repart du début : chaque écran s'affiche dans la nouvelle langue.
    this.router.navigate(['/'], { clearHistory: true, transition: { name: 'fade', duration: 250 } });
  }

  ngOnDestroy(): void {
    clearTimeout(this.minuterie);
  }
}
