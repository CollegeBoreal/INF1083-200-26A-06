
import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  items = signal<Person[]>([
    {
      id: 1,
      name: 'Lounès Matoub',
      nationality: 'Algérienne',
      notableAchievements: [
        'Chanteur et poète kabyle',
        'Défenseur de la culture amazighe'
      ]
    },
    {
      id: 2,
      name: 'Idir',
      nationality: 'Algérienne',
      notableAchievements: [
        'Chanteur kabyle',
        'Connu pour la chanson A Vava Inouva'
      ]
    },
    {
      id: 3,
      name: 'Mouloud Mammeri',
      nationality: 'Algérienne',
      notableAchievements: [
        'Écrivain et chercheur',
        'Travaux sur la langue amazighe'
      ]
    },
    {
      id: 4,
      name: 'Kateb Yacine',
      nationality: 'Algérienne',
      notableAchievements: [
        'Écrivain et dramaturge',
        'Auteur du roman Nedjma'
      ]
    },
    {
      id: 5,
      name: 'Assia Djebar',
      nationality: 'Algérienne',
      notableAchievements: [
        'Écrivaine et réalisatrice',
        'Membre de l’Académie française'
      ]
    },
    {
      id: 6,
      name: 'Mohamed Dib',
      nationality: 'Algérienne',
      notableAchievements: [
        'Écrivain et poète',
        'Auteur de La Grande Maison'
      ]
    },
    {
      id: 7,
      name: 'Rabah Madjer',
      nationality: 'Algérienne',
      notableAchievements: [
        'Ancien footballeur international',
        'Vainqueur de la Coupe d’Europe en 1987'
      ]
    },
    {
      id: 8,
      name: 'Djamel Belmadi',
      nationality: 'Algérienne',
      notableAchievements: [
        'Ancien footballeur et entraîneur',
        'Vainqueur de la CAN 2019 avec l’Algérie'
      ]
    },
    {
      id: 9,
      name: 'Cheb Khaled',
      nationality: 'Algérienne',
      notableAchievements: [
        'Chanteur de raï',
        'Connu pour la chanson Didi'
      ]
    },
    {
      id: 10,
      name: 'Warda Al-Jazairia',
      nationality: 'Algérienne',
      notableAchievements: [
        'Chanteuse algérienne',
        'Grande figure de la chanson arabe'
      ]
    }
  ]);

  getPerson(id: number): Person | undefined {
    return this.items().find(person => person.id === id);
  }
}
