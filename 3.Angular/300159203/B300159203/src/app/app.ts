import { Component } from '@angular/core';
import { Bienvenue } from './bienvenue/bienvenue';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Bienvenue],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'B300159203';
}