# Deux façons d’animer une vue

Zakaria Mamssi · INF1083 · Groupe 06

Patron Angular à tiroir avec nativescript-ui-sidedrawer. Sur la page Couleur, les images clés CSS font passer le bouton du rouge au vert en deux secondes. La page Mouvement enchaîne opacité, translation, échelle et rotation en TypeScript.

## Code source

### src/app/browse/browse.component.ts

~~~typescript
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, View } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  busy = false;

  async animate(view: View): Promise<void> {
    if (this.busy) return;
    this.busy = true;
    const duration = 300;
    try {
      await view.animate({ opacity: 0, duration });
      await view.animate({ opacity: 1, duration });
      await view.animate({ translate: { x: 150, y: 150 }, duration });
      await view.animate({ translate: { x: 0, y: 0 }, duration });
      await view.animate({ scale: { x: 2, y: 2 }, duration });
      await view.animate({ scale: { x: 1, y: 1 }, duration });
      await view.animate({ rotate: 180, duration });
      await view.animate({ rotate: 0, duration });
    } finally {
      view.opacity = 1;
      view.translateX = view.translateY = view.rotate = 0;
      view.scaleX = view.scaleY = 1;
      this.busy = false;
    }
  }

  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer
    sideDrawer.showDrawer()
  }
}
~~~

<details>
<summary>src/_app-common.scss</summary>

~~~scss
@import '@nativescript/theme/core';
@import '@nativescript/theme/default';

// Place any CSS rules you want to apply on both iOS and Android here.
// This is where the vast majority of your CSS code goes.

// Font icon class
.fab {
  font-family: 'Font Awesome 5 Brands', 'fa-brands-400';
  font-weight: 400;
}

.fas {
  font-family: 'Font Awesome 5 Free', 'fa-solid-900';
  font-weight: 900;
}

.far {
  font-family: 'Font Awesome 5 Free', 'fa-regular-400';
  font-weight: 400;
}

// Common page class
.page__content {
  &-icon,
  &-placeholder {
    color: const(grey);
    font-size: 20;
    vertical-align: center;
    horizontal-align: center;
  }

  &-icon {
    font-size: 72;
    vertical-align: top;
    margin-top: 20%;
  }
}

// Drawer navigation custom styles
.nt-drawer__header-image {
  color: const(grey);
}
~~~

</details>

<details>
<summary>src/app.android.scss</summary>

~~~scss
// Import common styles
@import 'app-common';

// Place any CSS rules you want to apply only on Android here
~~~

</details>

<details>
<summary>src/app.ios.scss</summary>

~~~scss
// Import common styles
@import 'app-common';

// Place any CSS rules you want to apply only on iOS here
~~~

</details>

<details>
<summary>src/app/app-routing.module.ts</summary>

~~~typescript
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'browse',
    loadChildren: () => import('~/app/browse/browse.module').then((m) => m.BrowseModule),
  },
  {
    path: 'search',
    loadChildren: () => import('~/app/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'featured',
    loadChildren: () => import('~/app/featured/featured.module').then((m) => m.FeaturedModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('~/app/settings/settings.module').then((m) => m.SettingsModule),
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
~~~

</details>

<details>
<summary>src/app/app.component.html</summary>

~~~html
<RadSideDrawer [drawerTransition]="sideDrawerTransition">
  <StackLayout tkDrawerContent padding="24" backgroundColor="white">
    <Label text="Animations" fontSize="26"></Label>
    <Button text="Couleur (CSS)" (tap)="onNavItemTap('/home')"></Button>
    <Button text="Mouvement (TypeScript)" (tap)="onNavItemTap('/browse')"></Button>
  </StackLayout>
  <GridLayout tkMainContent><page-router-outlet></page-router-outlet></GridLayout>
</RadSideDrawer>
~~~

</details>

<details>
<summary>src/app/app.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'
import { filter } from 'rxjs/operators'
import { Application } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(private router: Router, private routerExtensions: RouterExtensions) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    this._activatedUrl = '/home'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })

    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.closeDrawer()
  }
}
~~~

</details>

<details>
<summary>src/app/app.module.ts</summary>

~~~typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [AppRoutingModule, NativeScriptModule, NativeScriptUISideDrawerModule],
  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
~~~

</details>

<details>
<summary>src/app/browse/browse-routing.module.ts</summary>

~~~typescript
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { BrowseComponent } from './browse.component'

