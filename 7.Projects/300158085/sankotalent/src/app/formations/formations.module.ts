import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { FormationsRoutingModule } from './formations-routing.module'
import { FormationsComponent } from './formations.component'
import { FormationDetailComponent } from './formation-detail/formation-detail.component'
import { FormateurComponent } from './formateur/formateur.component'

@NgModule({
  imports: [NativeScriptCommonModule, FormationsRoutingModule],
  declarations: [FormationsComponent, FormationDetailComponent, FormateurComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FormationsModule {}
