import { Component, OnInit, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';

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
  private routerExtensions = inject(RouterExtensions);

  ngOnInit(): void {
    this.items = this.personService.getItems();
  }

  openPerson(item: Person): void {
    this.routerExtensions.navigate(['/item', item.id]);
  }
}