import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  items = signal<Person[]>([
    {
      id: 1,
      name: 'Michael Jackson',
      nationality: 'American',
      notableAchievements: [
        'Best-selling album of all time with Thriller',
        '13 Grammy Awards and 26 American Music Awards',
        'Inducted twice into the Rock and Roll Hall of Fame',
      ],
    },
    {
      id: 2,
      name: 'Freddie Mercury',
      nationality: 'British',
      notableAchievements: [
        'Lead vocalist of the rock band Queen',
        'Co-wrote global anthems such as Bohemian Rhapsody and We Are the Champions',
        'Renowned for wide vocal range and dynamic live stage performances',
      ],
    },
    {
      id: 3,
      name: 'Whitney Houston',
      nationality: 'American',
      notableAchievements: [
        'One of the best-selling music artists of all time',
        'Won six Grammy Awards including Album of the Year',
        'Performed the chart-topping single I Will Always Love You',
      ],
    },
    {
      id: 4,
      name: 'Bob Marley',
      nationality: 'Jamaican',
      notableAchievements: [
        'Pioneered reggae music on a global scale',
        'Released landmark albums including Exodus and Legend',
        'Received the Grammy Lifetime Achievement Award',
      ],
    },
  ]);

  getPerson(id: number): Person | undefined {
    return this.items().find((person) => person.id === id);
  }
}
