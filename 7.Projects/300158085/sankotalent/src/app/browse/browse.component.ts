import { Component, OnInit } from '@angular/core'
import { Page } from '@nativescript/core'
import { DataService } from '../shared/data.service'
import { LangueService } from '../shared/langue.service'
import { NavigationService } from '../shared/navigation.service'
import { apparaitre, pulser, zoomer } from '../shared/animations'

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  nombreTalents = 0
  apparaitre = apparaitre
  zoomer = zoomer

  constructor(private _data: DataService, public l: LangueService, private nav: NavigationService, page: Page) {
    page.actionBarHidden = true
  }

  ngOnInit(): void {
    this.nombreTalents = this._data.getItems().length
  }

  changerLangue(args: any): void {
    pulser(args.object)
    this.l.basculer()
  }

  // Ouvre un onglet depuis une carte de l'accueil (1 = Talents, 2 = Mon profil)
  ouvrirOnglet(args: any, onglet: number): void {
    pulser(args.object)
    setTimeout(() => (this.nav.onglet = onglet), 150)
  }
}
