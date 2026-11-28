import { isIOS, Utils } from '@nativescript/core'

// Ouvre l'application de cartes du téléphone : Plans sur iPhone, Google Maps sur Android.
// Aucune clé d'accès ni plugin n'est nécessaire.
export function ouvrirCarteLieu(lieu: string): void {
  const requete = encodeURIComponent(lieu)
  Utils.openUrl(isIOS ? `https://maps.apple.com/?q=${requete}` : `https://www.google.com/maps/search/?api=1&query=${requete}`)
}

export function ouvrirCarteCoordonnees(latitude: number, longitude: number, libelle: string): void {
  const position = `${latitude},${longitude}`
  Utils.openUrl(
    isIOS
      ? `https://maps.apple.com/?ll=${position}&q=${encodeURIComponent(libelle)}`
      : `https://www.google.com/maps/search/?api=1&query=${position}`
  )
}
