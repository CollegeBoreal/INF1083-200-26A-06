import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { tr } from '../i18n/i18n';
import { LogoComponent } from '../shared/logo.component';
import { enLigne } from '../shared/reseau';
import { preparerPage } from '../shared/ui';

/** Waypoint fonctionne en ligne : écran affiché quand il n'y a pas d'Internet. */
@Component({
  selector: 'hors-ligne',
  standalone: true,
  imports: [NativeScriptCommonModule, LogoComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" class="fond">
      <StackLayout row="0" class="page" verticalAlignment="center">
        <Label class="ico centre" fontSize="64" color="#BDBDB8" text="&#xe648;"></Label>
        <Label class="titre-moyen centre" marginTop="16" textWrap="true" [text]="t('Pas de connexion Internet')"></Label>
        <Label class="texte centre" marginTop="8" textWrap="true"
               [text]="t('Waypoint a besoin d\\'Internet pour ton compte, l\\'assistant et la voix. Active le Wi-Fi ou les données mobiles.')"></Label>
        @if (toujours) {
          <Label class="sb accent-texte centre" marginTop="14" [text]="t('Toujours pas de connexion.')"></Label>
        }
      </StackLayout>
      <StackLayout row="1" class="pied">
        <FlexboxLayout class="btn btn-noir" justifyContent="center" alignItems="center" (tap)="reessayer()">
          <Label class="ico btn-ico" text="&#xe5d5;"></Label>
          <Label class="btn-txt" [text]="t('Réessayer')"></Label>
        </FlexboxLayout>
      </StackLayout>
    </GridLayout>
  `,
})
export class HorsLigneComponent {
  t = tr;
  toujours = false;

  constructor(private cdr: ChangeDetectorRef, page: Page, private router: RouterExtensions) {
    preparerPage(page);
  }

  reessayer(): void {
    if (enLigne()) {
      this.router.navigate(['/'], { clearHistory: true, transition: { name: 'fade', duration: 200 } });
    } else {
      this.toujours = true;
      this.cdr.markForCheck();
    }
  }
}
