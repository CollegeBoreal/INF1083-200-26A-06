import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
} from '@nativescript/angular';

import { provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';

import { firebase } from '@nativescript/firebase-core';

import '@nativescript/firebase-auth';
import '@nativescript/firebase-firestore';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

runNativeScriptAngularApp({
  appModuleBootstrap: async () => {

    try {
      await firebase().initializeApp();

      console.log('DAILY FAITH : Firebase initialisé avec succès.');

    } catch (error) {
      console.error('DAILY FAITH : Erreur Firebase', error);
      throw error;
    }

    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(
          withInterceptorsFromDi()
        ),
        provideNativeScriptRouter(routes),
        provideZonelessChangeDetection(),
      ],
    });
  },
});