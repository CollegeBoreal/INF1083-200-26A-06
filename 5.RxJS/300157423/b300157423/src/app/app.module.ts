
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptModule,
  NativeScriptHttpClientModule,
  NativeScriptFormsModule
} from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
