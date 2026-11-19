 import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  etudiants = ['Alice', 'Bob', 'Charlie'];
  message = '';

  afficherMessage() {
    this.message = 'Bienvenue dans le cours INF1083 !';
  }
}
