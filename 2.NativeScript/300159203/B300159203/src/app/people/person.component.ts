import { Component, OnInit, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'ns-people',
  templateUrl: './person.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PersonComponent implements OnInit {
  items: Array<Person>;
  private personService = inject(PersonService);

  ngOnInit(): void {
    this.items = this.personService.getItems();
  }
}