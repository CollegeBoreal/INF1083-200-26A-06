import { Component } from '@angular/core';
import { EntretienService } from '../shared/entretien.service';

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  constructor(readonly entretiens: EntretienService) {}
}
