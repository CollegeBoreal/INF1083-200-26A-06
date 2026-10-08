import { Observable } from '@nativescript/core'

export class HelloWorldModel extends Observable {

  contacts = [
    {
      name: 'Céline Dion',
      description: 'Chanteuse québécoise',
      phone: '514-555-1001',
      nationality: 'Canadienne',
      details: 'Chanteuse québécoise connue internationalement pour sa carrière musicale.'
    },
    {
      name: 'Denis Villeneuve',
      description: 'Réalisateur québécois',
      phone: '514-555-1002',
      nationality: 'Canadienne',
      details: 'Réalisateur québécois connu pour plusieurs grands films internationaux.'
    },
    {
      name: 'Xavier Dolan',
      description: 'Réalisateur et acteur',
      phone: '514-555-1003',
      nationality: 'Canadienne',
      details: 'Réalisateur, acteur et scénariste québécois.'
    },
    {
      name: 'Ginette Reno',
      description: 'Chanteuse et actrice',
      phone: '514-555-1004',
      nationality: 'Canadienne',
      details: 'Artiste québécoise reconnue pour sa longue carrière dans la musique.'
    },
    {
      name: 'Robert Lepage',
      description: 'Metteur en scène et acteur',
      phone: '418-555-1005',
      nationality: 'Canadienne',
      details: 'Artiste québécois connu dans le théâtre, le cinéma et la mise en scène.'
    },
    {
      name: 'Kim Thúy',
      description: 'Écrivaine québécoise',
      phone: '514-555-1006',
      nationality: 'Canadienne',
      details: 'Écrivaine québécoise connue pour ses romans et ses récits.'
    },
    {
      name: 'Marc-André Fleury',
      description: 'Joueur de hockey',
      phone: '819-555-1007',
      nationality: 'Canadienne',
      details: 'Gardien de but québécois ayant joué dans la Ligue nationale de hockey.'
    },
    {
      name: 'Guy Laliberté',
      description: 'Fondateur du Cirque du Soleil',
      phone: '514-555-1008',
      nationality: 'Canadienne',
      details: 'Entrepreneur québécois et cofondateur du Cirque du Soleil.'
    }
  ]

  constructor() {
    super()
  }
}