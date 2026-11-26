
import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  items = signal<Person[]>([
    {
      id: 1,
      name: 'Jean-Jacques Muyembe',
      nationality: 'Congolais (RDC)',
      notableAchievements: [
        'Médecin et chercheur spécialisé dans le virus Ebola',
        'Travaux sur le diagnostic et la lutte contre Ebola'
      ]
    },
    {
      id: 2,
      name: 'Denis Mukwege',
      nationality: 'Congolais (RDC)',
      notableAchievements: [
        'Prix Nobel de la paix en 2018',
        'Médecin spécialisé dans la prise en charge des victimes de violences sexuelles'
      ]
    },
    {
      id: 3,
      name: 'Cheikh Anta Diop',
      nationality: 'Sénégalais',
      notableAchievements: [
        'Chercheur en histoire et en sciences',
        'Travaux sur les civilisations africaines'
      ]
    },
    {
      id: 4,
      name: 'Francis Allotey',
      nationality: 'Ghanéen',
      notableAchievements: [
        'Physicien mathématicien',
        'Contributions à la physique théorique'
      ]
    },
    {
      id: 5,
      name: 'Segenet Kelemu',
      nationality: 'Éthiopienne',
      notableAchievements: [
        'Chercheuse en biologie végétale',
        'Travaux sur la santé des plantes et l’agriculture'
      ]
    },
    {
      id: 6,
      name: 'Tebello Nyokong',
      nationality: 'Sud-Africaine',
      notableAchievements: [
        'Chercheuse en chimie',
        'Travaux sur la thérapie photodynamique'
      ]
    },
    {
      id: 7,
      name: 'Philip Emeagwali',
      nationality: 'Nigérian',
      notableAchievements: [
        'Informaticien spécialisé en calcul parallèle',
        'Lauréat du prix Gordon Bell en 1989'
      ]
    },
    {
      id: 8,
      name: 'Quarraisha Abdool Karim',
      nationality: 'Sud-Africaine',
      notableAchievements: [
        'Épidémiologiste',
        'Recherches sur la prévention du VIH'
      ]
    },
    {
      id: 9,
      name: 'Salim Abdool Karim',
      nationality: 'Sud-Africain',
      notableAchievements: [
        'Chercheur en maladies infectieuses',
        'Travaux sur le VIH et la tuberculose'
      ]
    },
    {
      id: 10,
      name: 'Christian Happi',
      nationality: 'Nigérian',
      notableAchievements: [
        'Chercheur en génomique',
        'Travaux sur les maladies infectieuses'
      ]
    },
    {
      id: 11,
      name: 'Kelly Chibale',
      nationality: 'Zambien',
      notableAchievements: [
        'Chercheur en chimie médicinale',
        'Recherche de traitements contre le paludisme'
      ]
    },
    {
      id: 12,
      name: 'Ameenah Gurib-Fakim',
      nationality: 'Mauricienne',
      notableAchievements: [
        'Scientifique spécialisée en biodiversité',
        'Recherches sur les plantes médicinales'
      ]
    },
    {
      id: 13,
      name: 'Mohamed Hassan',
      nationality: 'Soudanais',
      notableAchievements: [
        'Mathématicien et physicien',
        'Promotion de la recherche scientifique en Afrique'
      ]
    },
    {
      id: 14,
      name: 'Neil Turok',
      nationality: 'Sud-Africain',
      notableAchievements: [
        'Physicien théoricien',
        'Recherches en cosmologie'
      ]
    },
    {
      id: 15,
      name: 'Moustapha Cissé',
      nationality: 'Sénégalais',
      notableAchievements: [
        'Chercheur en intelligence artificielle',
        'Promotion de la recherche en IA en Afrique'
      ]
    }
  ]);

  getPerson(id: number): Person | undefined {
    return this.items().find((person) => person.id === id);
  }
}
