import { Injectable } from '@angular/core'

// Onglet affiché : 0 = Accueil, 1 = Talents, 2 = Mon profil.
// Partagé entre la barre d'onglets et les pages qui veulent changer d'onglet.
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  onglet = 0

  // Catégorie choisie sur l'Accueil pour filtrer la liste des talents (null = tous)
  filtre: string = null
}
