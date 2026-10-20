import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Utilisateur {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {
  titre = 'Bienvenue INF1083';
  nom = 'Prof';
  connecte = true;

  noms = [
    'Alice',
    'Bob',
    'Charlie'
  ];

  utilisateurs: Utilisateur[] = [];

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.utilisateurs = data;
        console.log(data);
        this.cdr.markForCheck();
      });
  }

  saluer() {
    alert("Bonjour !");
  }
}
