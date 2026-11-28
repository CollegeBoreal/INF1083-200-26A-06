
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { MessageService } from '../services/message.service';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { ChurchService } from '../services/church.service';

@Component({
  selector: 'ns-admin',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService,
    private eventService: EventService,
    private authService: AuthService,
    private churchService: ChurchService
  ) {}

  get pastorName(): string {
    return this.authService.getCurrentUser()?.name || 'Pasteur';
  }

  get totalMessages(): number {
    return this.messageService.getTotalMessages();
  }

  get totalEvents(): number {
    return this.eventService.getTotalEvents();
  }

  get totalChurches(): number {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return 0;
    }

    return this.churchService
      .getPastorChurches(user.id).length;
  }

  createChurch() {
    this.router.navigate(['/create-church']);
  }

  // Gérer les pages du pasteur
  manageChurches() {
    this.router.navigate(['/manage-churches']);
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

    async logout() {

    try {

      await this.authService.logout();

      await this.router.navigate(['/login'], {
        clearHistory: true
      });

    } catch (error) {

      console.error(
        'Erreur de déconnexion Firebase',
        error
      );
    }
  }
}