import { Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Dialogs, Page, View } from '@nativescript/core';
import { shareImage } from '@nativescript/social-share';
import { ParcoursService } from '../services/parcours.service';
import { ProfilService } from '../services/profil.service';
import { LogoComponent } from '../shared/logo.component';
import { captureVue } from '../shared/outils';
import { preparerPage, segments } from '../shared/ui';

/*
 * v1 : l'image passe par la feuille de partage du téléphone (choisir TikTok).
 * v2 : Share Kit officiel de TikTok (TikTok OpenSDK) pour ouvrir TikTok directement.
 */
@Component({
  selector: 'partage',
  standalone: true,
  imports: [NativeScriptCommonModule, LogoComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="auto, *, auto" class="fond">
      <GridLayout row="0" columns="auto, *, auto" class="page" paddingBottom="0">
        <GridLayout col="0" class="rond-btn" (tap)="router.back()">
          <Label class="ico rond-ico" text="&#xe5cd;"></Label>
        </GridLayout>
        <Label col="1" class="b centre" fontSize="17" verticalAlignment="center" text="Partager"></Label>
      </GridLayout>

      <StackLayout row="1" #carte class="carte-partage entree" horizontalAlignment="center" verticalAlignment="center">
        <logo-etape [clair]="true"></logo-etape>
        <StackLayout verticalAlignment="bottom" height="300">
          <Label class="sb gris-clair" fontSize="15" [text]="'Jour ' + jour + ' · ' + ville"></Label>
          <Label class="gros-chiffre">
            <FormattedString>
              <Span [text]="prog.faites + ''"></Span>
              <Span [text]="'/' + prog.total" color="#6B6B66"></Span>
            </FormattedString>
          </Label>
          <Label class="partage-txt" text="étapes faites." textWrap="true"></Label>
          <FlexboxLayout class="segments" marginTop="20">
            @for (s of segs; track $index) {
              <StackLayout class="seg seg-sombre" flexGrow="1" [class.seg-plein]="s.plein"></StackLayout>
            }
          </FlexboxLayout>
          <Label class="gris-clair" fontSize="13" marginTop="16" text="#NouvelArrivant #étape"></Label>
        </StackLayout>
      </StackLayout>

      <StackLayout row="2" class="pied">
        <FlexboxLayout class="btn btn-noir" justifyContent="center" alignItems="center" (tap)="partager()">
          <Label class="ico btn-ico" text="&#xe80d;"></Label>
          <Label class="btn-txt" text="Partager sur TikTok"></Label>
        </FlexboxLayout>
        <Label class="petit centre" marginTop="10" textWrap="true" text="Aucun document n'est partagé. Juste ta progression."></Label>
      </StackLayout>
    </GridLayout>
  `,
})
export class PartageComponent {
  @ViewChild('carte', { static: false }) carte?: ElementRef<View>;
  prog = { faites: 0, total: 0, pourcent: 0 };
  segs: { plein: boolean }[] = [];
  jour = 1;
  ville = '';

  constructor(page: Page, public router: RouterExtensions, parcours: ParcoursService, profil: ProfilService) {
    preparerPage(page);
    this.prog = parcours.progression();
    this.segs = segments(this.prog.faites, this.prog.total);
    this.jour = profil.jour();
    this.ville = profil.get()?.ville ?? '';
  }

  partager(): void {
    const vue = this.carte?.nativeElement;
    const image = vue ? captureVue(vue) : null;
    if (!image) {
      Dialogs.alert({ message: "Impossible de créer l'image. Réessaie.", okButtonText: 'OK' });
      return;
    }
    shareImage(image, 'Ma progression sur Étape');
  }
}
