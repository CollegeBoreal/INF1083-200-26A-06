import { Injectable, signal } from '@angular/core';

import { Person } from './person';

@Injectable({providedIn: 'root'})

export class PersonService {

  items = signal<Person[]>([

    { id: 1, name: 'Ousmane Sonko', nationality: 'Sénégalaise', notableAchievements: ['Homme politique sénégalais', 'Premier ministre du Sénégal'] },

    { id: 2, name: 'Léopold Sédar Senghor', nationality: 'Sénégalaise', notableAchievements: ['Premier président du Sénégal', 'Poète et écrivain'] },

    { id: 3, name: 'Cheikh Anta Diop', nationality: 'Sénégalaise', notableAchievements: ['Historien et anthropologue', 'Chercheur et intellectuel sénégalais'] },

    { id: 4, name: 'Mariama Bâ', nationality: 'Sénégalaise', notableAchievements: ['Écrivaine sénégalaise', 'Auteure de Une si longue lettre'] },

    { id: 5, name: 'Ousmane Sembène', nationality: 'Sénégalaise', notableAchievements: ['Écrivain et réalisateur', 'Pionnier du cinéma africain'] },

    { id: 6, name: 'Aminata Sow Fall', nationality: 'Sénégalaise', notableAchievements: ['Écrivaine sénégalaise', 'Auteure de La Grève des bàttu'] },

    { id: 7, name: 'Youssou N’Dour', nationality: 'Sénégalaise', notableAchievements: ['Chanteur et compositeur', 'Lauréat d’un Grammy Award'] },

    { id: 8, name: 'Sadio Mané', nationality: 'Sénégalaise', notableAchievements: ['Footballeur international sénégalais', 'Vainqueur de la Coupe d’Afrique des Nations 2021'] },

    { id: 9, name: 'El Hadji Diouf', nationality: 'Sénégalaise', notableAchievements: ['Ancien footballeur international', 'Double Ballon d’Or africain'] },

    { id: 10, name: 'Kalidou Koulibaly', nationality: 'Sénégalaise', notableAchievements: ['Footballeur international sénégalais', 'Capitaine de l’équipe nationale du Sénégal'] },

    { id: 11, name: 'Fatou Diome', nationality: 'Sénégalaise', notableAchievements: ['Écrivaine sénégalaise', 'Auteure de Le Ventre de l’Atlantique'] },

    { id: 12, name: 'Ismaïla Lô', nationality: 'Sénégalaise', notableAchievements: ['Chanteur et musicien', 'Auteur-compositeur sénégalais'] },

    { id: 13, name: 'Oumar Pène', nationality: 'Sénégalaise', notableAchievements: ['Chanteur et musicien', 'Membre fondateur du Super Diamono'] },

    { id: 14, name: 'Cheikh Ahmadou Bamba', nationality: 'Sénégalaise', notableAchievements: ['Fondateur du mouridisme', 'Fondateur de la ville de Touba'] },

    { id: 15, name: 'Awa Thiam', nationality: 'Sénégalaise', notableAchievements: ['Anthropologue et écrivaine', 'Chercheuse et intellectuelle sénégalaise'] },

  ]);

  getPerson(id: number): Person {

    return this.items().find((person) => person.id === id);

  }

}
