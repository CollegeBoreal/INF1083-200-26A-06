import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { tr } from '../i18n/i18n';

@Component({
  selector: 'barre-nav',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout columns="*, *, *, *" class="nav">
      <StackLayout col="0" class="nav-item" (tap)="aller('parcours')">
        <Label class="ico nav-ico" [class.nav-actif]="actif === 'parcours'" text="&#xe153;"></Label>
        <Label class="nav-txt" [class.nav-actif]="actif === 'parcours'" [text]="t('Parcours')"></Label>
      </StackLayout>
      <StackLayout col="1" class="nav-item" (tap)="aller('coffre')">
        <Label class="ico nav-ico" [class.nav-actif]="actif === 'coffre'" text="&#xe897;"></Label>
        <Label class="nav-txt" [class.nav-actif]="actif === 'coffre'" [text]="t('Coffre')"></Label>
      </StackLayout>
      <StackLayout col="2" class="nav-item" (tap)="aller('assistant')">
        <Label class="ico nav-ico" [class.nav-actif]="actif === 'assistant'" text="&#xe39f;"></Label>
        <Label class="nav-txt" [class.nav-actif]="actif === 'assistant'" [text]="t('Assistant')"></Label>
      </StackLayout>
      <StackLayout col="3" class="nav-item" (tap)="aller('pres')">
        <Label class="ico nav-ico" [class.nav-actif]="actif === 'pres'" text="&#xe55f;"></Label>
        <Label class="nav-txt" [class.nav-actif]="actif === 'pres'" [text]="t('Près de moi')"></Label>
      </StackLayout>
    </GridLayout>
  `,
})
export class BarreNavComponent {
  t = tr;
  @Input() actif: 'parcours' | 'coffre' | 'assistant' | 'pres' = 'parcours';

  constructor(private router: RouterExtensions) {}

  aller(onglet: string): void {
    if (onglet === this.actif) return;
    this.router.navigate(['/' + onglet], { clearHistory: true, transition: { name: 'fade', duration: 180 } });
  }
}
