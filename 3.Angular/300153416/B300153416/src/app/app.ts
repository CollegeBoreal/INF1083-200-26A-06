import { Component, inject, signal } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  personService = inject(PersonService);
  selectedPerson = signal<Person | undefined>(this.personService.items()[0]);

  selectPerson(id: number): void {
    this.selectedPerson.set(this.personService.getPerson(id));
  }
}
