import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'barre-nav',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout columns="*, *, *" class="nav">
      <StackLayout col="0" class="nav-item" (tap)="aller('parcours')">
        <Label class="ico nav-ico" [class.nav-actif]="actif === 'parcours'" text="&#xe153;"></Label>
        <Label class="nav-txt" [class.nav-actif]="actif === 'parcours'" text="Parcours"></Label>
      </StackLayout>
      <StackLayout col="1" class="nav-item" (tap)="aller('coffre')">
        <Label class="ico nav-ico" [class.nav-actif]="actif === 'coffre'" text="&#xe897;"></Label>
        <Label class="nav-txt" [class.nav-actif]="actif === 'coffre'" text="Coffre"></Label>
      </StackLayout>
      <StackLayout col="2" class="nav-item" (tap)="aller('pres')">
        <Label class="ico nav-ico" [class.nav-actif]="actif === 'pres'" text="&#xe55f;"></Label>
        <Label class="nav-txt" [class.nav-actif]="actif === 'pres'" text="Près de moi"></Label>
      </StackLayout>
    </GridLayout>
  `,
})
export class BarreNavComponent {
  @Input() actif: 'parcours' | 'coffre' | 'pres' = 'parcours';

  constructor(private router: RouterExtensions) {}

  aller(onglet: string): void {
    if (onglet === this.actif) return;
    this.router.navigate(['/' + onglet], { clearHistory: true, transition: { name: 'fade', duration: 180 } });
  }
}
