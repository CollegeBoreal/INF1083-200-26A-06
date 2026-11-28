import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { FormationsComponent } from './formations.component'
import { FormationDetailComponent } from './formation-detail/formation-detail.component'
import { FormateurComponent } from './formateur/formateur.component'

const routes: Routes = [
  { path: 'default', component: FormationsComponent },
  { path: 'formation/:id', component: FormationDetailComponent },
  { path: 'formateur', component: FormateurComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class FormationsRoutingModule {}
