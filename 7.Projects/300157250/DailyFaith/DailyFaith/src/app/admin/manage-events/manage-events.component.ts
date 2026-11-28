import {
  Component,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert, confirm } from '@nativescript/core';

import {
  ChurchEvent,
  EventService
} from '../../services/event.service';

import {
  Church,
  ChurchService
} from '../../services/church.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ns-manage-events',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css']
})

export class ManageEventsComponent {

  selectedChurchId: number | null = null;
  editingId: number | null = null;

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
    private cdr: ChangeDetectorRef
  ) {}

  // Églises du pasteur

  get churches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return [];
    }

    return this.churchService.getPastorChurches(user.id);

  }

  // Tous les événements du pasteur

  get allEvents(): ChurchEvent[] {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return [];
    }

    const churchIds = this.churches.map(church => church.id);

    return this.eventService
      .getPastorEvents(user.id)
      .filter(event =>
        event.churchId !== undefined &&
        churchIds.includes(event.churchId)
      )
      .sort((a, b) => b.id - a.id);

  }

  // Filtrer les événements

  get events(): ChurchEvent[] {

    if (this.selectedChurchId === null) {
      return this.allEvents;
    }

    return this.allEvents.filter(
      event => event.churchId === this.selectedChurchId
    );

  }

  // Statistiques

  get totalChurches(): number {
    return this.churches.length;
  }

  get totalEvents(): number {
    return this.allEvents.length;
  }

  get totalParticipants(): number {

    return this.allEvents.reduce(
      (total, event) =>
        total + this.eventService.getParticipantsCount(event),
      0
    );

  }

  // Sélectionner une église

  selectChurch(churchId: number | null) {

    this.selectedChurchId = churchId;

    this.cancelEdit();

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

  // Nombre de participants

  getParticipantsCount(event: ChurchEvent): number {

    return this.eventService.getParticipantsCount(event);

  }

  // Modifier un événement

  editEvent(event: ChurchEvent) {

    if (!this.allEvents.some(item => item.id === event.id)) {
      return;
    }

    this.editingId = event.id;

    this.title = event.title;
    this.date = event.date;
    this.time = event.time;
    this.location = event.location;
    this.description = event.description;

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

  // Enregistrer les modifications

  async saveEvent() {

    if (this.editingId === null) {
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

    const success = this.eventService.updateEvent(
      this.editingId,
      this.title,
      this.date,
      this.time,
      this.location,
      this.description
    );

    if (!success) {

      await alert('Impossible de modifier cet événement.');

      return;

    }

    this.cancelEdit();

    this.cdr.markForCheck();

    await alert({

      title: 'Événement modifié',
      message: 'Vos modifications ont été enregistrées.',
      okButtonText: 'OK'

    });

  }

  // Annuler les modifications

  cancelEdit() {

    this.editingId = null;

    this.title = '';
    this.date = '';
    this.time = '';
    this.location = '';
    this.description = '';

  }

  // Supprimer un événement

  async deleteEvent(event: ChurchEvent) {

    if (!this.allEvents.some(item => item.id === event.id)) {
      return;
    }

    const result = await confirm({

      title: 'Supprimer un événement',

      message: `Voulez-vous vraiment supprimer "${event.title}" ? Les inscriptions associées seront également supprimées.`,

      okButtonText: 'Supprimer',

      cancelButtonText: 'Annuler'

    });

    if (!result) {
      return;
    }

    const success = this.eventService.deleteEvent(event.id);

    if (!success) {

      await alert('Impossible de supprimer cet événement.');

      return;

    }

    if (this.editingId === event.id) {
      this.cancelEdit();
    }

    this.cdr.markForCheck();

    await alert({

      title: 'Événement supprimé',
      message: 'Votre événement a été supprimé avec succès.',
      okButtonText: 'OK'

    });

  }

  // Créer un événement

  createEvent() {

    this.router.navigate(['/create-event']);

  }

  // Retour au tableau de bord

  goBack() {

    this.router.navigate(['/admin'], {
      clearHistory: true
    });

  }

}