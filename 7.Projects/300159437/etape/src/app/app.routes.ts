import { Routes } from '@angular/router';
import { DemarrageComponent } from './pages/demarrage.component';
import { BienvenueComponent } from './pages/bienvenue.component';
import { ParcoursComponent } from './pages/parcours.component';
import { EtapeComponent } from './pages/etape.component';
import { CoffreComponent } from './pages/coffre.component';
import { PresDeMoiComponent } from './pages/pres-de-moi.component';
import { VideosComponent } from './pages/videos.component';
import { PartageComponent } from './pages/partage.component';
import { ConnexionComponent } from './pages/connexion.component';
import { CompteComponent } from './pages/compte.component';

export const routes: Routes = [
  { path: '', component: DemarrageComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'bienvenue', component: BienvenueComponent },
  { path: 'parcours', component: ParcoursComponent },
  { path: 'etape/:id', component: EtapeComponent },
  { path: 'coffre', component: CoffreComponent },
  { path: 'pres', component: PresDeMoiComponent },
  { path: 'videos/:id', component: VideosComponent },
  { path: 'partage', component: PartageComponent },
];
