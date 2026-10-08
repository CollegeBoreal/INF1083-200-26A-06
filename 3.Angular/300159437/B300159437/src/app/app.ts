import { Component } from '@angular/core';
import { Accueil } from './accueil/accueil';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Accueil],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
