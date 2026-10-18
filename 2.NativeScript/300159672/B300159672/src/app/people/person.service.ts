import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: "Nelson Mandela", nationality: "Sud-africaine", notableAchievements: ["Leader de la lutte contre l'apartheid", "Premier président noir d'Afrique du Sud", "Prix Nobel de la paix en 1993"] },
    { id: 2, name: "Marie Curie", nationality: "Polonaise/Française", notableAchievements: ["Pionnière de la recherche sur la radioactivité", "Découverte du polonium et du radium", "Prix Nobel de physique et de chimie"] },
    { id: 3, name: "Albert Einstein", nationality: "Allemande/Américaine", notableAchievements: ["Théorie de la relativité", "Équation E=mc²", "Prix Nobel de physique en 1921"] },
    { id: 4, name: "Martin Luther King Jr.", nationality: "Américaine", notableAchievements: ["Figure du mouvement des droits civiques", "Discours I Have a Dream en 1963", "Prix Nobel de la paix en 1964"] },
    { id: 5, name: "Malala Yousafzai", nationality: "Pakistanaise", notableAchievements: ["Militante pour l'éducation des filles", "Plus jeune lauréate du prix Nobel de la paix en 2014"] },
    { id: 6, name: "Wangari Maathai", nationality: "Kényane", notableAchievements: ["Fondatrice du Green Belt Movement", "Première Africaine lauréate du prix Nobel de la paix en 2004"] },
    { id: 7, name: "Tim Berners-Lee", nationality: "Britannique", notableAchievements: ["Inventeur du World Wide Web"] },
    { id: 8, name: "Mahatma Gandhi", nationality: "Indienne", notableAchievements: ["Leader du mouvement d'indépendance de l'Inde", "Promoteur de la résistance non violente"] },
    { id: 9, name: "Rosa Parks", nationality: "Américaine", notableAchievements: ["Refus de céder son siège dans un autobus en 1955", "Symbole du mouvement des droits civiques"] },
    { id: 10, name: "Ada Lovelace", nationality: "Britannique", notableAchievements: ["Première programmeuse de l'histoire", "A travaillé sur la machine analytique"] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}