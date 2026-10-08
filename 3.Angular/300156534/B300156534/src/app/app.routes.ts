import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Utilisateurs } from './utilisateurs/utilisateurs';
import { Configuration } from './configuration/configuration';
import { Contact } from './contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Accueil
  },
  {
    path: 'utilisateurs',
    component: Utilisateurs
  },
  {
    path: 'configuration',
    component: Configuration
  },
  {
    path: 'contact',
    component: Contact
  }
];