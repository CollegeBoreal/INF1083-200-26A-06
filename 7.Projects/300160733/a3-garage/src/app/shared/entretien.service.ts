import { Injectable, computed, signal } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

const STORAGE_KEY = 'a3-garage.entretiens.v1';

export interface Entretien {
  type: string;
  date: string;
  kilometrage: number;
}

function lireEntretiens(): Entretien[] {
  try {
    const data: unknown = JSON.parse(ApplicationSettings.getString(STORAGE_KEY, '[]'));
    return Array.isArray(data) ? data.filter((item): item is Entretien =>
      !!item && typeof item.type === 'string' && typeof item.date === 'string' &&
      Number.isSafeInteger(item.kilometrage),
    ) : [];
  } catch {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class EntretienService {
  private readonly donnees = signal(lireEntretiens());
  readonly historique = computed(() =>
    [...this.donnees()].sort((a, b) => b.date.localeCompare(a.date)),
  );
  readonly dernier = computed(() => this.historique()[0]);

  ajouter(entretien: Entretien): void {
    const donnees = [entretien, ...this.donnees()];
    ApplicationSettings.setString(STORAGE_KEY, JSON.stringify(donnees));
    this.donnees.set(donnees);
  }
}
