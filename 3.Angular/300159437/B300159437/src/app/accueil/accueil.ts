import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  titre = 'Bienvenue INF1083';

  nom = 'Prof';

  connecte = true;

  noms = ['Alice', 'Bob', 'Charlie'];

  saluer() {
    alert('Bonjour !');
  }
}
