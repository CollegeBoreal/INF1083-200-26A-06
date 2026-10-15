import { Injectable } from '@angular/core';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private people: Person[] = [
    {
      id: 1,
      name: 'Lionel Messi',
      role: 'Attaquant / Menez de jeu',
      goals: 838,
      notableAchievements: "8x Ballon d'Or, 1x Coupe du Monde (2022), 4x Ligue des Champions, 10x La Liga",
      bio: "Considéré comme l'un des plus grands joueurs de tous les temps, il a marqué l'histoire du FC Barcelone et de l'Argentine."
    },
    {
      id: 2,
      name: 'Pelé',
      role: 'Attaquant',
      goals: 767,
      notableAchievements: '3x Coupe du Monde, Championnats nationaux',
      bio: 'Légende brésilienne et unique joueur à avoir remporté trois Coupes du Monde.'
    },
    {
      id: 3,
      name: 'Diego Maradona',
      role: 'Milieu offensif',
      goals: 345,
      notableAchievements: "1x Coupe du Monde (1986), Champion d'Italie (Napoli)",
      bio: "Génie du football argentin, célèbre pour sa vision de jeu et ses dribbles hors du commun."
    },
    {
      id: 4,
      name: 'Cristiano Ronaldo',
      role: 'Attaquant',
      goals: 890,
      notableAchievements: "5x Ballon d'Or, 5x Ligue des Champions, Champion d'Europe (2016)",
      bio: 'Machine à buts redoutable, connu pour son athlétisme et ses records en Ligue des Champions.'
    },
    {
      id: 5,
      name: 'Zinedine Zidane',
      role: 'Milieu offensif',
      goals: 125,
      notableAchievements: "1x Coupe du Monde (1998), 1x Euro, 1x Ligue des Champions",
      bio: "Maestro français doté d'une élégance technique légendaire sur le terrain."
    }
  ];

  getPeople(): Person[] {
    return this.people;
  }

  getPerson(id: number): Person | undefined {
    return this.people.find((person) => person.id === id);
  }
}