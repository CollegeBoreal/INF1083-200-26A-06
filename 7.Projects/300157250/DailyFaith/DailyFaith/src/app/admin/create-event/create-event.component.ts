
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';
import { alert } from '@nativescript/core';
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'ns-create-event',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {

  title = '';
  date = '';
  time = '';
  location = '';
  description = '';

  constructor(
    private router: RouterExtensions,
    private eventService: EventService,
    private notificationService: NotificationService
  ) {}

  onTitleChange(args: any) {
    this.title = args.object.text;
  }

  onDateChange(args: any) {
    this.date = args.object.text;
  }

  onTimeChange(args: any) {
    this.time = args.object.text;
  }

  onLocationChange(args: any) {
    this.location = args.object.text;
  }

  onDescriptionChange(args: any) {
    this.description = args.object.text;
  }

  async publishEvent() {

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

    this.eventService.addEvent(
      this.title,
      this.date,
      this.time,
      this.location,
      this.description
    );

    // Notification automatique
    this.notificationService.addNotification(
      'Nouvel événement',
      `Un nouvel événement a été publié : ${this.title.trim()}.
Date : ${this.date.trim()}
Heure : ${this.time.trim()}
Lieu : ${this.location.trim()}`
    );

    await alert({
      title: 'Événement publié',
      message: 'Votre événement a été créé et une notification a été ajoutée dans l’espace membre.',
      okButtonText: 'OK'
    });

    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }

  cancel() {
    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }
}
