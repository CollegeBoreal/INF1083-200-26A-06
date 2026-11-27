
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';
import { MessageService } from '../services/message.service';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ns-admin',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  // Récupérer le nom du pasteur connecté
  get pastorName(): string {
    return this.authService.getCurrentUser()?.name || 'Pasteur';
  }

  // Nombre de messages publiés
  get totalMessages(): number {
    return this.messageService.getTotalMessages();
  }

  // Nombre d'événements publiés
  get totalEvents(): number {
    return this.eventService.getTotalEvents();
  }

  publishMessage() {
    this.router.navigate(['/publish-message']);
  }

  manageMessages() {
    this.router.navigate(['/manage-messages']);
  }

  createEvent() {
    this.router.navigate(['/create-event']);
  }

  manageEvents() {
    this.router.navigate(['/manage-events']);
  }

  sendNotification() {
    this.router.navigate(['/send-notification']);
  }

  // Fermer la session du pasteur
  logout() {

    this.authService.logout();

    this.router.navigate(['/login'], {
      clearHistory: true
    });
  }
}
