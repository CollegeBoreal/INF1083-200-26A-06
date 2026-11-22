import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page, Utils } from '@nativescript/core';
import { Etape, NOMS_DOCS, TypeDoc } from '../models';
import { CoffreService } from '../services/coffre.service';
import { ParcoursService } from '../services/parcours.service';
import { ProfilService } from '../services/profil.service';
import { SyncService } from '../services/sync.service';
import { ouvrirCarte } from '../shared/outils';
import { preparerPage } from '../shared/ui';
import { tr } from '../i18n/i18n';

@Component({
  selector: 'etape',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    @if (etape) {
      <GridLayout rows="*, auto" class="fond-blanc">
        <ScrollView row="0">
          <StackLayout class="page">
            <GridLayout class="rond-btn-gris" horizontalAlignment="left" (tap)="router.back()">
              <Label class="ico rond-ico" text="&#xe5cb;"></Label>
            </GridLayout>

            <StackLayout class="entree" marginTop="20">
              <Label class="oeil" [text]="t('ÉTAPE {n} SUR {total}', { n: numero, total: total })"></Label>
              <Label class="titre-moyen" [text]="etape.titre" textWrap="true"></Label>
              <Label class="texte" marginTop="8" [text]="etape.pourquoi" textWrap="true"></Label>
              <StackLayout orientation="horizontal" marginTop="14">
                <StackLayout orientation="horizontal" class="puce">
                  <Label class="ico puce-ico" text="&#xe8b5;"></Label>
                  <Label class="puce-txt" [text]="etape.duree"></Label>
                </StackLayout>
                <StackLayout orientation="horizontal" class="puce">
                  <Label class="ico puce-ico" text="&#xe873;"></Label>
                  <Label class="puce-txt" [text]="t('{n} documents', { n: documents.length })"></Label>
                </StackLayout>
              </StackLayout>
            </StackLayout>

            <Label class="etiquette entree-2" [text]="t('APPORTE')"></Label>
            <StackLayout class="liste-bordee entree-2">
              @for (d of documents; track $index; let dernier = $last) {
                <GridLayout columns="auto, *, auto" class="ligne" [class.ligne-derniere]="dernier">
                  <GridLayout col="0" class="tuile-ico" [class.tuile-ico-rouge]="!d.present">
                    <Label class="ico tuile-ico-txt" text="&#xe873;"></Label>
                  </GridLayout>
                  <Label col="1" class="ligne-txt" [text]="d.nom" textWrap="true"></Label>
                  <GridLayout col="2" class="badge" [class.badge-manquant]="!d.present">
                    <Label class="badge-txt" [class.badge-txt-manquant]="!d.present" [text]="d.present ? t('Dans ton coffre') : t('Manquant')"></Label>
                  </GridLayout>
                </GridLayout>
              }
            </StackLayout>

            <Label class="etiquette entree-3" [text]="t('COMMENT')"></Label>
            <StackLayout class="entree-3">
              @for (c of etape.comment; track $index; let i = $index) {
                <GridLayout columns="auto, *" class="etape-ligne">
                  <GridLayout col="0" class="numero">
                    <Label class="numero-txt" [text]="(i + 1) + ''"></Label>
                  </GridLayout>
                  <Label col="1" class="etape-txt" [text]="c" textWrap="true"></Label>
                </GridLayout>
              }
            </StackLayout>

            <GridLayout columns="auto, *, auto" class="carte-gris" marginTop="8" (tap)="videos()">
              <GridLayout col="0" class="tuile-ico tuile-ico-noire">
                <Label class="ico tuile-ico-txt blanc" text="&#xe037;"></Label>
              </GridLayout>
              <StackLayout col="1" verticalAlignment="center">
                <Label class="ligne-txt" [text]="t('Vidéos TikTok et YouTube')"></Label>
                <Label class="petit" [text]="t('Des gens qui l\\'ont déjà fait')"></Label>
              </StackLayout>
              <Label col="2" class="ico chevron" text="&#xe5cc;"></Label>
            </GridLayout>

            <StackLayout orientation="horizontal" marginTop="16" (tap)="source()">
              <Label class="b accent-texte" fontSize="15" [text]="t('Source officielle')"></Label>
              <Label class="ico accent-texte" fontSize="17" marginLeft="4" text="&#xe89e;"></Label>
            </StackLayout>
          </StackLayout>
        </ScrollView>

        <GridLayout row="1" columns="*, 10, 1.6*" class="pied-blanc">
          <FlexboxLayout col="0" class="btn btn-gris" justifyContent="center" alignItems="center" (tap)="ouAller()">
            <Label class="ico btn-ico-noir" text="&#xe55f;"></Label>
            <Label class="btn-txt-noir" [text]="t('Où aller')"></Label>
          </FlexboxLayout>
          <FlexboxLayout col="2" class="btn" [class.btn-accent]="!faite" [class.btn-noir]="faite"
                         justifyContent="center" alignItems="center" (tap)="basculer()">
            <Label class="ico btn-ico" [text]="faite ? icoAnnuler : icoOk"></Label>
            <Label class="btn-txt" [text]="faite ? t('Annuler') : t('C\\'est fait')"></Label>
          </FlexboxLayout>
        </GridLayout>
      </GridLayout>
    }
  `,
})
export class EtapeComponent {
  t = tr;
  etape?: Etape;
  numero = 0;
  total = 0;
  faite = false;
  documents: { nom: string; present: boolean }[] = [];
  icoAnnuler = '\ue166';
  icoOk = '\ue5ca';

  constructor(
    private cdr: ChangeDetectorRef,
    page: Page,
    route: ActivatedRoute,
    public router: RouterExtensions,
    private parcours: ParcoursService,
    private coffre: CoffreService,
    private profil: ProfilService,
    private sync: SyncService
  ) {
    preparerPage(page, '#FFFFFF');
    const id = route.snapshot.params['id'];
    this.etape = this.parcours.get(id);
    const toutes = this.parcours.etapes();
    this.numero = toutes.findIndex((e) => e.id === id) + 1;
    this.total = toutes.length;
    page.on('navigatedTo', () => this.charger());
    this.charger();
  }

  charger(): void {
    if (!this.etape) return;
    this.faite = this.parcours.estFaite(this.etape.id);
    this.documents = this.etape.documents.map((t: TypeDoc) => ({ nom: tr(NOMS_DOCS[t]), present: this.coffre.possede(t) }));
    this.cdr.markForCheck();
  }

  basculer(): void {
    if (!this.etape) return;
    this.parcours.basculer(this.etape.id);
    this.sync.envoyer(); // sauvegarde en ligne (si connecté), sans attendre
    this.router.back();
  }

  ouAller(): void {
    if (!this.etape) return;
    ouvrirCarte(`${this.etape.recherche} ${this.profil.get()?.ville ?? ''}`);
  }

  videos(): void {
    if (this.etape) this.router.navigate(['/videos', this.etape.id], { transition: { name: 'slideLeft', duration: 250 } });
  }

  source(): void {
    if (this.etape) Utils.openUrl(this.etape.source);
  }
}
