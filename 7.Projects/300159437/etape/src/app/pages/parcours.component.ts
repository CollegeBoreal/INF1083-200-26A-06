import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { Etape } from '../models';
import { BarreNavComponent } from '../shared/barre-nav.component';
import { LogoComponent } from '../shared/logo.component';
import { preparerPage, segments } from '../shared/ui';
import { ParcoursService } from '../services/parcours.service';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'parcours',
  standalone: true,
  imports: [NativeScriptCommonModule, BarreNavComponent, LogoComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" class="fond">
      <ScrollView row="0">
        <StackLayout class="page">
          <GridLayout columns="*, auto" class="entree" marginTop="4">
            <StackLayout col="0" horizontalAlignment="left"><logo-etape [avecNom]="false"></logo-etape></StackLayout>
            <GridLayout col="1" class="rond-btn" (tap)="ouvrirCompte()">
              <Label class="ico rond-ico" text="&#xe7fd;"></Label>
            </GridLayout>
          </GridLayout>

          <StackLayout class="entree" marginTop="20">
            <Label class="sur-titre" [text]="'Jour ' + jour + ' · ' + ville"></Label>
            <Label class="titre" text="Mon parcours"></Label>
            <FlexboxLayout class="segments">
              @for (s of segs; track $index) {
                <StackLayout class="seg" flexGrow="1" [class.seg-plein]="s.plein"></StackLayout>
              }
            </FlexboxLayout>
            <Label class="petit sb" [text]="prog.faites + ' étapes sur ' + prog.total + ' · ' + prog.pourcent + ' %'"></Label>
          </StackLayout>

          @if (prochaine) {
            <StackLayout class="carte-noire entree-2" (tap)="ouvrir(prochaine)">
              <Label class="oeil-clair" text="PROCHAINE ÉTAPE"></Label>
              <Label class="carte-titre" [text]="prochaine.titre" textWrap="true"></Label>
              <StackLayout orientation="horizontal" marginBottom="18">
                <Label class="ico meta-ico" text="&#xe8b5;"></Label>
                <Label class="meta" [text]="prochaine.duree" marginRight="16"></Label>
                <Label class="ico meta-ico" text="&#xe873;"></Label>
                <Label class="meta" [text]="prochaine.documents.length + ' documents'"></Label>
              </StackLayout>
              <FlexboxLayout class="btn btn-accent" justifyContent="center" alignItems="center">
                <Label class="btn-txt" text="Commencer"></Label>
                <Label class="ico btn-ico" marginLeft="8" marginRight="0" text="&#xe5c8;"></Label>
              </FlexboxLayout>
            </StackLayout>
          } @else {
            <StackLayout class="carte-noire entree-2">
              <Label class="ico" fontSize="40" color="#FF6B4F" text="&#xe86c;"></Label>
              <Label class="carte-titre" text="Bravo. Ton parcours est terminé." textWrap="true"></Label>
              <Label class="meta" text="Bienvenue chez toi." textWrap="true"></Label>
            </StackLayout>
          }

          <Label class="etiquette entree-3" text="TOUTES TES ÉTAPES"></Label>
          <StackLayout class="liste entree-3">
            @for (e of etapes; track e.id; let dernier = $last) {
              <GridLayout columns="auto, *, auto" class="ligne" [class.ligne-derniere]="dernier" (tap)="ouvrir(e)">
                <GridLayout col="0" class="coche" [class.coche-faite]="estFaite(e)">
                  @if (estFaite(e)) {
                    <Label class="ico coche-ico" text="&#xe5ca;"></Label>
                  }
                </GridLayout>
                <Label col="1" class="ligne-txt" [class.ligne-txt-fait]="estFaite(e)" [text]="e.titre" textWrap="true"></Label>
                <Label col="2" class="ico chevron" text="&#xe5cc;"></Label>
              </GridLayout>
            }
          </StackLayout>
        </StackLayout>
      </ScrollView>
      <StackLayout row="1"><barre-nav actif="parcours"></barre-nav></StackLayout>
    </GridLayout>
  `,
})
export class ParcoursComponent {
  etapes: Etape[] = [];
  prochaine?: Etape;
  prog = { faites: 0, total: 0, pourcent: 0 };
  segs: { plein: boolean }[] = [];
  jour = 1;
  ville = '';

  constructor(
    private cdr: ChangeDetectorRef,
    page: Page,
    private parcours: ParcoursService,
    private profil: ProfilService,
    private router: RouterExtensions
  ) {
    preparerPage(page);
    page.on('navigatedTo', () => this.charger());
    this.charger();
  }

  charger(): void {
    this.etapes = this.parcours.etapes();
    this.prochaine = this.parcours.prochaine();
    this.prog = this.parcours.progression();
    this.segs = segments(this.prog.faites, this.prog.total);
    this.jour = this.profil.jour();
    this.ville = this.profil.get()?.ville ?? '';
    this.cdr.markForCheck();
  }

  estFaite(e: Etape): boolean {
    return this.parcours.estFaite(e.id);
  }

  ouvrir(e: Etape): void {
    this.router.navigate(['/etape', e.id], { transition: { name: 'slideLeft', duration: 250 } });
  }

  ouvrirCompte(): void {
    this.router.navigate(['/compte'], { transition: { name: 'slideLeft', duration: 250 } });
  }
}
