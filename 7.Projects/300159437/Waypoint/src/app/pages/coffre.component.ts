import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { Dialogs, Page } from '@nativescript/core';
import { DocumentCoffre, NOMS_DOCS, TypeDoc } from '../models';
import { CoffreService } from '../services/coffre.service';
import { BarreNavComponent } from '../shared/barre-nav.component';
import { preparerPage } from '../shared/ui';
import { tr } from '../i18n/i18n';

@Component({
  selector: 'coffre',
  standalone: true,
  imports: [NativeScriptCommonModule, BarreNavComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" class="fond">
      <ScrollView row="0">
        <StackLayout class="page">
          <GridLayout columns="*, auto" class="entree" marginTop="8">
            <StackLayout col="0">
              <StackLayout orientation="horizontal">
                <Label class="ico" fontSize="15" color="#5F6368" text="&#xe897;" marginRight="4" verticalAlignment="center"></Label>
                <Label class="sur-titre" [text]="t('Sur ton téléphone, nulle part ailleurs')"></Label>
              </StackLayout>
              <Label class="titre" [text]="t('Mon coffre')"></Label>
            </StackLayout>
            <GridLayout col="1" class="rond-btn-noir" verticalAlignment="bottom" (tap)="ajouter()">
              <Label class="ico rond-ico-blanc" text="&#xe145;"></Label>
            </GridLayout>
          </GridLayout>

          @for (a of alertes; track a.doc.id) {
            <GridLayout columns="auto, *" class="carte-alerte entree-2">
              <GridLayout col="0" class="tuile-ico tuile-ico-rouge">
                <Label class="ico tuile-ico-txt accent-texte" text="&#xe8b5;"></Label>
              </GridLayout>
              <StackLayout col="1" verticalAlignment="center">
                <Label class="ligne-txt" textWrap="true"
                       [text]="a.jours < 0 ? t('{doc} a expiré', { doc: t(a.doc.nom) }) : t('{doc} expire dans {jours} jours', { doc: t(a.doc.nom), jours: a.jours })"></Label>
                <Label class="petit" [text]="t('Pense à le renouveler à temps.')" textWrap="true"></Label>
              </StackLayout>
            </GridLayout>
          }

          @if (docs.length === 0) {
            <StackLayout class="entree-2">
              <Label class="ico vide-ico" text="&#xe897;"></Label>
              <Label class="b centre" fontSize="18" marginTop="12" [text]="t('Ton coffre est vide')"></Label>
              <Label class="texte centre" marginTop="6" textWrap="true"
                     [text]="t('Photographie ton passeport et tes documents importants. Ils restent sur ton téléphone.')"></Label>
              <FlexboxLayout class="btn btn-noir" marginTop="20" justifyContent="center" alignItems="center" (tap)="ajouter()">
                <Label class="ico btn-ico" text="&#xe412;"></Label>
                <Label class="btn-txt" [text]="t('Ajouter un document')"></Label>
              </FlexboxLayout>
            </StackLayout>
          } @else {
            <FlexboxLayout flexWrap="wrap" justifyContent="space-between" marginTop="18" class="entree-3">
              @for (d of docs; track d.id) {
                <StackLayout class="doc" (tap)="options(d)">
                  @if (d.image) {
                    <Image class="doc-image" [src]="d.image" stretch="aspectFill" horizontalAlignment="left"></Image>
                  } @else {
                    <GridLayout class="tuile-ico" horizontalAlignment="left">
                      <Label class="ico tuile-ico-txt" text="&#xe873;"></Label>
                    </GridLayout>
                  }
                  <Label class="doc-nom" [text]="t(d.nom)" textWrap="true"></Label>
                  <Label class="doc-meta" [class.doc-meta-rouge]="bientot(d)" [text]="meta(d)"></Label>
                </StackLayout>
              }
            </FlexboxLayout>
          }
        </StackLayout>
      </ScrollView>
      <StackLayout row="1"><barre-nav actif="coffre"></barre-nav></StackLayout>
    </GridLayout>
  `,
})
export class CoffreComponent {
  t = tr;
  docs: DocumentCoffre[] = [];
  alertes: { doc: DocumentCoffre; jours: number }[] = [];

  constructor(private cdr: ChangeDetectorRef, page: Page, private coffre: CoffreService) {
    preparerPage(page);
    page.on('navigatedTo', () => this.charger());
    this.charger();
  }

  charger(): void {
    this.docs = this.coffre.liste();
    this.alertes = this.coffre.alertes();
    this.cdr.markForCheck();
  }

  bientot(d: DocumentCoffre): boolean {
    const j = this.coffre.joursRestants(d);
    return j !== null && j <= 180;
  }

  meta(d: DocumentCoffre): string {
    const j = this.coffre.joursRestants(d);
    if (j === null) return tr('Sans expiration');
    if (j < 0) return tr('Expiré');
    if (j <= 180) return tr('Expire dans {jours} jours', { jours: j });
    return tr("Valide jusqu'au {date}", { date: d.expiration ?? '' });
  }

  async ajouter(): Promise<void> {
    const types = Object.keys(NOMS_DOCS) as TypeDoc[];
    const choix = await Dialogs.action({
      title: tr('Quel document ?'),
      cancelButtonText: tr('Annuler'),
      actions: types.map((t) => tr(NOMS_DOCS[t])),
    });
    const type = types.find((t) => tr(NOMS_DOCS[t]) === choix);
    if (!type) return;

    const r = await Dialogs.prompt({
      title: tr("Date d'expiration"),
      message: tr("Format AAAA-MM-JJ. Laisse vide s'il n'y en a pas."),
      okButtonText: tr('Prendre la photo'),
      cancelButtonText: tr('Annuler'),
      defaultText: '',
    });
    if (!r.result) return;
    const date = r.text.trim();
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      await Dialogs.alert({ message: tr('Date invalide. Exemple : 2031-04-30'), okButtonText: 'OK' });
      return;
    }
    try {
      await this.coffre.scanner(type, date);
      this.charger();
    } catch (e) {
      console.log('Photo annulée ou refusée', e);
    }
  }

  async options(d: DocumentCoffre): Promise<void> {
    const choix = await Dialogs.action({ title: tr(d.nom), cancelButtonText: tr('Fermer'), actions: [tr('Supprimer')] });
    if (choix === tr('Supprimer')) {
      const ok = await Dialogs.confirm({
        message: tr('Supprimer « {doc} » ?', { doc: tr(d.nom) }),
        okButtonText: tr('Supprimer'),
        cancelButtonText: tr('Annuler'),
      });
      if (ok) {
        this.coffre.supprimer(d.id);
        this.charger();
      }
    }
  }
}
