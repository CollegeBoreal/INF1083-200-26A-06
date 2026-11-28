import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApplicationSettings, Dialogs } from '@nativescript/core'
import { LangueService } from '../../shared/langue.service'
import { FormationsService } from '../../shared/formations.service'
import { Formation, COULEURS } from '../../shared/formations'
import { categorieParCle } from '../../shared/categories'
import { courrielValide, envoyerCourriel } from '../../shared/courriel'
import { VILLES } from '../../shared/villes'
import { apparaitre, pulser, zoomer } from '../../shared/animations'

@Component({
  standalone: false,
  selector: 'FormationDetail',
  templateUrl: './formation-detail.component.html',
})
export class FormationDetailComponent implements OnInit {
  f: Formation
  apparaitre = apparaitre
  zoomer = zoomer
  niveaux = ['debutant', 'intermediaire', 'avance']

  // Formulaire d'inscription (prérempli avec le nom de « Mon profil »)
  nom = ApplicationSettings.getString('profil.nom', '')
  courriel = ''
  telephone = ''
  villes = VILLES
  indexVille = 0 // Kinshasa par défaut

  get ville(): string {
    return this.villes[this.indexVille] || ''
  }

  niveau = 'debutant'
  erreur = ''

  constructor(private route: ActivatedRoute, public l: LangueService, public fs: FormationsService) {}

  ngOnInit(): void {
    this.f = this.fs.getFormation(+this.route.snapshot.params['id'])
    const deja = this.fs.inscriptions.find((i) => i.formationId === this.f?.id)
    if (deja) {
      this.nom = deja.nom
      this.courriel = deja.courriel
      this.telephone = deja.telephone
      this.indexVille = Math.max(0, this.villes.indexOf(deja.ville))
      this.niveau = deja.niveau
    }
  }

  get couleur(): string {
    return COULEURS[this.f.categorie] || '#22E39A'
  }

  get fond(): string {
    const hex = this.couleur.replace('#', '')
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.substring(i, i + 2), 16))
    return `rgba(${r}, ${g}, ${b}, 0.15)`
  }

  get nomCategorie(): string {
    const c = categorieParCle(this.f.categorie)
    return c ? this.l.tr(c.nom) : ''
  }

  // Numéro de module sur deux chiffres : 01, 02…
  numero(i: number): string {
    return String(i + 1).padStart(2, '0')
  }

  choisirNiveau(args: any, niveau: string): void {
    pulser(args.object)
    this.niveau = niveau
  }

  async inscrire(args: any): Promise<void> {
    pulser(args.object)
    if (!this.nom.trim() || !courrielValide(this.courriel) || !this.telephone.trim()) {
      this.erreur = this.l.t('erreur.champs')
      return
    }
    this.erreur = ''
    this.fs.enregistrerInscription({
      formationId: this.f.id,
      nom: this.nom.trim(),
      courriel: this.courriel.trim(),
      telephone: this.telephone.trim(),
      ville: this.ville,
      niveau: this.niveau,
      date: Date.now(),
    })

    const titre = this.l.tr(this.f.titre)
    const corps =
      this.l.langue === 'fr'
        ? `Bonjour,\n\nJe souhaite m'inscrire à la formation « ${titre} » (${this.f.code}).\n\nNom : ${this.nom}\nCourriel : ${this.courriel}\nTéléphone : ${this.telephone}\nVille : ${this.ville}\nNiveau actuel : ${this.l.t('niveau.' + this.niveau)}\n\nMerci,`
        : `Hello,\n\nI would like to enroll in the "${titre}" training (${this.f.code}).\n\nName: ${this.nom}\nEmail: ${this.courriel}\nPhone: ${this.telephone}\nCity: ${this.ville}\nCurrent level: ${this.l.t('niveau.' + this.niveau)}\n\nThank you,`
    const envoye = await envoyerCourriel(
      `SankoTalent – ${this.l.t('inscription.sujet')} ${this.f.code}`,
      corps,
      this.l.t('inscription.titre'),
      this.l.t('inscription.sansCourriel')
    )
    if (envoye) {
      await Dialogs.alert({ title: this.l.t('inscription.titre'), message: this.l.t('inscription.merci'), okButtonText: 'OK' })
    }
  }
}
