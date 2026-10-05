import { Observable } from '@nativescript/core'

export class HelloWorldModel extends Observable {
  contacts = [
    { name: 'Céline Dion', description: 'Chanteuse québécoise' },
    { name: 'Denis Villeneuve', description: 'Réalisateur québécois' },
    { name: 'Xavier Dolan', description: 'Réalisateur et acteur' },
    { name: 'Ginette Reno', description: 'Chanteuse et actrice' },
    { name: 'Robert Lepage', description: 'Metteur en scène et acteur' },
    { name: 'Kim Thúy', description: 'Écrivaine québécoise' },
    { name: 'Marc-André Fleury', description: 'Joueur de hockey' },
    { name: 'Guy Laliberté', description: 'Fondateur du Cirque du Soleil' }
  ]

  constructor() {
    super()
  }
}