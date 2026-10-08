import { Component, OnInit, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'ns-details',
  templateUrl: './person-detail.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PersonDetailComponent implements OnInit {
  person: Person;

  private personService = inject(PersonService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.person = this.personService.getItem(id);
  }

  formatAchievements(achievements: any): string {
    if (!achievements) return '';
    if (Array.isArray(achievements)) {
      return achievements.join(', ');
    }
    return achievements;
  }
}
