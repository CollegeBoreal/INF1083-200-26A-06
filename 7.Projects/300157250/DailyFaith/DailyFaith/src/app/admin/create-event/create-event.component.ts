import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert } from '@nativescript/core';

import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';

import {
  Church,
  ChurchService
} from '../../services/church.service';

import { AuthService } from '../../services/auth.service';
import { ChurchImageService } from '../../services/church-image.service';

@Component({

  selector: 'ns-create-event',

  standalone: true,

  imports: [NativeScriptCommonModule],

  schemas: [NO_ERRORS_SCHEMA],

  templateUrl: './create-event.component.html',

  styleUrls: ['./create-event.component.css']

})

export class CreateEventComponent {

  selectedChurchId: number | null = null;

  title = '';
  date = '';
  time = '';
  location = '';
  description = '';

  constructor(
    private router: RouterExtensions,
    private eventService: EventService,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private notificationService: NotificationService
  ) {

    if (this.churches.length === 1) {

      this.selectedChurchId = this.churches[0].id;

    }

  }

  get churches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return [];
    }

    return this.churchService.getPastorChurches(user.id);

  }

  selectChurch(church: Church) {

    this.selectedChurchId = church.id;

  }

  getLogoPath(church: Church): string {

    return this.imageService.getImagePath(
      church.logo || ''
    );

  }

  onTitleChange(args: any) {

    this.title = args.object.text || '';

  }

  onDateChange(args: any) {

    this.date = args.object.text || '';

  }

  onTimeChange(args: any) {

    this.time = args.object.text || '';

  }

  onLocationChange(args: any) {

    this.location = args.object.text || '';

  }

  onDescriptionChange(args: any) {

    this.description = args.object.text || '';

  }

  async publishEvent() {

    if (this.selectedChurchId === null) {

      await alert('Veuillez sélectionner une église.');

      return;

    }

    if (
      !this.title.trim() ||
      !this.date.trim() ||
      !this.time.trim() ||
      !this.location.trim() ||
      !this.description.trim()
    ) {

      await alert('Veuillez remplir tous les champs.');

      return;

    }

    const success = this.eventService.addEvent(
      this.title,
      this.date,
      this.time,
      this.location,
      this.description,
      this.selectedChurchId
    );

    if (!success) {

      await alert({

        title: 'Publication impossible',

        message: 'Vérifiez les informations et les droits de votre église.',

        okButtonText: 'OK'

      });

      return;

    }

    const church = this.churchService.getChurchById(
      this.selectedChurchId
    );

    // Notification automatique

    const notified = this.notificationService.addNotification(

      'Nouvel événement',

      `${this.title}\n${this.date} à ${this.time}\n${this.location}`,

      this.selectedChurchId,

      'event'

    );

    await alert({

      title: 'Événement publié',

      message: notified
        ? `Votre événement a été publié pour ${church?.name || 'votre église'}. Une notification interne a été créée pour les abonnés concernés.`
        : `Votre événement a été publié, mais la notification n'a pas pu être créée.`,

      okButtonText: 'OK'

    });

    this.router.navigate(['/admin'], {
      clearHistory: true
    });

  }

  createChurch() {

    this.router.navigate(['/create-church']);

  }

  cancel() {

    this.router.navigate(['/admin'], {
      clearHistory: true
    });

  }

}