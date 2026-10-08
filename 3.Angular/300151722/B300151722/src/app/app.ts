import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  nom = 'OU_DZ';

  etudiants: string[] = [
    'Alice',
    'Bob',
    'Charlie'
  ];

  nouveauNom = '';
  nomSaisi = '';
  message = '';

  utilisateurs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.utilisateurs = data;
      });
  }

  ajouterEtudiant() {
    if (this.nouveauNom.trim() !== '') {
      this.etudiants.push(this.nouveauNom);
      this.nomSaisi = this.nouveauNom;
      this.nouveauNom = '';
    }
  }

  supprimerEtudiant(index: number) {
    this.etudiants.splice(index, 1);
  }

  afficherMessage() {
    this.message = 'Bienvenue ' + this.nom + ' !';
  }
}
