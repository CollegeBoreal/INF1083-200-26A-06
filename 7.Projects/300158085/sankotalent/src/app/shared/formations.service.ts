import { Injectable, NgZone } from '@angular/core'
import { ApplicationSettings, Http } from '@nativescript/core'
import { Formation, FORMATIONS_INTEGREES } from './formations'

// Catalogue publié sur GitHub : ajouter une formation ne demande pas de nouvelle version
const URL_FORMATIONS = 'https://raw.githubusercontent.com/kevinmayele/sankotalent-data/main/formations.json'
const CLE_CACHE = 'formations.cache'
const CLE_INSCRIPTIONS = 'formations.inscriptions'
const CLE_FORMATEUR = 'formateur.candidature'

// Inscription gardée sur le téléphone (affichée dans « Mes formations »)
export interface Inscription {
  formationId: number
  nom: string
  courriel: string
  telephone: string
  ville: string
  niveau: string
  date: number
}

@Injectable({
  providedIn: 'root',
})
export class FormationsService {
  private liste: Formation[] = FORMATIONS_INTEGREES
  inscriptions: Inscription[] = []

  constructor(private zone: NgZone) {
    try {
      const cache = JSON.parse(ApplicationSettings.getString(CLE_CACHE, 'null'))
      if (this.estValide(cache)) this.liste = cache
    } catch (e) {
      // cache illisible : on garde le catalogue intégré
    }
    try {
      this.inscriptions = JSON.parse(ApplicationSettings.getString(CLE_INSCRIPTIONS, '[]'))
    } catch (e) {
      this.inscriptions = []
    }
  }

  getFormations(): Formation[] {
    return this.liste
  }

  getFormation(id: number): Formation {
    return this.liste.find((f) => f.id === id)
  }

  // Télécharge formations.json ; en cas d'échec ou de format invalide, rien ne change
  async actualiser(): Promise<void> {
    try {
      const donnees: any = await Http.getJSON(`${URL_FORMATIONS}?t=${Date.now()}`)
      const formations = Array.isArray(donnees) ? donnees : donnees?.formations
      if (!this.estValide(formations)) return
      ApplicationSettings.setString(CLE_CACHE, JSON.stringify(formations))
      this.zone.run(() => (this.liste = formations))
    } catch (e) {
      // pas de connexion ou fichier absent : le catalogue actuel reste affiché
    }
  }

  estInscrit(id: number): boolean {
    return this.inscriptions.some((i) => i.formationId === id)
  }

  enregistrerInscription(inscription: Inscription): void {
    this.inscriptions = [...this.inscriptions.filter((i) => i.formationId !== inscription.formationId), inscription]
    ApplicationSettings.setString(CLE_INSCRIPTIONS, JSON.stringify(this.inscriptions))
  }

  get candidatureFormateur(): boolean {
    return ApplicationSettings.hasKey(CLE_FORMATEUR)
  }

  enregistrerCandidature(candidature: object): void {
    ApplicationSettings.setString(CLE_FORMATEUR, JSON.stringify({ ...candidature, date: Date.now() }))
  }

  // Une formation doit avoir au minimum un id, un code, un titre bilingue et une catégorie
  private estValide(formations: any): boolean {
    return (
      Array.isArray(formations) &&
      formations.length > 0 &&
      formations.every(
        (f) =>
          typeof f?.id === 'number' &&
          typeof f?.code === 'string' &&
          typeof f?.titre?.fr === 'string' &&
          typeof f?.titre?.en === 'string' &&
          typeof f?.categorie === 'string' &&
          typeof f?.description?.fr === 'string' &&
          typeof f?.description?.en === 'string' &&
          Array.isArray(f?.modules)
      )
    )
  }
}
