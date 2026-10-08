import { Injectable, signal } from '@angular/core';

import { Person } from './person';

@Injectable({ providedIn: 'root' })

export class PersonService {

  items = signal<Person[]>([
    { id: 1, name: 'Gianluigi Donnarumma', nationality: 'Italian', notableAchievements: ['Goalkeeper'] },

    { id: 2, name: 'Achraf Hakimi', nationality: 'Moroccan', notableAchievements: ['Right Back'] },

    { id: 3, name: 'Marquinhos', nationality: 'Brazilian', notableAchievements: ['Centre Back'] },

    { id: 4, name: 'Lucas Beraldo', nationality: 'Brazilian', notableAchievements: ['Centre Back'] },

    { id: 5, name: 'Nuno Mendes', nationality: 'Portuguese', notableAchievements: ['Left Back'] },

    { id: 6, name: 'Vitinha', nationality: 'Portuguese', notableAchievements: ['Midfielder'] },

    { id: 7, name: 'João Neves', nationality: 'Portuguese', notableAchievements: ['Midfielder'] },

    { id: 8, name: 'Warren Zaïre-Emery', nationality: 'French', notableAchievements: ['Midfielder'] },

    { id: 9, name: 'Fabián Ruiz', nationality: 'Spanish', notableAchievements: ['Midfielder'] },

    { id: 10, name: 'Ousmane Dembélé', nationality: 'French', notableAchievements: ['Right Winger'] },

    { id: 11, name: 'Bradley Barcola', nationality: 'French', notableAchievements: ['Left Winger'] },

    { id: 12, name: 'Gonçalo Ramos', nationality: 'Portuguese', notableAchievements: ['Striker'] },

    { id: 13, name: 'Désiré Doué', nationality: 'French', notableAchievements: ['Attacking Midfielder'] },

    { id: 14, name: 'Lucas Hernández', nationality: 'French', notableAchievements: ['Defender'] },

    { id: 15, name: 'Presnel Kimpembe', nationality: 'French', notableAchievements: ['Centre Back'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }

}