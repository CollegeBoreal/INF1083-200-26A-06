import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Islem Touadjni', nationality: 'Algérie', notableAchievements: ['Développeur informatique — Jijel'] },
    { id: 2, name: 'Amina Ben Salah', nationality: 'Algérie', notableAchievements: ['Médecin — Alger'] },
    { id: 3, name: 'Youssef El Mansouri', nationality: 'Maroc', notableAchievements: ['Architecte — Casablanca'] },
    { id: 4, name: 'Fatma Diop', nationality: 'Sénégal', notableAchievements: ['Enseignante — Dakar'] },
    { id: 5, name: 'Meriem Ben Amor', nationality: 'Tunisie', notableAchievements: ['Ingénieure — Tunis'] },
    { id: 6, name: 'Khaled Boualem', nationality: 'Algérie', notableAchievements: ['Électricien — Oran'] },
    { id: 7, name: 'Sara El Aloui', nationality: 'Maroc', notableAchievements: ['Pharmacienne — Rabat'] },
    { id: 8, name: 'Omar Traoré', nationality: 'Mali', notableAchievements: ['Agriculteur — Bamako'] },
    { id: 9, name: 'Leila Hassan', nationality: 'Égypte', notableAchievements: ['Journaliste — Le Caire'] },
    { id: 10, name: 'Mohamed Kamara', nationality: 'Guinée', notableAchievements: ['Informaticien — Conakry'] },
    { id: 11, name: 'Nadia Mourad', nationality: 'Algérie', notableAchievements: ['Comptable — Constantine'] },
    { id: 12, name: 'Ibrahim Fall', nationality: 'Sénégal', notableAchievements: ['Mécanicien — Saint-Louis'] },
    { id: 13, name: 'Zineb Othmane', nationality: 'Nigeria', notableAchievements: ['Infirmière — Lagos'] },
    { id: 14, name: 'Abdelrahman Saïd', nationality: 'Soudan', notableAchievements: ['Professeur — Khartoum'] },
    { id: 15, name: 'Nesrine Ben Youssef', nationality: 'Tunisie', notableAchievements: ['Avocate — Sfax'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
