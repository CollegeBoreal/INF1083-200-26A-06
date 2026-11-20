import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { AuthService } from '../services/auth.service';
import { ProfilService } from '../services/profil.service';
import { SyncService } from '../services/sync.service';
import { preparerPage } from '../shared/ui';

/** Écran de départ : envoie vers la vidéo d'intro, Bienvenue ou Mon parcours. */
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
    private sync: SyncService,
    private profil: ProfilService,
    private router: RouterExtensions
  ) {
    preparerPage(page);
  }

  async ngOnInit(): Promise<void> {
    let cible: string;
    if (!this.auth.connecte && !this.auth.invite) {
      // Première ouverture : la vidéo d'abord, pas le formulaire de connexion.
      cible = '/intro';
    } else {
      if (this.auth.connecte) {
        // Récupère la dernière version en ligne, sans bloquer plus de 3 secondes.
        await Promise.race([this.sync.recuperer(), new Promise((r) => setTimeout(r, 3000))]);
      }
      cible = this.profil.get() ? '/parcours' : '/bienvenue';
    }
    setTimeout(() => this.router.navigate([cible], { clearHistory: true, animated: false }));
  }
}
