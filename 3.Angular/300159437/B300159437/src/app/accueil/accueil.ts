import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  titre = 'Bienvenue INF1083 , un plaisir de vous voir ';

  noms = ['Alice', 'Bob', 'Charlie'];

  saluer() {
    alert('Bonjour , comment allez vous ? !');
  }

  supprimerUtilisateur(index: number) {
    this.noms.splice(index, 1);
  }
}
