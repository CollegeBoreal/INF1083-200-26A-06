import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [FormsModule],
  selector: 'app-utilisateurs',
  styleUrl: './utilisateurs.css',
  templateUrl: './utilisateurs.html',
})
export class Utilisateurs {
constructor(
  private http: HttpClient,
  private cdr: ChangeDetectorRef
) {}
 chargerUtilisateurs() {
  this.http
    .get<any[]>('https://jsonplaceholder.typicode.com/users')
    .subscribe({
      next: (data) => {
        this.utilisateurs = data.map(user => ({
          nom: user.name,
          email: user.email
        }));
        this.cdr.detectChanges();
      },
      error: (erreur) => {
        console.error('Erreur API :', erreur);
      }
    });
}
  utilisateurs = [
    { nom: 'Islem', email: 'islem@gmail.com' },
    { nom: 'Bob', email: 'bob@gmail.com' },
    { nom: 'Nabila', email: 'nabila@gmail.com' }
  ];
  nouveauNom = '';
nouvelEmail = '';
ajouterUtilisateur() {
  this.utilisateurs.push({
    nom: this.nouveauNom,
    email: this.nouvelEmail
  });

  this.nouveauNom = '';
  this.nouvelEmail = '';
}
  afficherUtilisateur(nom: string) {
  alert('Utilisateur : ' + nom);
}
supprimerUtilisateur(index: number) {
  this.utilisateurs.splice(index, 1);
}
}
