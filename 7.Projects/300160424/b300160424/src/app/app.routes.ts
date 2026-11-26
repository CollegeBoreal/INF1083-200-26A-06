import { Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { SuiviComponent } from './suivi/suivi.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'exercices', component: ExercicesComponent },
  { path: 'suivi', component: SuiviComponent }
];