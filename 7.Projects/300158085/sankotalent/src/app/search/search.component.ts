import { Component, NgZone, OnInit } from '@angular/core'
import { ApplicationSettings, CoreTypes, Dialogs, ImageAsset, Page } from '@nativescript/core'
import { isAvailable, requestPermissions, takePicture } from '@nativescript/camera'
import * as geolocation from '@nativescript/geolocation'
import { create, ImagePickerMediaType } from '@nativescript/imagepicker'
import { LangueService } from '../shared/langue.service'
import { apparaitre, pulser, zoomer } from '../shared/animations'

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  nom = ''
  specialite = ''
  experience = ''
  latitude: number = null
  longitude: number = null
  erreurPosition = false
  photo: ImageAsset
  apparaitre = apparaitre
  zoomer = zoomer

  constructor(private zone: NgZone, public l: LangueService, page: Page) {
    page.actionBarHidden = true
  }

  ngOnInit(): void {
    this.nom = ApplicationSettings.getString('profil.nom', '')
    this.specialite = ApplicationSettings.getString('profil.specialite', '')
    this.experience = ApplicationSettings.getString('profil.experience', '')
    if (ApplicationSettings.hasKey('profil.latitude')) {
      this.latitude = ApplicationSettings.getNumber('profil.latitude')
      this.longitude = ApplicationSettings.getNumber('profil.longitude')
    }
  }

  // Texte de la position, recalculé dans la langue choisie
  get position(): string {
    if (this.erreurPosition) return this.l.t('profil.erreurPosition')
    if (this.latitude === null) return this.l.t('profil.nonDetectee')
    return `Latitude ${this.latitude.toFixed(4)}, longitude ${this.longitude.toFixed(4)}`
  }

  changerLangue(args: any): void {
    pulser(args.object)
    this.l.basculer()
  }

  // Le simulateur iOS déclare une caméra mais plante à l'ouverture : on le détecte avant
  private estSimulateur(): boolean {
    try {
      const info = (globalThis as any).NSProcessInfo
      return !!info && !!info.processInfo.environment.objectForKey('SIMULATOR_DEVICE_NAME')
    } catch (erreur) {
      return false
    }
  }

  private alerteCamera(): void {
    Dialogs.alert({ title: this.l.t('camera.titre'), message: this.l.t('camera.absente'), okButtonText: 'OK' })
  }

  async prendrePhoto(args: any): Promise<void> {
    pulser(args.object)
    if (this.estSimulateur() || !isAvailable()) {
      this.alerteCamera()
      return
    }
    try {
      await requestPermissions()
      const image = await takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: false })
      this.zone.run(() => (this.photo = image))
    } catch (erreur) {
      this.alerteCamera()
    }
  }

  async choisirPhoto(args: any): Promise<void> {
    pulser(args.object)
    try {
      const galerie = create({ mode: 'single', mediaType: ImagePickerMediaType.Image })
      // Pas d'appel à authorize() : sur iOS 27 il bloque l'application.
      // Le sélecteur demande lui-même l'accès aux photos.
      const selection: any[] = await galerie.present()
      if (selection && selection.length > 0) {
        const choix = selection[0]
        const image = choix.asset ? choix.asset : choix
        this.zone.run(() => (this.photo = image))
      }
    } catch (erreur) {
      // Sélection annulée par l'utilisateur : rien à faire
    }
  }

  async detecterPosition(args: any): Promise<void> {
    pulser(args.object)
    try {
      await geolocation.enableLocationRequest(false)
      const lieu = await geolocation.getCurrentLocation({
        desiredAccuracy: CoreTypes.Accuracy.high,
        maximumAge: 5000,
        timeout: 20000,
      })
      this.zone.run(() => {
        this.erreurPosition = false
        this.latitude = lieu.latitude
        this.longitude = lieu.longitude
      })
    } catch (erreur) {
      this.zone.run(() => (this.erreurPosition = true))
    }
  }

  enregistrer(args: any): void {
    pulser(args.object)
    ApplicationSettings.setString('profil.nom', this.nom)
    ApplicationSettings.setString('profil.specialite', this.specialite)
    ApplicationSettings.setString('profil.experience', this.experience)
    if (this.latitude !== null) {
      ApplicationSettings.setNumber('profil.latitude', this.latitude)
      ApplicationSettings.setNumber('profil.longitude', this.longitude)
    }
    Dialogs.alert({ title: this.l.t('profil.dialogue'), message: this.l.t('profil.enregistre'), okButtonText: 'OK' })
  }
}
