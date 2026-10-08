import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [CommonModule],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
})
export class Accueil {
  titre = 'Bienvenue INF1083';
  nom = "Khaled";
  connecte = true;
  noms = ['Islem', 'Bob', 'Nabila'];
    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

    saluer() {
    alert("Bonjour !");
  }
  chargerUtilisateurs() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.noms = data.map((user: any) => user.name);
        this.cdr.detectChanges();
      });
  }
}

