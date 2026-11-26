# Premier écran NativeScript

Zakaria Mamssi · INF1083 · Groupe 06

Patron Angular Hello World (`@nativescript/template-blank-ng`). Le composant Home affiche un compteur initialisé à zéro. Le bouton appelle `increment()` et la liaison Angular actualise le libellé.

## Fonctionnement

Le bouton appelle `increment()`. La valeur de `count`, initialisée à zéro, augmente de un à chaque appui et la liaison Angular actualise le texte à l’écran.

## Capture du code

![La méthode `increment()` du composant Home met à jour le compteur.](images/code-source.jpg)

La méthode `increment()` du composant Home met à jour le compteur.

## Code source

### src/app/home/home.component.ts

~~~typescript
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {
  count = 0;
  increment(): void { this.count += 1; }

}
~~~

<details>
<summary>src/app.css</summary>

~~~css
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~

</details>

<details>
<summary>src/app/app.component.html</summary>

~~~html
<GridLayout>
  <page-router-outlet></page-router-outlet>
</GridLayout>
~~~

</details>

<details>
<summary>src/app/app.component.ts</summary>

~~~typescript
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PageRouterOutlet } from '@nativescript/angular';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  imports: [PageRouterOutlet],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {}
~~~

</details>

<details>
<summary>src/app/app.routes.ts</summary>

~~~typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
];
~~~

</details>

<details>
<summary>src/app/home/home.component.html</summary>

~~~html
<ActionBar title="Premier labo"></ActionBar>
<StackLayout padding="24">
  <Label text="Bonjour, INF1083 !" fontSize="26"></Label>
  <Button text="Compter un appui" (tap)="increment()"></Button>
  <Label [text]="'Appuis : ' + count"></Label>
</StackLayout>
~~~

</details>

<details>
<summary>src/main.ts</summary>

~~~typescript
import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
} from '@nativescript/angular';
import { provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        provideZonelessChangeDetection(),
      ],
    });
  },
});
~~~

</details>

<details>
<summary>src/polyfills.ts</summary>

~~~typescript
/**
 * NativeScript Polyfills
 */

// Install @nativescript/core polyfills (XHR, setTimeout, requestAnimationFrame)
import '@nativescript/core/globals';
// Install @nativescript/angular specific polyfills
import '@nativescript/angular/polyfills';
~~~

</details>

## Exécution

Avec Node.js, npm, la CLI NativeScript et un appareil Android ou un émulateur configuré, depuis ce dossier :

```powershell
cd B300155462
npm install
ns run android
```

## Vérification sur appareil

Appuyer deux fois sur « Compter un appui ». Le compteur doit afficher 2.

## Vérification effectuée

Capture des résultats locaux — Compteur · logique du composant.

![Résultats de la vérification](images/verification.png)

