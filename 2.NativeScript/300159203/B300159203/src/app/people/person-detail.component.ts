import { Component, NO_ERRORS_SCHEMA, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'ns-person-detail',
  templateUrl: './person-detail.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  standalone: true
})
export class PersonDetailComponent implements OnInit {
  person = signal<Person | undefined>(undefined);

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      const foundPerson = this.personService.getPerson(id);
      this.person.set(foundPerson);
    }
  }
}