import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {

  titre = 'Bienvenue INF1083';

  connecte = true;

  noms = [
    'Alice',
    'Bob',
    'Charlie'
  ];

  saluer() {
    alert('Bonjour INF1083!');
  }
}
