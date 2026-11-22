import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { activerLangue } from '../i18n/i18n';
import { AuthService } from '../services/auth.service';
import { LangueService } from '../services/langue.service';
import { ProfilService } from '../services/profil.service';
import { SyncService } from '../services/sync.service';
import { TraductionService } from '../services/traduction.service';
import { enLigne } from '../shared/reseau';
import { preparerPage } from '../shared/ui';

/**
 * Écran de départ. Ordre :
 * 1. pas de langue choisie → choix de la langue
 * 2. pas d'Internet → écran « Pas de connexion » (Waypoint fonctionne en ligne)
 * 3. pas connecté → vidéo d'intro puis création de compte
 * 4. sinon → Bienvenue (3 questions) ou Mon parcours
 */
@Component({
  selector: 'demarrage',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `<StackLayout class="fond"></StackLayout>`,
})
export class DemarrageComponent implements OnInit {
  constructor(
    page: Page,
    private auth: AuthService,
    private langue: LangueService,
    private traduction: TraductionService,
    private sync: SyncService,
    private profil: ProfilService,
    private router: RouterExtensions
  ) {
    preparerPage(page);
  }

  async ngOnInit(): Promise<void> {
    activerLangue(this.langue.code);
    let cible: string;
    if (!this.langue.choisie) {
      cible = '/langue';
    } else if (!enLigne()) {
      cible = '/hors-ligne';
    } else if (!this.auth.connecte) {
      cible = '/intro';
    } else {
      // Récupère la dernière version en ligne, sans bloquer plus de 3 secondes.
      await Promise.race([this.sync.recuperer(), new Promise((r) => setTimeout(r, 3000))]);
      cible = this.profil.get() ? '/parcours' : '/bienvenue';
    }
    // Textes ajoutés dans une mise à jour de l'app : on les traduit en arrière-plan.
    if (this.langue.choisie && enLigne() && this.traduction.manquants(this.langue.code) > 0) {
      this.traduction.preparer(this.langue.langue()).catch(() => {});
    }
    setTimeout(() => this.router.navigate([cible], { clearHistory: true, animated: false }));
  }
}
