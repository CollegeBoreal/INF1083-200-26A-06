import { Component } from '@angular/core'
import { Page } from '@nativescript/core'
import { LangueService } from '../shared/langue.service'
import { FormationsService } from '../shared/formations.service'
import { Formation, COULEURS } from '../shared/formations'
import { CATEGORIES, categorieParCle } from '../shared/categories'
import { apparaitre, pulser } from '../shared/animations'

@Component({
  standalone: false,
  selector: 'Formations',
  templateUrl: './formations.component.html',
})
export class FormationsComponent {
  apparaitre = apparaitre
  categories = CATEGORIES
  domaine: string = null // null = toutes les formations

  constructor(public l: LangueService, public fs: FormationsService, page: Page) {
    page.actionBarHidden = true
    fs.actualiser()
  }

  get formations(): Formation[] {
    const toutes = this.fs.getFormations()
    return this.domaine ? toutes.filter((f) => f.categorie === this.domaine) : toutes
  }

  // Formations auxquelles la personne est inscrite
  get mesFormations(): Formation[] {
    return this.fs.getFormations().filter((f) => this.fs.estInscrit(f.id))
  }

  choisirDomaine(args: any, cle: string): void {
    pulser(args.object)
    this.domaine = cle
  }

  couleur(f: Formation): string {
    return COULEURS[f.categorie] || '#22E39A'
  }

  // Même couleur, très transparente, pour le fond de la pastille
  fond(f: Formation): string {
    const hex = this.couleur(f).replace('#', '')
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.substring(i, i + 2), 16))
    return `rgba(${r}, ${g}, ${b}, 0.15)`
  }

  // Ligne d'informations : « 10 sem. · Intermédiaire · Réseau »
  meta(f: Formation): string {
    const categorie = categorieParCle(f.categorie)
    const nom = categorie ? this.l.tr(categorie.nom) : ''
    return `${f.semaines} ${this.l.t('formations.semaines')} · ${this.l.t('niveau.' + f.niveau)} · ${nom}`
  }

  changerLangue(args: any): void {
    pulser(args.object)
    this.l.basculer()
  }
}
