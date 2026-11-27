
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

export interface ChurchEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private storageKey = 'dailyfaith_events';
  private nextId = 4;

  events: ChurchEvent[] = [
    {
      id: 1,
      title: 'Culte du dimanche',
      date: 'Dimanche 29 novembre 2026',
      time: '10 h 00',
      location: 'Église principale',
      description: 'Un moment de louange, de prière et de partage.',
      registered: false
    },
    {
      id: 2,
      title: 'Réunion de prière',
      date: 'Mercredi 2 décembre 2026',
      time: '19 h 00',
      location: 'Église principale',
      description: 'Rejoignez-nous pour un moment de prière.',
      registered: false
    },
    {
      id: 3,
      title: 'Rencontre des jeunes',
      date: 'Samedi 5 décembre 2026',
      time: '16 h 00',
      location: 'Salle communautaire',
      description: 'Un moment de communion et de partage entre jeunes.',
      registered: false
    }
  ];

  constructor() {
    this.loadEvents();
  }

  // Charger les événements sauvegardés
  private loadEvents() {

    const savedEvents = ApplicationSettings.getString(
      this.storageKey,
      ''
    );

    if (savedEvents) {
      try {

        const data = JSON.parse(savedEvents);

        this.events = data.events;
        this.nextId = data.nextId;

      } catch (error) {
        console.error(
          'Erreur de chargement des événements',
          error
        );
      }
    }
  }

  // Sauvegarder les événements
  saveEvents() {

    const data = {
      events: this.events,
      nextId: this.nextId
    };

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify(data)
    );
  }

  getEvents(): ChurchEvent[] {
    return this.events;
  }

  // Créer un événement
  addEvent(
    title: string,
    date: string,
    time: string,
    location: string,
    description: string
  ) {

    this.events.unshift({
      id: this.nextId++,
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      description: description.trim(),
      registered: false
    });

    this.saveEvents();
  }

  // Modifier un événement
  updateEvent(
    id: number,
    title: string,
    date: string,
    time: string,
    location: string,
    description: string
  ) {

    const event = this.events.find(e => e.id === id);

    if (event) {

      event.title = title.trim();
      event.date = date.trim();
      event.time = time.trim();
      event.location = location.trim();
      event.description = description.trim();

      this.saveEvents();
    }
  }

  // Supprimer un événement
  deleteEvent(id: number) {

    const index = this.events.findIndex(e => e.id === id);

    if (index !== -1) {

      this.events.splice(index, 1);

      this.saveEvents();
    }
  }

  // Enregistrer ou annuler une participation
  toggleParticipation(event: ChurchEvent) {

    event.registered = !event.registered;

    this.saveEvents();
  }

  // Compter les événements
  getTotalEvents(): number {
    return this.events.length;
  }
}
