import { Component } from '@angular/core';
import { EntretienService } from '../shared/entretien.service';

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(readonly entretiens: EntretienService) {}
}
