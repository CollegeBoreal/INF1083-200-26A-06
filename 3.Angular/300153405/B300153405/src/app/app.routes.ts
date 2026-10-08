import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Contact } from './contact/contact';
import { Utilisateurs } from './utilisateurs/utilisateurs';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'contact', component: Contact },
  { path: 'utilisateurs', component: Utilisateurs }
];