import { Routes } from '@angular/router';
import { PersonComponent } from './people/person.component';
import { PersonDetailComponent } from './people/person-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: PersonComponent },
  { path: 'person/:id', component: PersonDetailComponent },
];