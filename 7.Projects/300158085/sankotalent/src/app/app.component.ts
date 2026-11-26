import { Component } from '@angular/core'
import { LangueService } from './shared/langue.service'
import { NavigationService } from './shared/navigation.service'

@Component({
  standalone: false,
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(public l: LangueService, public nav: NavigationService) {}

  // Garde l'onglet en mémoire quand l'utilisateur touche la barre d'onglets
  ongletChange(args: any): void {
    this.nav.onglet = args.newIndex
  }
}