const routes: Routes = [{ path: '', component: BrowseComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class BrowseRoutingModule {}
~~~

</details>

<details>
<summary>src/app/browse/browse.component.html</summary>

~~~html
<ActionBar title="Animations">
  <ActionItem text="Menu" (tap)="onDrawerButtonTap()" android.position="actionBar"></ActionItem>
</ActionBar>
<StackLayout padding="20">
  <AbsoluteLayout width="250" height="250" backgroundColor="#e1edf3">
    <Label #cible text="Z" left="24" top="24" width="42" height="42" textAlignment="center" fontSize="28" backgroundColor="#73beb0"></Label>
  </AbsoluteLayout>
  <Button text="Animer" [isEnabled]="!busy" (tap)="animate(cible)"></Button>
</StackLayout>
~~~

</details>

<details>
<summary>src/app/browse/browse.module.ts</summary>

~~~typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { BrowseRoutingModule } from './browse-routing.module'
import { BrowseComponent } from './browse.component'

@NgModule({
  imports: [NativeScriptCommonModule, BrowseRoutingModule],
  declarations: [BrowseComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BrowseModule {}
~~~

</details>

<details>
<summary>src/app/featured/featured-routing.module.ts</summary>

~~~typescript
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { FeaturedComponent } from './featured.component'

const routes: Routes = [{ path: '', component: FeaturedComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class FeaturedRoutingModule {}
~~~

</details>

<details>
<summary>src/app/featured/featured.component.html</summary>

~~~html
<ActionBar class="action-bar">
  <NavigationButton visibility="hidden"></NavigationButton>
  <GridLayout columns="50, *">
    <Label class="action-bar-title" text="Featured" colSpan="2"></Label>

    <Label class="fas" text="&#xf0c9;" (tap)="onDrawerButtonTap()"></Label>
  </GridLayout>
</ActionBar>

<GridLayout class="page__content">
  <Label class="page__content-icon fas" text="&#xf005;"></Label>
  <Label class="page__content-placeholder" text="<!-- Page content goes here -->"></Label>
</GridLayout>
~~~

</details>

<details>
<summary>src/app/featured/featured.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Featured',
  templateUrl: './featured.component.html',
})
export class FeaturedComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
~~~

</details>

<details>
<summary>src/app/featured/featured.module.ts</summary>

~~~typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { FeaturedRoutingModule } from './featured-routing.module'
import { FeaturedComponent } from './featured.component'

@NgModule({
  imports: [NativeScriptCommonModule, FeaturedRoutingModule],
  declarations: [FeaturedComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FeaturedModule {}
~~~

</details>

<details>
<summary>src/app/home/home-routing.module.ts</summary>

~~~typescript
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { HomeComponent } from './home.component'

const routes: Routes = [{ path: '', component: HomeComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class HomeRoutingModule {}
~~~

</details>

<details>
<summary>src/app/home/home.component.html</summary>

~~~html
<ActionBar title="Animations">
  <ActionItem text="Menu" (tap)="onDrawerButtonTap()" android.position="actionBar"></ActionItem>
</ActionBar>
<StackLayout padding="24"><Button class="background" text="{N}"></Button></StackLayout>
~~~

</details>

<details>
<summary>src/app/home/home.component.scss</summary>

~~~scss
@keyframes bgAnimation {
  from { background-color: red; }
  to { background-color: green; }
}
.background {
  animation-name: bgAnimation;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  color: white;
}
~~~

</details>

<details>
<summary>src/app/home/home.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
~~~

</details>

<details>
<summary>src/app/home/home.module.ts</summary>

~~~typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [NativeScriptCommonModule, HomeRoutingModule],
  declarations: [HomeComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule {}
~~~

</details>

<details>
<summary>src/app/search/search-routing.module.ts</summary>

~~~typescript
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SearchComponent } from './search.component'

const routes: Routes = [{ path: '', component: SearchComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SearchRoutingModule {}
~~~

</details>

<details>
<summary>src/app/search/search.component.html</summary>

~~~html
<ActionBar class="action-bar">
  <NavigationButton visibility="hidden"></NavigationButton>
  <GridLayout columns="50, *">
    <Label class="action-bar-title" text="Search" colSpan="2"></Label>

    <Label class="fas" text="&#xf0c9;" (tap)="onDrawerButtonTap()"></Label>
  </GridLayout>
</ActionBar>

<GridLayout class="page__content">
  <Label class="page__content-icon fas" text="&#xf002;"></Label>
  <Label class="page__content-placeholder" text="<!-- Page content goes here -->"></Label>
</GridLayout>
~~~

</details>

<details>
<summary>src/app/search/search.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
~~~

</details>

<details>
<summary>src/app/search/search.module.ts</summary>

~~~typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'

@NgModule({
  imports: [NativeScriptCommonModule, SearchRoutingModule],
  declarations: [SearchComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
~~~

</details>

<details>
<summary>src/app/settings/settings-routing.module.ts</summary>

~~~typescript
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SettingsComponent } from './settings.component'

const routes: Routes = [{ path: '', component: SettingsComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SettingsRoutingModule {}
~~~

</details>

<details>
<summary>src/app/settings/settings.component.html</summary>

~~~html
<ActionBar class="action-bar">
  <NavigationButton visibility="hidden"></NavigationButton>
  <GridLayout columns="50, *">
    <Label class="action-bar-title" text="Settings" colSpan="2"></Label>

    <Label class="fas" text="&#xf0c9;" (tap)="onDrawerButtonTap()"></Label>
  </GridLayout>
</ActionBar>

<GridLayout class="page__content">
  <Label class="page__content-icon fas" text="&#xf013;"></Label>
  <Label class="page__content-placeholder" text="<!-- Page content goes here -->"></Label>
</GridLayout>
~~~

</details>

<details>
<summary>src/app/settings/settings.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
~~~

</details>

<details>
<summary>src/app/settings/settings.module.ts</summary>

~~~typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SettingsRoutingModule } from './settings-routing.module'
import { SettingsComponent } from './settings.component'

@NgModule({
  imports: [NativeScriptCommonModule, SettingsRoutingModule],
  declarations: [SettingsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsModule {}
~~~

</details>

<details>
<summary>src/main.ts</summary>

~~~typescript
import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from './app/app.module';

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
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

/**
 * Zone.js and patches
 */
// Add pre-zone.js patches needed for the NativeScript platform
import '@nativescript/zone-js/dist/pre-zone-polyfills';

// Zone JS is required by default for Angular itself
import 'zone.js';

// Add NativeScript specific Zone JS patches
import '@nativescript/zone-js';
~~~

</details>

## Exécution

Avec Node.js, npm, la CLI NativeScript et un appareil Android ou un émulateur configuré, depuis ce dossier :

```powershell
cd b300155462
npm install
ns run android
```

## Vérification sur appareil

Ouvrir le menu et sélectionner Mouvement. Appuyer sur Animer. Le Z doit revenir à son état initial et le bouton redevenir actif.

## Vérification effectuée

Capture des résultats locaux — Séquence TypeScript · vue native simulée.

![Résultats de la vérification](images/verification.png)
