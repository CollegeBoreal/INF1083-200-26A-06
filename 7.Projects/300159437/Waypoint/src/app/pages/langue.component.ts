import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, OnDestroy } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { Langue, LANGUES } from '../data/langues';
import { AuthService } from '../services/auth.service';
import { LangueService } from '../services/langue.service';
import { ProfilService } from '../services/profil.service';
import { LogoComponent } from '../shared/logo.component';
import { preparerPage } from '../shared/ui';
import { arreterVoix, dureeParole, preparerVoix } from '../shared/voix';

/** Premier écran : choisir sa langue. L'assistant se présente à voix haute dans cette langue. */
@Component({
  selector: 'langue',
  standalone: true,
  imports: [NativeScriptCommonModule, LogoComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" class="fond">
      <ScrollView row="0">
        <StackLayout class="page">
          <StackLayout class="entree" marginTop="8"><logo-etape></logo-etape></StackLayout>

          <StackLayout class="entree" marginTop="24">
            <Label class="titre" [text]="choix ? choix.choisir : 'Choisis ta langue'" textWrap="true"></Label>
            <Label class="petit" textWrap="true" text="Choose your language · Elige tu idioma · اختر لغتك · 选择你的语言"></Label>
          </StackLayout>

          <!-- L'assistant parle -->
          @if (choix) {
            <GridLayout columns="auto, *, auto" class="carte-voix entree" (tap)="reecouter()">
              <GridLayout col="0" class="chat-avatar">
                <Label class="ico chat-avatar-ico" text="&#xe39f;"></Label>
              </GridLayout>
              <StackLayout col="1">
                <FlexboxLayout class="ondes" alignItems="center">
                  @for (b of barres; track $index) {
                    <StackLayout class="onde" [class.onde-active]="parle" [height]="b"></StackLayout>
                  }
                </FlexboxLayout>
                <Label class="voix-txt" [text]="choix.accueil" textWrap="true"
                       [textAlignment]="choix.rtl ? 'right' : 'left'"></Label>
              </StackLayout>
              <Label col="2" class="ico voix-rejouer" verticalAlignment="top" text="&#xe050;"></Label>
            </GridLayout>
          }

          <FlexboxLayout class="entree-2" flexWrap="wrap" justifyContent="space-between" marginTop="18">
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
        <FlexboxLayout class="btn btn-accent" [opacity]="choix ? 1 : 0.4" justifyContent="center" alignItems="center" (tap)="continuer()">
          <Label class="btn-txt" [text]="choix ? choix.continuer : 'Continuer · Continue'"></Label>
          <Label class="ico btn-ico" marginLeft="8" marginRight="0" text="&#xe5c8;"></Label>
        </FlexboxLayout>
      </StackLayout>
    </GridLayout>
  `,
})
export class LangueComponent implements OnDestroy {
  langues = LANGUES;
  choix?: Langue;
  parle = false;
  barres = [14, 24, 32, 20, 28, 16, 26, 12];
  private retour = false; // ouvert depuis « Mon compte »
  private minuterie: any;

  constructor(
    private cdr: ChangeDetectorRef,
    page: Page,
    route: ActivatedRoute,
    private langue: LangueService,
    private auth: AuthService,
    private profil: ProfilService,
    private router: RouterExtensions
  ) {
    preparerPage(page);
    preparerVoix();
    this.retour = route.snapshot.queryParamMap.get('retour') === '1';
    if (this.langue.choisie) this.choix = this.langue.langue();
  }

  choisir(l: Langue): void {
    this.choix = l;
    this.langue.choisir(l.code);
    this.langue.dejaSalue = true;
    this.langue.dire(l.accueil, true); // l'assistant se présente dans la langue choisie
    this.animer(l.accueil);
  }

  reecouter(): void {
    if (!this.choix) return;
    this.langue.dire(this.choix.accueil, true);
    this.animer(this.choix.accueil);
  }

  private animer(texte: string): void {
    this.parle = true;
    this.cdr.markForCheck();
    clearTimeout(this.minuterie);
    this.minuterie = setTimeout(() => {
      this.parle = false;
      this.cdr.markForCheck();
    }, dureeParole(texte));
  }

  continuer(): void {
    if (!this.choix) return;
    arreterVoix();
    if (this.retour) {
      this.router.back();
      return;
    }
    let cible: string;
    if (!this.auth.connecte && !this.auth.invite) cible = '/intro';
    else cible = this.profil.get() ? '/parcours' : '/bienvenue';
    this.router.navigate([cible], { clearHistory: true, transition: { name: 'fade', duration: 250 } });
  }

  ngOnDestroy(): void {
    clearTimeout(this.minuterie);
  }
}
