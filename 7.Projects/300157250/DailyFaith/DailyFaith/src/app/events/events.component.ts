
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NavigationComponent } from '../navigation/navigation.component';
import { ChurchEvent, EventService } from '../services/event.service';

@Component({
  selector: 'ns-events',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {

  constructor(private eventService: EventService) {}

  get events(): ChurchEvent[] {
    return this.eventService.getEvents();
  }

  // Enregistrer ou annuler une participation
  participate(event: ChurchEvent) {
    this.eventService.toggleParticipation(event);
  }
}
