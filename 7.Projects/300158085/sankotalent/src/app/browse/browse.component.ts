import { Component } from '@angular/core'
import { Page } from '@nativescript/core'
import { DataService } from '../shared/data.service'
import { LangueService } from '../shared/langue.service'
import { NavigationService } from '../shared/navigation.service'
import { apparaitre, pulser, zoomer } from '../shared/animations'
import { CATEGORIES, categorieDe } from '../shared/categories'

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent {
  apparaitre = apparaitre
  zoomer = zoomer
  categories = CATEGORIES
  floor = Math.floor

  constructor(private _data: DataService, public l: LangueService, private nav: NavigationService, page: Page) {
    page.actionBarHidden = true
  }

  // Nombre de talents, recalculé après chaque actualisation de la liste en ligne
  get nombreTalents(): number {
    return this._data.getItems().length
  }

  changerLangue(args: any): void {
    pulser(args.object)
    this.l.basculer()
  }

  // Nombre de talents dans une catégorie
  compter(cle: string): number {
    return this._data.getItems().filter((t) => categorieDe(t) === cle).length
  }

  // Ouvre l'onglet Talents filtré sur la catégorie touchée
  ouvrirCategorie(args: any, cle: string): void {
    pulser(args.object)
    setTimeout(() => {
      this.nav.filtre = cle
      this.nav.onglet = 1
    }, 150)
  }

  // Ouvre un onglet depuis une carte de l'accueil (1 = Talents, 2 = Formations, 3 = Mon profil)
  ouvrirOnglet(args: any, onglet: number): void {
    pulser(args.object)
    setTimeout(() => {
      if (onglet === 1) this.nav.filtre = null
      this.nav.onglet = onglet
    }, 150)
  }
}
