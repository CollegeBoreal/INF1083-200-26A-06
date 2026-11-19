import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

/** Logo Étape : trois marches + un point, et le mot « étape ». */
@Component({
  selector: 'logo-etape',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <StackLayout orientation="horizontal" verticalAlignment="center">
      <GridLayout class="logo-tuile" [class.logo-tuile-clair]="clair" verticalAlignment="center">
        <StackLayout orientation="horizontal" horizontalAlignment="center" verticalAlignment="center" height="30">
          <StackLayout class="marche marche-1" [class.marche-sombre]="clair" verticalAlignment="bottom"></StackLayout>
          <StackLayout class="marche marche-2" [class.marche-sombre]="clair" verticalAlignment="bottom"></StackLayout>
          <StackLayout verticalAlignment="bottom">
            <StackLayout class="point" horizontalAlignment="center"></StackLayout>
            <StackLayout class="marche marche-3" [class.marche-sombre]="clair"></StackLayout>
          </StackLayout>
        </StackLayout>
      </GridLayout>
      @if (avecNom) {
        <Label class="logo-nom" [class.logo-nom-clair]="!clair" verticalAlignment="center">
          <FormattedString>
            <Span text="é" class="accent-texte"></Span>
            <Span text="tape"></Span>
          </FormattedString>
        </Label>
      }
    </StackLayout>
  `,
})
export class LogoComponent {
  @Input() avecNom = true;
  /** true = tuile claire (sur fond sombre). */
  @Input() clair = false;
}
