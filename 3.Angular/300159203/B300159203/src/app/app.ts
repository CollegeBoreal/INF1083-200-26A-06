import { Component } from '@angular/core';
import { BienvenueComponent } from './bienvenue/bienvenue';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BienvenueComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'B300159203';
}