
import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Margaret Hamilton', nationality: 'American', notableAchievements: ['Led Apollo flight software development', 'Pioneer of software engineering'] },
    { id: 2, name: 'Katherine Johnson', nationality: 'American', notableAchievements: ['NASA mathematician', 'Calculated trajectories for space missions'] },
    { id: 3, name: 'Claude Shannon', nationality: 'American', notableAchievements: ['Father of information theory', 'Contributed to digital circuit design'] },
    { id: 4, name: 'Hedy Lamarr', nationality: 'Austrian-American', notableAchievements: ['Co-invented frequency-hopping technology', 'Contributed to wireless communication'] },
    { id: 5, name: 'Guido van Rossum', nationality: 'Dutch', notableAchievements: ['Creator of Python programming language', 'Promoted readable programming'] },
    { id: 6, name: 'James Gosling', nationality: 'Canadian', notableAchievements: ['Creator of Java programming language', 'Worked on the Java platform'] },
    { id: 7, name: 'Brendan Eich', nationality: 'American', notableAchievements: ['Creator of JavaScript', 'Co-founded Mozilla'] },
    { id: 8, name: 'Radia Perlman', nationality: 'American', notableAchievements: ['Invented the Spanning Tree Protocol', 'Pioneer in network engineering'] },
    { id: 9, name: 'Barbara Liskov', nationality: 'American', notableAchievements: ['Developed the Liskov substitution principle', 'Pioneer in programming languages'] },
    { id: 10, name: 'Ken Thompson', nationality: 'American', notableAchievements: ['Co-created Unix', 'Co-developed the Go programming language'] },
    { id: 11, name: 'Brian Kernighan', nationality: 'Canadian', notableAchievements: ['Co-authored The C Programming Language', 'Contributed to Unix development'] },
    { id: 12, name: 'Sophie Wilson', nationality: 'British', notableAchievements: ['Co-designed the ARM processor architecture', 'Designed the BBC Micro'] },
    { id: 13, name: 'Donald Knuth', nationality: 'American', notableAchievements: ['Author of The Art of Computer Programming', 'Created TeX'] },
    { id: 14, name: 'Anita Borg', nationality: 'American', notableAchievements: ['Founded the Institute for Women and Technology', 'Promoted women in computing'] },
    { id: 15, name: 'Frances Allen', nationality: 'American', notableAchievements: ['Pioneer in compiler optimization', 'First woman to receive the Turing Award'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
