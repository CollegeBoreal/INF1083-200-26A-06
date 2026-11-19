import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { ProfilService } from '../services/profil.service';

/** Écran vide qui envoie vers « Bienvenue » ou vers « Mon parcours ». */
@Component({
  selector: 'demarrage',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `<StackLayout class="fond"></StackLayout>`,
})
export class DemarrageComponent implements OnInit {
  constructor(page: Page, private profil: ProfilService, private router: RouterExtensions) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
    const cible = this.profil.get() ? '/parcours' : '/bienvenue';
    setTimeout(() => this.router.navigate([cible], { clearHistory: true, animated: false }));
  }
}
