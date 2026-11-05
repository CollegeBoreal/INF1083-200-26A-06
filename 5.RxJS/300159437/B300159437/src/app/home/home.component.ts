
import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title: string = 'Explore the World';
  description: string = 'Discover countries and capitals!';
}
