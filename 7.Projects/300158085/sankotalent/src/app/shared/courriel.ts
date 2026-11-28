import { Dialogs } from '@nativescript/core'
import { available, compose } from '@nativescript/email'

// Adresse qui reçoit les inscriptions aux formations et les candidatures de formateur
export const COURRIEL_SANKOVEYA = 'contact@sankoveya.com'

// Ouvre un courriel prérempli. Sans compte de courriel (simulateur),
// affiche l'adresse pour que la personne écrive elle-même.
export async function envoyerCourriel(sujet: string, corps: string, titre: string, messageSansCourriel: string): Promise<boolean> {
  if (!(await available())) {
    await Dialogs.alert({ title: titre, message: `${messageSansCourriel} ${COURRIEL_SANKOVEYA}`, okButtonText: 'OK' })
    return false
  }
  await compose({ to: [COURRIEL_SANKOVEYA], subject: sujet, body: corps })
  return true
}

// Vérification simple d'une adresse de courriel
export function courrielValide(adresse: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((adresse || '').trim())
}
