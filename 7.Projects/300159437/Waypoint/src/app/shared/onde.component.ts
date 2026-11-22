import { ChangeDetectorRef, Component, Input, NO_ERRORS_SCHEMA, OnDestroy } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

/** Petite onde sonore qui bouge pendant que l'assistant parle. */
@Component({
  selector: 'onde-voix',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <FlexboxLayout class="ondes" alignItems="center">
      @for (h of hauteurs; track $index) {
        <StackLayout class="onde" [class.onde-active]="actif" [height]="h"></StackLayout>
      }
    </FlexboxLayout>
  `,
})
export class OndeComponent implements OnDestroy {
  hauteurs = [10, 18, 26, 14, 22, 12, 20, 10];
  private minuterie: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  @Input() set actif(v: boolean) {
    this._actif = v;
    clearInterval(this.minuterie);
    if (v) {
      this.minuterie = setInterval(() => {
        this.hauteurs = this.hauteurs.map(() => 6 + Math.round(Math.random() * 26));
        this.cdr.markForCheck();
      }, 140);
    } else {
      this.hauteurs = [10, 18, 26, 14, 22, 12, 20, 10];
      this.cdr.markForCheck();
    }
  }
  get actif(): boolean {
    return this._actif;
  }
  private _actif = false;

  ngOnDestroy(): void {
    clearInterval(this.minuterie);
  }
}
