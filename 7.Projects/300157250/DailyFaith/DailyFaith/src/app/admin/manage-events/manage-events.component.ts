
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';
import { alert, confirm } from '@nativescript/core';
import { ChurchEvent, EventService } from '../../services/event.service';

@Component({
  selector: 'ns-manage-events',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css'],
})
export class ManageEventsComponent {

  editingId: number | null = null;

  title = '';
  date = '';
  time = '';
  location = '';
  description = '';

  constructor(
    private router: RouterExtensions,
    private eventService: EventService
  ) {}

  get events(): ChurchEvent[] {
    return this.eventService.getEvents();
  }

  editEvent(event: ChurchEvent) {
    this.editingId = event.id;
    this.title = event.title;
    this.date = event.date;
    this.time = event.time;
    this.location = event.location;
    this.description = event.description;
  }

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

  async saveEvent() {

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

    if (this.editingId !== null) {

      this.eventService.updateEvent(
        this.editingId,
        this.title,
        this.date,
        this.time,
        this.location,
        this.description
      );

      this.cancelEdit();

      await alert('Événement modifié avec succès.');
    }
  }

  cancelEdit() {
    this.editingId = null;
    this.title = '';
    this.date = '';
    this.time = '';
    this.location = '';
    this.description = '';
  }

  async deleteEvent(event: ChurchEvent) {

    const result = await confirm({
      title: 'Supprimer un événement',
      message: 'Voulez-vous vraiment supprimer cet événement ?',
      okButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result) {

      this.eventService.deleteEvent(event.id);

      if (this.editingId === event.id) {
        this.cancelEdit();
      }

      await alert('Événement supprimé avec succès.');
    }
  }

  goBack() {
    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }
}
