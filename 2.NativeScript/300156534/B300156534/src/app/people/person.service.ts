import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
  {
    id: 1,
    name: 'Marie Curie',
    nationality: 'Polish-French',
    notableAchievements: ['Research on radioactivity', 'Two Nobel Prizes']
  },
  {
    id: 2,
    name: 'Albert Einstein',
    nationality: 'German-American',
    notableAchievements: ['Theory of relativity', 'Nobel Prize in Physics']
  },
  {
    id: 3,
    name: 'Isaac Newton',
    nationality: 'English',
    notableAchievements: ['Laws of motion', 'Law of universal gravitation']
  },
  {
    id: 4,
    name: 'Charles Darwin',
    nationality: 'British',
    notableAchievements: ['Theory of evolution', 'Natural selection']
  },
  {
    id: 5,
    name: 'Louis Pasteur',
    nationality: 'French',
    notableAchievements: ['Germ theory', 'Pasteurization']
  },
  {
    id: 6,
    name: 'Galileo Galilei',
    nationality: 'Italian',
    notableAchievements: ['Astronomical observations', 'Support for heliocentrism']
  },
  {
    id: 7,
    name: 'Michael Faraday',
    nationality: 'British',
    notableAchievements: ['Electromagnetic induction', 'Faraday effect']
  },
  {
    id: 8,
    name: 'Nikola Tesla',
    nationality: 'Serbian-American',
    notableAchievements: ['Alternating current system', 'Induction motor']
  },
  {
    id: 9,
    name: 'Rosalind Franklin',
    nationality: 'British',
    notableAchievements: ['X-ray crystallography', 'DNA research']
  },
  {
    id: 10,
    name: 'Katherine Johnson',
    nationality: 'American',
    notableAchievements: ['Orbital calculations', 'NASA space missions']
  },
  {
    id: 11,
    name: 'Stephen Hawking',
    nationality: 'British',
    notableAchievements: ['Black hole research', 'Theoretical cosmology']
  },
  {
    id: 12,
    name: 'Gregor Mendel',
    nationality: 'Austrian',
    notableAchievements: ['Laws of inheritance', 'Foundation of genetics']
  },
  {
    id: 13,
    name: 'Dmitri Mendeleev',
    nationality: 'Russian',
    notableAchievements: ['Periodic table', 'Prediction of new elements']
  },
  {
    id: 14,
    name: 'Ibn al-Haytham',
    nationality: 'Arab',
    notableAchievements: ['Optics research', 'Scientific method']
  },
  {
    id: 15,
    name: 'Chien-Shiung Wu',
    nationality: 'Chinese-American',
    notableAchievements: ['Experimental physics', 'Wu experiment']
  }
]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
