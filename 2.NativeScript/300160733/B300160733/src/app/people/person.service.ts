import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Yanis Belhadi', nationality: 'Algérienne', work: 'Technicien informatique', city: 'Toronto' },
    { id: 2, name: 'Amine Benali', nationality: 'Algérienne', work: 'Développeur web', city: 'Montréal' },
    { id: 3, name: 'Sarah Martin', nationality: 'Canadienne', work: 'Designer graphique', city: 'Toronto' },
    { id: 4, name: 'Adam Wilson', nationality: 'Canadienne', work: 'Ingénieur réseau', city: 'Ottawa' },
    { id: 5, name: 'Lina Haddad', nationality: 'Libanaise', work: 'Comptable', city: 'Montréal' },
    { id: 6, name: 'Karim Bensalem', nationality: 'Algérienne', work: 'Mécanicien automobile', city: 'Laval' },
    { id: 7, name: 'Emma Johnson', nationality: 'Américaine', work: 'Développeuse mobile', city: 'New York' },
    { id: 8, name: 'Mohamed Amari', nationality: 'Algérienne', work: 'Électricien', city: 'Toronto' },
    { id: 9, name: 'Sofia Rossi', nationality: 'Italienne', work: 'Architecte', city: 'Montréal' },
    { id: 10, name: 'Lucas Tremblay', nationality: 'Canadienne', work: 'Technicien réseau', city: 'Québec' },
    { id: 11, name: 'Nadia Rahmani', nationality: 'Algérienne', work: 'Enseignante', city: 'Ottawa' },
    { id: 12, name: 'David Smith', nationality: 'Britannique', work: 'Programmeur', city: 'Toronto' },
    { id: 13, name: 'Aya Mansouri', nationality: 'Marocaine', work: 'Infirmière', city: 'Montréal' },
    { id: 14, name: 'Samir Kaci', nationality: 'Algérienne', work: 'Administrateur système', city: 'Toronto' },
    { id: 15, name: 'Julie Bernard', nationality: 'Française', work: 'Analyste informatique', city: 'Québec' }
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
