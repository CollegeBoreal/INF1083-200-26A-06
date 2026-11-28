import { Component } from '@angular/core'
import { ApplicationSettings, Dialogs } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular'
import { LangueService } from '../../shared/langue.service'
import { FormationsService } from '../../shared/formations.service'
import { CATEGORIES } from '../../shared/categories'
import { courrielValide, envoyerCourriel } from '../../shared/courriel'
import { VILLES } from '../../shared/villes'
import { apparaitre, pulser } from '../../shared/animations'

@Component({
  standalone: false,
  selector: 'Formateur',
  templateUrl: './formateur.component.html',
})
export class FormateurComponent {
  apparaitre = apparaitre
  categories = CATEGORIES
  disponibilites = ['soirs', 'weekend', 'plein']

  nom = ApplicationSettings.getString('profil.nom', '')
  courriel = ''
  telephone = ''
  villes = VILLES
  indexVille = 0 // Kinshasa par défaut

  get ville(): string {
    return this.villes[this.indexVille] || ''
  }

  domaine = 'reseau'
  experience = ApplicationSettings.getString('profil.experience', '')
  certifications = ''
  dispo = 'soirs'
  message = ''
  erreur = ''

  constructor(public l: LangueService, private fs: FormationsService, private router: RouterExtensions) {}

  choisirDomaine(args: any, cle: string): void {
    pulser(args.object)
    this.domaine = cle
  }

  choisirDispo(args: any, d: string): void {
    pulser(args.object)
    this.dispo = d
  }

  async envoyer(args: any): Promise<void> {
    pulser(args.object)
    if (!this.nom.trim() || !courrielValide(this.courriel) || !this.telephone.trim()) {
      this.erreur = this.l.t('erreur.champs')
      return
    }
    this.erreur = ''
    const domaine = this.l.tr(CATEGORIES.find((c) => c.cle === this.domaine).nom)
    const dispo = this.l.t('dispo.' + this.dispo)
    this.fs.enregistrerCandidature({
      nom: this.nom, courriel: this.courriel, telephone: this.telephone, ville: this.ville,
      domaine: this.domaine, experience: this.experience, certifications: this.certifications, dispo: this.dispo,
    })

    const corps =
      this.l.langue === 'fr'
        ? `Bonjour,\n\nJe souhaite devenir formateur avec SANKOVEYA.\n\nNom : ${this.nom}\nCourriel : ${this.courriel}\nTéléphone : ${this.telephone}\nVille : ${this.ville}\nDomaine : ${domaine}\nAnnées d'expérience : ${this.experience}\nCertifications : ${this.certifications}\nDisponibilité : ${dispo}\n\n${this.message}\n\nCordialement,`
        : `Hello,\n\nI would like to become an instructor with SANKOVEYA.\n\nName: ${this.nom}\nEmail: ${this.courriel}\nPhone: ${this.telephone}\nCity: ${this.ville}\nField: ${domaine}\nYears of experience: ${this.experience}\nCertifications: ${this.certifications}\nAvailability: ${dispo}\n\n${this.message}\n\nBest regards,`
    await envoyerCourriel(
      `SankoTalent – ${this.l.t('formateur.sujet')} (${domaine})`,
      corps,
      this.l.t('formateur.page'),
      this.l.t('inscription.sansCourriel')
    )
    await Dialogs.alert({ title: this.l.t('formateur.page'), message: this.l.t('formateur.merci'), okButtonText: 'OK' })
    this.router.back()
  }
}
