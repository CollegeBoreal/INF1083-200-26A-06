import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page, Utils } from '@nativescript/core';
import { Etape, Plateforme, Video } from '../models';
import { ParcoursService } from '../services/parcours.service';
import { ouvrirRechercheTikTok, ouvrirRechercheYouTube } from '../shared/outils';
import { preparerPage } from '../shared/ui';

@Component({
  selector: 'videos',
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
              <Label class="oeil" text="EN VIDÉO"></Label>
              <Label class="titre-moyen" [text]="etape.titre" textWrap="true"></Label>
              <Label class="texte" marginTop="8" textWrap="true"
                     text="Des nouveaux arrivants qui l'ont déjà fait. Vidéos choisies et vérifiées par Étape."></Label>
            </StackLayout>

            <!-- Onglets TikTok / YouTube -->
            <FlexboxLayout marginTop="18" class="entree-2">
              @for (o of onglets; track o.id) {
                <GridLayout class="pastille" [class.pastille-active]="onglet === o.id" (tap)="choisir(o.id)">
                  <Label class="pastille-txt" [class.pastille-txt-actif]="onglet === o.id" [text]="o.nom"></Label>
                </GridLayout>
              }
            </FlexboxLayout>

            @if (videos.length) {
              <FlexboxLayout flexWrap="wrap" justifyContent="space-between" marginTop="8" class="entree-2">
                @for (v of videos; track v.url) {
                  <StackLayout class="video" (tap)="ouvrir(v)">
                    <GridLayout class="video-cadre" [class.video-cadre-yt]="v.plateforme === 'youtube'">
                      <GridLayout class="video-play" horizontalAlignment="center" verticalAlignment="center">
                        <Label class="ico" fontSize="28" color="#141414" textAlignment="center" verticalAlignment="center" text="&#xe037;"></Label>
                      </GridLayout>
                    </GridLayout>
                    <Label class="video-titre" [text]="v.titre" textWrap="true"></Label>
                    <Label class="petit" [text]="v.auteur"></Label>
                  </StackLayout>
                }
              </FlexboxLayout>
            } @else {
              <StackLayout class="carte-gris entree-2" marginTop="8">
                <Label class="ico" fontSize="34" color="#141414" text="&#xe037;"></Label>
                <Label class="ligne-txt" marginTop="8" text="Bientôt ici"></Label>
                <Label class="petit" marginTop="2" textWrap="true"
                       [text]="'On choisit encore les meilleures vidéos pour cette étape. En attendant, cherche directement sur ' + nomOnglet + '.'"></Label>
              </StackLayout>
            }

            <FlexboxLayout class="btn btn-blanc" marginTop="14" justifyContent="center" alignItems="center" (tap)="chercher()">
              <Label class="ico btn-ico-noir" text="&#xe8b6;"></Label>
              <Label class="btn-txt-noir" [text]="'Chercher sur ' + nomOnglet"></Label>
            </FlexboxLayout>
          </StackLayout>
        </ScrollView>

        <StackLayout row="1" class="pied-blanc">
          <FlexboxLayout class="btn btn-noir" justifyContent="center" alignItems="center" (tap)="partager()">
            <Label class="ico btn-ico" text="&#xe80d;"></Label>
            <Label class="btn-txt" text="Partager ma progression"></Label>
          </FlexboxLayout>
        </StackLayout>
      </GridLayout>
    }
  `,
})
export class VideosComponent {
  etape?: Etape;
  onglet: Plateforme = 'tiktok';
  onglets: { id: Plateforme; nom: string }[] = [
    { id: 'tiktok', nom: 'TikTok' },
    { id: 'youtube', nom: 'YouTube' },
  ];
  videos: Video[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    page: Page,
    route: ActivatedRoute,
    public router: RouterExtensions,
    parcours: ParcoursService
  ) {
    preparerPage(page, '#FFFFFF');
    this.etape = parcours.get(route.snapshot.params['id']);
    this.choisir('tiktok');
  }

  get nomOnglet(): string {
    return this.onglet === 'tiktok' ? 'TikTok' : 'YouTube';
  }

  choisir(p: Plateforme): void {
    this.onglet = p;
    this.videos = (this.etape?.videos ?? []).filter((v) => v.plateforme === p);
    this.cdr.markForCheck();
  }

  ouvrir(v: Video): void {
    Utils.openUrl(v.url);
  }

  chercher(): void {
    if (!this.etape) return;
    if (this.onglet === 'tiktok') ouvrirRechercheTikTok(this.etape.rechercheVideo);
    else ouvrirRechercheYouTube(this.etape.rechercheVideo);
  }

  partager(): void {
    this.router.navigate(['/partage'], { transition: { name: 'slideTop', duration: 280 } });
  }
}
