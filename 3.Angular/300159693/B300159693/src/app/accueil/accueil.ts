 
import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
})
export class Accueil {
  etudiants: string[] = [
    'Ahmed',
    'Sarah',
    'Yacine',
    'Amine'
  ];

  message: string = '';

  afficherMessage(): void {
    this.message = 'Bienvenue dans notre application Angular !';
  }
}

