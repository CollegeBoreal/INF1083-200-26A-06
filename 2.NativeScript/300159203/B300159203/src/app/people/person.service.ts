import { Injectable } from '@angular/core';
import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private persons = new Array<Person>(
    {
      id: 1,
      name: 'Lionel Messi',
      role: 'Attaquant / Menez de jeu',
      goals: 838,
      achievements: ['8x Ballon d\'Or', '1x Coupe du Monde (2022)', '4x Ligue des Champions', '10x La Liga'],
      description: 'Considéré comme l\'un des plus grands joueurs de tous les temps, il a marqué l\'histoire du FC Barcelone et de l\'Argentine.'
    },
    {
      id: 2,
      name: 'Pelé',
      role: 'Attaquant',
      goals: 1281,
      achievements: ['3x Coupe du Monde (1958, 1962, 1970)', 'Athlète du siècle'],
      description: 'Légende brésilienne du football mondial, seul joueur à avoir remporté trois Coupes du Monde.'
    },
    {
      id: 3,
      name: 'Diego Maradona',
      role: 'Milieu offensif',
      goals: 345,
      achievements: ['1x Coupe du Monde (1986)', '2x Serie A (Naples)'],
      description: 'Célèbre pour son génie sur le terrain, sa conduite de balle et la légendaire Coupe du Monde 1986.'
    },
    {
      id: 4,
      name: 'Cristiano Ronaldo',
      role: 'Attaquant',
      goals: 895,
      achievements: ['5x Ballon d\'Or', '5x Ligue des Champions', '1x Euro (2016)'],
      description: 'Meilleur buteur de l\'histoire du football professionnel, réputé pour sa longévité et son athlétisme exceptionnel.'
    },
    {
      id: 5,
      name: 'Zinedine Zidane',
      role: 'Milieu offensif',
      goals: 125,
      achievements: ['1x Ballon d\'Or (1998)', '1x Coupe du Monde (1998)', '1x Euro (2000)', '1x Ligue des Champions'],
      description: 'Maître à jouer de l\'équipe de France et du Real Madrid, célèbre pour son élégance sur le terrain.'
    }
  );

  getItems(): Array<Person> {
    return this.persons;
  }

  getItem(id: number): Person {
    return this.persons.filter((person) => person.id === id)[0];
  }
}