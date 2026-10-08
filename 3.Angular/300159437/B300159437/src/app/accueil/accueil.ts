import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  titre = 'Bienvenue INF1083';

  noms = ['Alice', 'Bob', 'Charlie'];

  supprimerUtilisateur(index: number) {
    this.noms.splice(index, 1);
  }

  saluer() {
    alert('Bonjour , Je suis le Milieu !');
  }
}
