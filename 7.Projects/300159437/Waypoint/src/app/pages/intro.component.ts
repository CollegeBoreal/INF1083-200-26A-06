import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { EventData, isAndroid, Page, WebView } from '@nativescript/core';
import { AuthService } from '../services/auth.service';
import { ProfilService } from '../services/profil.service';
import { preparerPage } from '../shared/ui';
import { tr } from '../i18n/i18n';

/**
 * Premier écran de l'app : la vidéo de présentation en plein écran.
 * Aucun champ à remplir ici : on montre d'abord Waypoint, la connexion vient après (et reste facultative).
 */
@Component({
  selector: 'intro',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="*, auto" backgroundColor="#000000">
      <!-- Vidéo plein écran -->
      <WebView row="0" rowSpan="2" src="~/assets/intro-plein.html" (loaded)="configurerVideo($event)"></WebView>

      <!-- Bas de l'écran : titre + boutons par-dessus la vidéo -->
      <StackLayout row="1" padding="24 20 32 20" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.85));">
        <Label text="waypoint" color="#FFFFFF" fontSize="34" fontWeight="bold"></Label>
        <Label [text]="t('Ton arrivée au Canada, étape par étape.')" color="#FFFFFF" opacity="0.85"
               fontSize="16" textWrap="true" marginBottom="22"></Label>

        <FlexboxLayout class="btn btn-accent" justifyContent="center" alignItems="center" (tap)="commencer()">
          <Label class="btn-txt" [text]="t('Commencer')"></Label>
          <Label class="ico btn-ico" marginLeft="8" marginRight="0" text="&#xe5c8;"></Label>
        </FlexboxLayout>
        <Label [text]="t('J\\'ai déjà un compte · Se connecter')" color="#FFFFFF" fontSize="15" fontWeight="bold"
               horizontalAlignment="center" marginTop="16" padding="6" (tap)="seConnecter()"></Label>
      </StackLayout>
    </GridLayout>
  `,
})
export class IntroComponent {
  t = tr;
  private videoPrete = false;

  constructor(
    page: Page,
    private auth: AuthService,
    private profil: ProfilService,
    private router: RouterExtensions
  ) {
    preparerPage(page);
  }

  /** Nouvel utilisateur : il crée son compte (l'app fonctionne en ligne, avec un compte). */
  commencer(): void {
    this.router.navigate(['/connexion'], { queryParams: { inscription: '1' }, transition: { name: 'slideLeft', duration: 250 } });
  }

  /** Utilisateur qui a déjà un compte : écran de connexion. */
  seConnecter(): void {
    this.router.navigate(['/connexion'], { transition: { name: 'slideLeft', duration: 250 } });
  }

  /** Lecture automatique (sans le son) dans la WebView. */
  configurerVideo(args: EventData): void {
    const wv = args.object as WebView;
    if (isAndroid && wv.android) {
      const reglages = wv.android.getSettings();
      reglages.setMediaPlaybackRequiresUserGesture(false);
      reglages.setAllowFileAccess(true);
      wv.android.setBackgroundColor(0); // transparent : le fond noir vient de la page
      if (!this.videoPrete) {
        this.videoPrete = true;
        wv.reload();
      }
    } else if (wv.ios) {
      wv.ios.opaque = false;
      wv.ios.backgroundColor = UIColor.blackColor;
      wv.ios.scrollView.scrollEnabled = false;
    }
  }
}
