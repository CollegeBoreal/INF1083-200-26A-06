import {
  Component,
  NO_ERRORS_SCHEMA
} from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { NavigationComponent } from '../navigation/navigation.component';

import {
  ChurchEvent,
  EventService
} from '../services/event.service';

import { AuthService } from '../services/auth.service';
import { ChurchService } from '../services/church.service';
import { ChurchImageService } from '../services/church-image.service';

@Component({
  selector: 'ns-events',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent {

  activeFilter: 'all' | 'registered' = 'all';

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private churchService: ChurchService,
    private imageService: ChurchImageService,
    private router: RouterExtensions
  ) {}

  // Événements des églises suivies

  get allEvents(): ChurchEvent[] {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return [];
    }

    return this.eventService
      .getFollowedChurchEvents(user.id)
      .sort((a, b) => b.id - a.id);

  }

  // Filtrer les événements

  get events(): ChurchEvent[] {

    if (this.activeFilter === 'registered') {

      return this.allEvents.filter(
        event => this.isRegistered(event)
      );

    }

    return this.allEvents;

  }

  // Statistiques

  get totalEvents(): number {

    return this.allEvents.length;

  }

  get totalRegistered(): number {

    return this.allEvents.filter(
      event => this.isRegistered(event)
    ).length;

  }

  // Sélectionner un filtre

  selectFilter(filter: 'all' | 'registered') {

    this.activeFilter = filter;

  }

  // Nom de l'église

  getChurchName(event: ChurchEvent): string {

    if (event.churchId === undefined) {
      return 'Église inconnue';
    }

    return this.churchService
      .getChurchById(event.churchId)?.name
      || 'Église inconnue';

  }

  // Logo de l'église

  getChurchLogo(event: ChurchEvent): string {

    if (event.churchId === undefined) {
      return '';
    }

    const church = this.churchService.getChurchById(
      event.churchId
    );

    return church?.logo
      ? this.imageService.getImagePath(church.logo)
      : '';

  }

  // Consulter le profil de l'église

  viewChurch(event: ChurchEvent) {

    if (event.churchId === undefined) {
      return;
    }

    this.router.navigate([
      '/church-profile',
      event.churchId
    ]);

  }

  // Vérifier la participation

  isRegistered(event: ChurchEvent): boolean {

    return this.eventService.isRegistered(event);

  }

  // Participer ou annuler

  participate(event: ChurchEvent) {

    this.eventService.toggleParticipation(event);

  }

  // Nombre de participants

  getParticipantsCount(event: ChurchEvent): number {

    return this.eventService.getParticipantsCount(event);

  }

  // Découvrir des églises

  discoverChurches() {

    this.router.navigate(['/search'], {
      clearHistory: true
    });

  }

}