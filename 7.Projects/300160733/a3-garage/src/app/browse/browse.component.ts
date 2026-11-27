import { Component, ElementRef, ViewChild } from '@angular/core';
import { StackLayout, TextField } from '@nativescript/core';
import { EntretienService } from '../shared/entretien.service';

function dateLocale(): string {
  const date = new Date();
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const jour = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${mois}-${jour}`;
}

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent {
  @ViewChild('formulaire', { read: ElementRef }) private formulaire!: ElementRef<StackLayout>;

  type = '';
  date = dateLocale();
  kilometrage = '';
  message = '';
  enregistre = false;

  constructor(private readonly entretiens: EntretienService) {}

  enregistrer(): void {
    for (const id of ['type', 'date', 'kilometrage']) {
      this.formulaire.nativeElement.getViewById<TextField>(id)?.dismissSoftInput();
    }

    const type = this.type.trim();
    const date = this.date.trim();
    const saisieKm = this.kilometrage.trim();
    const kilometrage = Number(saisieKm);
    const dateISO = new Date(date + 'T00:00:00Z');
    this.enregistre = false;

    if (!type) {
      this.message = 'Entre le type d’entretien.';
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(dateISO.getTime()) || dateISO.toISOString().slice(0, 10) !== date) {
      this.message = 'Entre une date valide au format AAAA-MM-JJ.';
      return;
    }
    if (!/^\d+$/.test(saisieKm) || !Number.isSafeInteger(kilometrage)) {
      this.message = 'Entre un kilométrage entier de 0 ou plus.';
      return;
    }

    this.entretiens.ajouter({ type, date, kilometrage });
    this.type = '';
    this.kilometrage = '';
    this.enregistre = true;
    this.message = 'Entretien enregistré.';
  }
}
