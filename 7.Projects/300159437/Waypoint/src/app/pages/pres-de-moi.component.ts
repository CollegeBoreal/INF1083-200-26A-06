import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { Page, Utils } from '@nativescript/core';
import { Etape } from '../models';
import { ParcoursService } from '../services/parcours.service';
import { ProfilService } from '../services/profil.service';
import { BarreNavComponent } from '../shared/barre-nav.component';
import { ouvrirCarte } from '../shared/outils';
import { preparerPage } from '../shared/ui';

@Component({
  selector: 'pres-de-moi',
  standalone: true,
  imports: [NativeScriptCommonModule, BarreNavComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" class="fond">
      <ScrollView row="0">
        <StackLayout class="page">
          <StackLayout class="entree" marginTop="8">
            <Label class="sur-titre" [text]="ville"></Label>
            <Label class="titre" text="Près de moi"></Label>
          </StackLayout>

          @if (pourEtape) {
            <StackLayout class="carte-noire entree-2" (tap)="chercher(pourEtape.recherche)">
              <Label class="oeil-clair" text="POUR TA PROCHAINE ÉTAPE"></Label>
              <Label class="carte-titre" [text]="pourEtape.titre" textWrap="true"></Label>
              <FlexboxLayout class="btn btn-accent" justifyContent="center" alignItems="center">
                <Label class="ico btn-ico" text="&#xe55b;"></Label>
                <Label class="btn-txt" text="Voir sur la carte"></Label>
              </FlexboxLayout>
            </StackLayout>
          }

          <Label class="etiquette entree-3" text="LES ESSENTIELS"></Label>
          <StackLayout class="liste entree-3">
            @for (l of lieux; track l.nom; let dernier = $last) {
              <GridLayout columns="auto, *, auto" class="ligne" [class.ligne-derniere]="dernier" (tap)="chercher(l.recherche)">
                <GridLayout col="0" class="tuile-ico">
                  <Label class="ico tuile-ico-txt" [text]="l.icone"></Label>
                </GridLayout>
                <StackLayout col="1" verticalAlignment="center">
                  <Label class="ligne-txt" [text]="l.nom"></Label>
                  <Label class="petit" [text]="l.detail" textWrap="true"></Label>
                </StackLayout>
                <Label col="2" class="ico chevron" text="&#xe5cc;"></Label>
              </GridLayout>
            }
          </StackLayout>

          <Label class="etiquette entree-3" text="UNE QUESTION ?"></Label>
          <GridLayout columns="auto, *, auto" class="carte entree-3" (tap)="appeler211()">
            <GridLayout col="0" class="tuile-ico tuile-ico-noire">
              <Label class="ico tuile-ico-txt blanc" text="&#xe0cd;"></Label>
            </GridLayout>
            <StackLayout col="1" verticalAlignment="center">
              <Label class="ligne-txt" text="Appeler le 211"></Label>
              <Label class="petit" textWrap="true" text="Gratuit et confidentiel. On t'oriente vers les bonnes ressources."></Label>
            </StackLayout>
            <Label col="2" class="ico chevron" text="&#xe5cc;"></Label>
          </GridLayout>
        </StackLayout>
      </ScrollView>
      <StackLayout row="1"><barre-nav actif="pres"></barre-nav></StackLayout>
    </GridLayout>
  `,
})
export class PresDeMoiComponent {
  ville = '';
  pourEtape?: Etape;
  lieux = [
    { nom: "Organisme d'accueil", detail: 'Aide gratuite pour nouveaux arrivants', recherche: 'organisme aide immigrants', icone: '' },
    { nom: 'Centre Service Canada', detail: 'NAS, prestations, passeport', recherche: 'Centre Service Canada', icone: '' },
    { nom: 'Clinique sans rendez-vous', detail: 'Soins de santé', recherche: 'clinique sans rendez-vous', icone: '' },
    { nom: 'Bibliothèque', detail: 'Internet gratuit, ateliers, cours', recherche: 'bibliothèque publique', icone: '' },
  ];

  constructor(private cdr: ChangeDetectorRef, page: Page, private parcours: ParcoursService, private profil: ProfilService) {
    preparerPage(page);
    this.ville = this.profil.get()?.ville ?? '';
    this.pourEtape = this.parcours.prochaine();
    page.on('navigatedTo', () => {
      this.pourEtape = this.parcours.prochaine();
      this.cdr.markForCheck();
    });
  }

  chercher(recherche: string): void {
    ouvrirCarte(`${recherche} ${this.ville}`);
  }

  appeler211(): void {
    Utils.openUrl('tel:211');
  }
}
