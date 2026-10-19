import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Utilisateurs } from './utilisateurs/utilisateurs';
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
    path: 'contact',
    component: Contact
  }

];