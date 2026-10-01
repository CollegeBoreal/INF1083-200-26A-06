import { Injectable } from '@angular/core';
import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private items = new Array<Person>(
    { id: 1, name: 'Lionel Messi', role: 'Attaquant', nationality: 'Argentine', notableAchievements: '8 Ballons d\'Or, Coupe du Monde 2022' },
    { id: 2, name: 'Pelé', role: 'Attaquant', nationality: 'Brésil', notableAchievements: '3 Coupes du Monde (1958, 1962, 1970)' },
    { id: 3, name: 'Diego Maradona', role: 'Milieu offensif', nationality: 'Argentine', notableAchievements: 'Coupe du Monde 1986' },
    { id: 4, name: 'Cristiano Ronaldo', role: 'Attaquant', nationality: 'Portugal', notableAchievements: '5 Ballons d\'Or, 5 Ligue des Champions' },
    { id: 5, name: 'Zinedine Zidane', role: 'Milieu offensif', nationality: 'France', notableAchievements: 'Coupe du Monde 1998, Ballon d\'Or 1998' },
    { id: 6, name: 'Johan Cruyff', role: 'Attaquant', nationality: 'Pays-Bas', notableAchievements: '3 Ballons d\'Or, Créateur du Football Total' },
    { id: 7, name: 'Ronaldo Nazário', role: 'Attaquant', nationality: 'Brésil', notableAchievements: '2 Coupes du Monde, 2 Ballons d\'Or' },
    { id: 8, name: 'Ronaldinho', role: 'Milieu offensif', nationality: 'Brésil', notableAchievements: 'Coupe du Monde 2002, Ballon d\'Or 2005' },
    { id: 9, name: 'Franz Beckenbauer', role: 'Défenseur', nationality: 'Allemagne', notableAchievements: 'Coupe du Monde comme joueur et entraîneur' },
    { id: 10, name: 'Michel Platini', role: 'Milieu offensif', nationality: 'France', notableAchievements: '3 Ballons d\'Or consécutifs' }
  );

  getItems(): Array<Person> {
    return this.items;
  }

  getItem(id: number): Person {
    return this.items.find((item) => item.id === id);
  }

  getPerson(id: number): Person {
    return this.getItem(id);
  }
}