import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Michael Jackson', nationality: 'American', notableAchievements: ['King of Pop', 'Best-selling album of all time (Thriller)', 'Invented the Moonwalk dance'] },
    { id: 2, name: 'Freddie Mercury', nationality: 'British', notableAchievements: ['Lead vocalist of Queen', 'Writer of Bohemian Rhapsody', 'Iconic Live Aid performance'] },
    { id: 3, name: 'Whitney Houston', nationality: 'American', notableAchievements: ['The Voice', 'Most awarded female artist of all time', 'Star of The Bodyguard soundtrack'] },
    { id: 4, name: 'Bob Marley', nationality: 'Jamaican', notableAchievements: ['Pioneer of reggae music', 'Global symbol of peace and Rastafari culture', 'Best-selling reggae album (Legend)'] },
    { id: 5, name: 'Madonna', nationality: 'American', notableAchievements: ['Queen of Pop', 'Best-selling female recording artist', 'Reinvented pop music visuals and live tours'] },
    { id: 6, name: 'Elvis Presley', nationality: 'American', notableAchievements: ['King of Rock and Roll', 'Cultural icon of the 20th century', 'Over 1 billion records sold worldwide'] },
    { id: 7, name: 'Céline Dion', nationality: 'Canadian', notableAchievements: ['Queen of Power Ballads', 'My Heart Will Go On (Titanic)', 'Las Vegas residency pioneer'] },
    { id: 8, name: 'Prince', nationality: 'American', notableAchievements: ['Multi-instrumentalist genius', 'Creator of Purple Rain', 'Pioneer of the Minneapolis sound'] },
    { id: 9, name: 'Aretha Franklin', nationality: 'American', notableAchievements: ['Queen of Soul', 'First woman inducted into the Rock and Roll Hall of Fame', '18 Grammy Awards'] },
    { id: 10, name: 'David Bowie', nationality: 'British', notableAchievements: ['Master of musical reinvention', 'Creator of Ziggy Stardust', 'Pioneer of glam rock'] },
    { id: 11, name: 'Stevie Wonder', nationality: 'American', notableAchievements: ['Child prodigy and Motown legend', '25 Grammy Awards', 'Pioneer of synthesizers in R&B and funk'] },
    { id: 12, name: 'Beyoncé', nationality: 'American', notableAchievements: ['Most Grammy wins in history', 'Cultural and visual album innovator', 'Lead singer of Destiny\'s Child'] },
    { id: 13, name: 'Tupac Shakur', nationality: 'American', notableAchievements: ['Most influential hip-hop artist of all time', 'Poet and social activist', 'First artist with a #1 album while incarcerated'] },
    { id: 14, name: 'Édith Piaf', nationality: 'French', notableAchievements: ['France\'s national chanteuse', 'La Vie en Rose', 'International symbol of French chanson'] },
    { id: 15, name: 'Elton John', nationality: 'British', notableAchievements: ['One of the best-selling solo artists', 'Composer of The Lion King soundtrack', 'Candle in the Wind'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}