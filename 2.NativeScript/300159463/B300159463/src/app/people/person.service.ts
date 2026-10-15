import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
[
    { id: 1, name: 'Lionel Messi', nationality: 'Argentinian', notableAchievements: ['8 Ballon d\'Or awards', 'World Cup 2022 Champion', 'FC Barcelona legend'] },
    { id: 2, name: 'Cristiano Ronaldo', nationality: 'Portuguese', notableAchievements: ['5 Ballon d\'Or awards', 'All-time Champions League top scorer', 'Euro 2016 Champion'] },
    { id: 3, name: 'Kylian Mbappe', nationality: 'French', notableAchievements: ['World Cup 2018 Champion', 'World Cup Final Hat-trick', 'PSG all-time top scorer'] },
    { id: 4, name: 'Neymar Jr', nationality: 'Brazilian', notableAchievements: ['Champions League 2015 winner', 'Brazil all-time joint top scorer', 'Olympic Gold Medalist'] },
    { id: 5, name: 'Mohamed Salah', nationality: 'Egyptian', notableAchievements: ['Champions League & Premier League winner', 'Multiple Premier League Golden Boots', 'African Footballer of the Year'] },
    { id: 6, name: 'Erling Haaland', nationality: 'Norwegian', notableAchievements: ['Treble winner with Manchester City', 'Premier League single-season goal record', 'European Golden Shoe'] },
    { id: 7, name: 'Kevin De Bruyne', nationality: 'Belgian', notableAchievements: ['Multiple Premier League titles', 'PFA Players\' Player of the Year', 'Manchester City captain'] },
    { id: 8, name: 'Luka Modric', nationality: 'Croatian', notableAchievements: ['Ballon d\'Or 2018', 'World Cup 2018 finalist', '6-time Champions League winner'] },
    { id: 9, name: 'Karim Benzema', nationality: 'French', notableAchievements: ['Ballon d\'Or 2022', '5-time Champions League winner', 'Real Madrid 2nd all-time top scorer'] },
    { id: 10, name: 'Robert Lewandowski', nationality: 'Polish', notableAchievements: ['Best FIFA Men\'s Player 2020 & 2021', 'Bundesliga single-season goal record', 'European Golden Shoe'] },
  ]

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
