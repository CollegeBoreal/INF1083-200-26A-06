import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemEventData } from '@nativescript/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'ns-persons',
  templateUrl: './person.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  standalone: true
})
export class PersonComponent implements OnInit {
  items: Person[] = [];

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.personService.getPeople();
  }

  onItemTap(args: ItemEventData): void {
    const person = this.items[args.index];
    this.router.navigate(['/person', person.id]);
  }
}