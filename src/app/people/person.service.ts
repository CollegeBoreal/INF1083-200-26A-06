import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
     { id: 1, name: 'Lionel Messi', nationality: 'Argentine', notableAchievements: ['World Cup winner'] },
      { id: 2, name: 'Cristiano Ronaldo', nationality: 'Portugal', notableAchievements: ['Five Ballon dOr awards'] },
      { id: 3, name: 'Kylian Mbappe', nationality: 'France', notableAchievements: ['World Cup winner'] },
      { id: 4, name: 'Neymar Jr', nationality: 'Brazil', notableAchievements: ['Champions League winner'] },
      { id: 5, name: 'Mohamed Salah', nationality: 'Egypt', notableAchievements: ['Champions League winner'] },
      { id: 6, name: 'Erling Haaland', nationality: 'Norway', notableAchievements: ['Champions League winner'] },
      { id: 7, name: 'Kevin De Bruyne', nationality: 'Belgium', notableAchievements: ['Champions League winner'] },
      { id: 8, name: 'Luka Modric', nationality: 'Croatia', notableAchievements: ['Ballon dOr winner'] },
      { id: 9, name: 'Karim Benzema', nationality: 'France', notableAchievements: ['Ballon dOr winner'] },
      { id: 10, name: 'Robert Lewandowski', nationality: 'Poland', notableAchievements: ['Champions League winner'] }

  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}

