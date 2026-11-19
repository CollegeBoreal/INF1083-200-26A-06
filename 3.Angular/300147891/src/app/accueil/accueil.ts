import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
})
export class Accueil {
  private http = inject(HttpClient);
  utilisateurs: any[] = [];
  titre = 'Bienvenue INF1083';
  nom = 'B300147891';
  etudiants = ['Amadou', 'Barry', 'Khadiz'];
  supprimerEtudiant(index: number) {
    this.etudiants.splice(index, 1);}
  ajouterEtudiant(nom: string)  {
    if (nom.trim() !== '') {
      this.etudiants.push(nom);
    }
  }
 message = '' ;
 afficherMessage() {
  this.message = 'Bienvenue dans mon application Angular !' ;
 } 
 chargerUtilisateurs() {
  this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
  .subscribe(donnees => {
    this.utilisateurs = donnees;
  });
  }
}


