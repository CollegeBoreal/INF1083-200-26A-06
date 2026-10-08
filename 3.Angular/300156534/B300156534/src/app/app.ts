import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Accueil } from './accueil/accueil';

@Component({
  imports: [RouterOutlet, RouterLink, Accueil],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}