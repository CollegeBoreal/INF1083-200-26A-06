import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

import { ChurchService } from './church.service';
import { AuthService } from './auth.service';

export interface ChurchEvent {

  id: number;

  churchId?: number;
  authorId?: number;

  title: string;
  date: string;
  time: string;
  location: string;
  description: string;

  registered: boolean;
  participants?: number[];

}

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private storageKey = 'dailyfaith_events';

  private nextId = 1;

  events: ChurchEvent[] = [];

  constructor(
    private churchService: ChurchService,
    private authService: AuthService
  ) {

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

        this.events = data.events || [];

        this.nextId = Math.max(
          data.nextId || 1,
          ...this.events.map(event => event.id + 1)
        );

      } catch (error) {

        console.error(
          'Erreur de chargement des événements',
          error
        );

      }

    }

    this.events.forEach(event => {

      event.participants = Array.isArray(event.participants)
        ? [...new Set(event.participants)]
        : [];

      event.registered = false;

    });

  }

  // Sauvegarder les événements

  saveEvents() {

    const data = {

      events: this.events.map(event => ({

        ...event,

        registered: false

      })),

      nextId: this.nextId

    };

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify(data)
    );

  }

  // Actualiser les participations

  private refreshParticipation() {

    const user = this.authService.getCurrentUser();

    this.events.forEach(event => {

      event.registered = !!user &&
        (event.participants?.includes(user.id) ?? false);

    });

  }

  // Tous les événements

  getEvents(): ChurchEvent[] {

    this.refreshParticipation();

    return this.events;

  }

  // Événements d'une église

  getChurchEvents(churchId: number): ChurchEvent[] {

    return this.getEvents().filter(
      event => event.churchId === churchId
    );

  }

  // Événements d'un pasteur

  getPastorEvents(pastorId: number): ChurchEvent[] {

    return this.getEvents().filter(
      event => event.authorId === pastorId
    );

  }

  // Événements des églises suivies

  getFollowedChurchEvents(userId: number): ChurchEvent[] {

    const churchIds = this.churchService
      .getFollowedChurches(userId)
      .map(church => church.id);

    return this.getEvents().filter(
      event =>
        event.churchId !== undefined &&
        churchIds.includes(event.churchId)
    );

  }

  // Vérifier le propriétaire d'un événement

  private canManageEvent(event: ChurchEvent): boolean {

    const user = this.authService.getCurrentUser();

    if (
      !user ||
      !this.authService.isAdmin() ||
      event.authorId !== user.id ||
      event.churchId === undefined
    ) {

      return false;

    }

    const church = this.churchService.getChurchById(
      event.churchId
    );

    return church?.ownerId === user.id;

  }

  // Créer un événement

  addEvent(
    title: string,
    date: string,
    time: string,
    location: string,
    description: string,
    churchId?: number
  ): boolean {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {

      return false;

    }

    if (
      !title.trim() ||
      !date.trim() ||
      !time.trim() ||
      !location.trim() ||
      !description.trim()
    ) {

      return false;

    }

    const church = churchId !== undefined
      ? this.churchService.getChurchById(churchId)
      : undefined;

    if (!church || church.ownerId !== user.id) {

      return false;

    }

    this.events.unshift({

      id: this.nextId++,

      churchId: church.id,
      authorId: user.id,

      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      description: description.trim(),

      registered: false,
      participants: []

    });

    this.saveEvents();

    return true;

  }

  // Modifier un événement

  updateEvent(
    id: number,
    title: string,
    date: string,
    time: string,
    location: string,
    description: string
  ): boolean {

    const event = this.events.find(
      item => item.id === id
    );

    if (!event || !this.canManageEvent(event)) {

      return false;

    }

    if (
      !title.trim() ||
      !date.trim() ||
      !time.trim() ||
      !location.trim() ||
      !description.trim()
    ) {

      return false;

    }

    event.title = title.trim();
    event.date = date.trim();
    event.time = time.trim();
    event.location = location.trim();
    event.description = description.trim();

    this.saveEvents();

    return true;

  }

  // Supprimer un événement

  deleteEvent(id: number): boolean {

    const index = this.events.findIndex(
      event => event.id === id
    );

    if (
      index === -1 ||
      !this.canManageEvent(this.events[index])
    ) {

      return false;

    }

    this.events.splice(index, 1);

    this.saveEvents();

    return true;

  }

  // Vérifier la participation du membre

  isRegistered(event: ChurchEvent): boolean {

    const user = this.authService.getCurrentUser();

    if (!user) {

      return false;

    }

    return event.participants?.includes(user.id) ?? false;

  }

  // Confirmer ou annuler une participation

  toggleParticipation(event: ChurchEvent) {

    const user = this.authService.getCurrentUser();

    if (!user || this.authService.isAdmin()) {

      return;

    }

    const currentEvent = this.events.find(
      item => item.id === event.id
    );

    if (
      !currentEvent ||
      currentEvent.churchId === undefined
    ) {

      return;

    }

    currentEvent.participants =
      currentEvent.participants || [];

    if (currentEvent.participants.includes(user.id)) {

      currentEvent.participants =
        currentEvent.participants.filter(
          id => id !== user.id
        );

    } else {

      currentEvent.participants.push(user.id);

    }

    currentEvent.registered =
      currentEvent.participants.includes(user.id);

    this.saveEvents();

  }

  // Nombre de participants

  getParticipantsCount(event: ChurchEvent): number {

    return event.participants?.length ?? 0;

  }

  // Nombre total d'événements

  getTotalEvents(): number {

    return this.events.length;

  }

  // Nombre d'événements d'une église

  getChurchEventsCount(churchId: number): number {

    return this.getChurchEvents(churchId).length;

  }

}