
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { NavigationComponent } from '../navigation/navigation.component';
import { Message, MessageService } from '../services/message.service';
import { ChurchEvent, EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ns-home',
  standalone: true,
  imports: [NativeScriptCommonModule, NavigationComponent],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  // Récupérer le nom du membre connecté
  get memberName(): string {
    return this.authService.getCurrentUser()?.name || 'Membre';
  }

  // Récupérer le dernier message biblique
  get latestMessage(): Message | undefined {
    return this.messageService.getMessages()[0];
  }

  // Récupérer les événements
  get upcomingEvents(): ChurchEvent[] {
    return this.eventService.getEvents().slice(0, 3);
  }

  // Aimer et sauvegarder le message
  toggleLike() {

    const message = this.latestMessage;

    if (message) {
      this.messageService.toggleLike(message);
    }
  }

  goToMessages() {
    this.router.navigate(['/messages'], {
      clearHistory: true
    });
  }

  goToEvents() {
    this.router.navigate(['/events'], {
      clearHistory: true
    });
  }

  // Fermer la session du membre
  logout() {

    this.authService.logout();

    this.router.navigate(['/login'], {
      clearHistory: true
    });
  }
}
