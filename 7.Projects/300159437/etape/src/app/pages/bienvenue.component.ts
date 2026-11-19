import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { Dialogs, Page } from '@nativescript/core';
import { NOMS_STATUTS, Province, Statut } from '../models';
import { ProfilService } from '../services/profil.service';
import { ParcoursService } from '../services/parcours.service';
import { LogoComponent } from '../shared/logo.component';
import { preparerPage } from '../shared/ui';

@Component({
  selector: 'bienvenue',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, LogoComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" class="fond">
      <ScrollView row="0">
        <StackLayout class="page">
          <StackLayout class="entree" marginTop="8"><logo-etape></logo-etape></StackLayout>

          <StackLayout class="entree-2" marginTop="28" marginBottom="20">
            <Label class="titre" text="Bienvenue." textWrap="true"></Label>
            <Label class="texte" text="Trois questions. On s'occupe du reste." textWrap="true"></Label>
          </StackLayout>

          <StackLayout class="entree-3">
            <StackLayout class="question">
              <Label class="q-num" text="1 / 3"></Label>
              <Label class="q-titre" text="D'où viens-tu ?"></Label>
              <TextField class="champ r" hint="Ton pays d'origine" [(ngModel)]="origine" returnKeyType="next"></TextField>
            </StackLayout>

            <StackLayout class="question">
              <Label class="q-num" text="2 / 3"></Label>
              <Label class="q-titre" text="Où arrives-tu ?"></Label>
              <FlexboxLayout flexWrap="wrap">
                @for (p of provinces; track p.id) {
                  <GridLayout class="pastille" [class.pastille-active]="province === p.id" (tap)="province = p.id">
                    <Label class="pastille-txt" [class.pastille-txt-actif]="province === p.id" [text]="p.nom"></Label>
                  </GridLayout>
                }
              </FlexboxLayout>
              <TextField class="champ r champ-espace" hint="Ta ville" [(ngModel)]="ville"></TextField>
            </StackLayout>

            <StackLayout class="question">
              <Label class="q-num" text="3 / 3"></Label>
              <Label class="q-titre" text="Tu arrives comme…"></Label>
              <FlexboxLayout flexWrap="wrap">
                @for (s of statuts; track s.id) {
                  <GridLayout class="pastille" [class.pastille-active]="statut === s.id" (tap)="statut = s.id">
                    <Label class="pastille-txt" [class.pastille-txt-actif]="statut === s.id" [text]="s.nom"></Label>
                  </GridLayout>
                }
              </FlexboxLayout>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <StackLayout row="1" class="pied">
        <FlexboxLayout class="btn btn-accent" justifyContent="center" alignItems="center" (tap)="creer()">
          <Label class="btn-txt" text="Créer mon parcours"></Label>
          <Label class="ico btn-ico" marginLeft="8" marginRight="0" text="&#xe5c8;"></Label>
        </FlexboxLayout>
        <Label class="petit centre" marginTop="10" text="Aucun compte requis · Fonctionne hors ligne"></Label>
      </StackLayout>
    </GridLayout>
  `,
})
export class BienvenueComponent {
  origine = '';
  province: Province = 'QC';
  ville = 'Montréal';
  statut: Statut = 'rp';
  provinces: { id: Province; nom: string }[] = [
    { id: 'QC', nom: 'Québec' },
    { id: 'ON', nom: 'Ontario' },
  ];
  statuts = (Object.keys(NOMS_STATUTS) as Statut[]).map((id) => ({ id, nom: NOMS_STATUTS[id] }));

  constructor(
    page: Page,
    private profil: ProfilService,
    private parcours: ParcoursService,
    private router: RouterExtensions
  ) {
    preparerPage(page);
  }

  creer(): void {
    if (!this.origine.trim() || !this.ville.trim()) {
      Dialogs.alert({ title: 'Il manque une réponse', message: "Indique ton pays d'origine et ta ville.", okButtonText: 'OK' });
      return;
    }
    this.parcours.reinitialiser();
    this.profil.enregistrer({
      origine: this.origine.trim(),
      province: this.province,
      ville: this.ville.trim(),
      statut: this.statut,
      arrivee: new Date().toISOString(),
    });
    this.router.navigate(['/parcours'], { clearHistory: true, transition: { name: 'slideLeft', duration: 250 } });
  }
}
