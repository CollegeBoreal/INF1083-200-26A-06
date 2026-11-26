import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { Accueil } from './app/accueil';
import { Annuaire } from './app/annuaire';

bootstrapApplication(App, { providers: [provideHttpClient(), provideRouter([
  { path: '', component: Accueil },
  { path: 'utilisateurs', component: Annuaire },
  { path: '**', redirectTo: '' },
])] }).catch(console.error);
