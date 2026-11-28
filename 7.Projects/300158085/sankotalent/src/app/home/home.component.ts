import { Component } from '@angular/core'
import { Page, View } from '@nativescript/core'
import { DataService, DataItem } from '../shared/data.service'
import { LangueService } from '../shared/langue.service'
import { apparaitre, pulser } from '../shared/animations'
import { NavigationService } from '../shared/navigation.service'
import { categorieDe, categorieParCle } from '../shared/categories'

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  apparaitre = apparaitre

  constructor(public data: DataService, public l: LangueService, public nav: NavigationService, page: Page) {
    page.actionBarHidden = true
  }

  // Lu directement dans le service : la liste se met à jour après une actualisation.
  // Si une catégorie a été choisie sur l'Accueil, seuls ses talents sont affichés.
  get items(): Array<DataItem> {
    const tous = this.data.getItems()
    return this.nav.filtre ? tous.filter((t) => categorieDe(t) === this.nav.filtre) : tous
  }

  // Nom de la catégorie active, dans la langue choisie
  get categorieActive() {
    return this.nav.filtre ? categorieParCle(this.nav.filtre) : null
  }

  get nomFiltre(): string {
    const categorie = this.nav.filtre ? categorieParCle(this.nav.filtre) : null
    return categorie ? this.l.tr(categorie.nom) : ''
  }

  retirerFiltre(args: any): void {
    pulser(args.object)
    this.nav.filtre = null
  }

  // Texte sous le titre : date de mise à jour ou état de la liste
  get etat(): string {
    if (this.data.derniereMiseAJour === null) {
      return this.data.horsLigne ? this.l.t('talents.horsLigne') : this.l.t('talents.integree')
    }
    const texte = `${this.l.t('talents.maj')} ${this.l.ilYa(this.data.derniereMiseAJour)}`
    return this.data.horsLigne ? `${this.l.t('talents.horsLigne')} · ${texte}` : texte
  }

  initiales(nom: string): string {
    return nom
      .split(' ')
      .map((mot) => mot.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  changerLangue(args: any): void {
    pulser(args.object)
    this.l.basculer()
  }

  // Bouton d'actualisation : l'icône tourne pendant le téléchargement
  async actualiser(args: any): Promise<void> {
    const icone = args.object as View
    icone.rotate = 0
    icone.animate({ rotate: 360, duration: 700 }).catch(() => {})
    await this.data.actualiser()
  }
}
