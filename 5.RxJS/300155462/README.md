# Recherche par capitale

Zakaria Mamssi · INF1083 · Groupe 06

Patron Angular à onglets. Dans Search, ngModel lie le champ au composant. Un service HttpClient transforme la réponse en Observable<Country[]> avec map. La liste affiche le pays et la capitale. Le service du cours est interrogé sans clé dans son exemple.

## Code source

### src/app/shared/apicall.service.ts

~~~typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Country } from './country';

interface CapitalResult {
  name: { common: string };
  capital?: string[];
}

@Injectable({ providedIn: 'root' })
export class ApicallService {
  private http = inject(HttpClient);

  searchCountryByName(capital: string): Observable<Country[]> {
    const url = 'https://countries.nexperts.nl/capital/' + encodeURIComponent(capital.trim());
    return this.http.get<CapitalResult[]>(url).pipe(
      map(rows => rows.map((row, id) => ({
        id,
        name: row.name.common,
        capital: (row.capital ?? []).join(', '),
      })))
    );
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

// Custom tabstrip item class
.navigation__item {
  &:active,
  &:active Label {
    @include colorize($contrasted-color: complementary background 20% 0%);
  }
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
import { NativeScriptRouterModule, NSEmptyOutletComponent } from '@nativescript/angular'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/(homeTab:home/default//browseTab:browse/default//searchTab:search/default)',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
    outlet: 'homeTab',
  },
  {
    path: 'browse',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/browse/browse.module').then((m) => m.BrowseModule),
    outlet: 'browseTab',
  },
  {
    path: 'search',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/search/search.module').then((m) => m.SearchModule),
    outlet: 'searchTab',
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
<TabView androidTabsPosition="bottom">
  <GridLayout *tabItem="{ title: 'Home' }">
    <page-router-outlet name="homeTab"></page-router-outlet>
  </GridLayout>

  <GridLayout *tabItem="{ title: 'Browse' }">
    <page-router-outlet name="browseTab"></page-router-outlet>
  </GridLayout>

  <GridLayout *tabItem="{ title: 'Search' }">
    <page-router-outlet name="searchTab"></page-router-outlet>
  </GridLayout>
</TabView>
~~~

</details>

<details>
<summary>src/app/app.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'

@Component({
  standalone: false,
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }
}
~~~

</details>

<details>
<summary>src/app/app.module.ts</summary>

~~~typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule, NativeScriptHttpClientModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptHttpClientModule, NativeScriptModule, AppRoutingModule],
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

const routes: Routes = [{ path: 'default', component: BrowseComponent }]

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
<ActionBar>
  <Label text="Browse"></Label>
</ActionBar>

<GridLayout class="page__content">
  <Label class="page__content-icon far" text="&#xf1ea;"></Label>
  <Label class="page__content-placeholder" text="<!-- Page content goes here -->"></Label>
</GridLayout>
~~~

</details>

<details>
<summary>src/app/browse/browse.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
  }
}
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
<summary>src/app/home/home-routing.module.ts</summary>

~~~typescript
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { HomeComponent } from './home.component'
import { ItemDetailComponent } from './item-detail/item-detail.component'

const routes: Routes = [
  { path: 'default', component: HomeComponent },
  { path: 'item/:id', component: ItemDetailComponent },
]

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
<ActionBar>
  <Label text="Home"></Label>
</ActionBar>

<GridLayout>
  <ListView [items]="items">
    <ng-template let-item="item">
      <StackLayout [nsRouterLink]="['../item', item.id]">
        <Label [text]="item.name"></Label>
      </StackLayout>
    </ng-template>
  </ListView>
</GridLayout>
~~~

</details>

<details>
<summary>src/app/home/home.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'

import { DataService, DataItem } from '../shared/data.service'

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  items: Array<DataItem>

  constructor(private _itemService: DataService) {}

  ngOnInit(): void {
    this.items = this._itemService.getItems()
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
import { ItemDetailComponent } from './item-detail/item-detail.component'

@NgModule({
  imports: [NativeScriptCommonModule, HomeRoutingModule],
  declarations: [HomeComponent, ItemDetailComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule {}
~~~

</details>

<details>
<summary>src/app/home/item-detail/item-detail.component.html</summary>

~~~html
<ActionBar>
  <NavigationButton (tap)="onBackTap()" android.systemIcon="ic_menu_back"></NavigationButton>
  <Label [text]="item.name"></Label>
</ActionBar>

<GridLayout>
  <Label class="m-10 h3" verticalAlignment="top" [text]="item.description"></Label>
</GridLayout>
~~~

</details>

<details>
<summary>src/app/home/item-detail/item-detail.component.ts</summary>

~~~typescript
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'

import { DataService, DataItem } from '../../shared/data.service'

@Component({
  standalone: false,
  selector: 'ItemDetail',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  item: DataItem

  constructor(
    private _data: DataService,
    private _route: ActivatedRoute,
    private _routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = +this._route.snapshot.params.id
    this.item = this._data.getItem(id)
  }

  onBackTap(): void {
    this._routerExtensions.back()
  }
}
~~~

</details>

<details>
<summary>src/app/search/search-routing.module.ts</summary>

~~~typescript
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SearchComponent } from './search.component'

const routes: Routes = [{ path: 'default', component: SearchComponent }]

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
<ActionBar title="Recherche par capitale"></ActionBar>
<GridLayout rows="auto,auto,auto,*" padding="16">
  <TextField hint="Capitale, par exemple Ottawa" [(ngModel)]="name" (returnPress)="searchCapital()"></TextField>
  <Button row="1" text="Rechercher" (tap)="searchCapital()"></Button>
  <Label row="2" [text]="message" textWrap="true"></Label>
  <ListView row="3" [items]="countries">
    <ng-template let-item="item">
      <StackLayout padding="12">
        <Label [text]="item.name" fontWeight="bold"></Label>
        <Label [text]="item.capital"></Label>
      </StackLayout>
    </ng-template>
  </ListView>
</GridLayout>
~~~

</details>

<details>
<summary>src/app/search/search.component.ts</summary>

~~~typescript
import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({ standalone: false, selector: 'Search', templateUrl: './search.component.html' })
export class SearchComponent implements OnDestroy {
  private api = inject(ApicallService);
  private request?: Subscription;
  name = '';
  countries: Country[] = [];
  message = '';

  searchCapital(): void {
    this.request?.unsubscribe();
    this.countries = [];
    if (!this.name.trim()) {
      this.message = 'Entre une capitale.';
      return;
    }
    this.message = 'Recherche en cours…';
    this.request = this.api.searchCountryByName(this.name).subscribe({
      next: rows => {
        this.countries = rows;
        this.message = rows.length ? '' : 'Aucun résultat.';
      },
      error: error => {
        this.message = error.status === 404 ? 'Capitale introuvable.' : 'Service indisponible. Réessaie plus tard.';
      },
    });
  }

  ngOnDestroy(): void { this.request?.unsubscribe(); }
}
~~~

</details>

<details>
<summary>src/app/search/search.module.ts</summary>

~~~typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'

@NgModule({
  imports: [NativeScriptFormsModule, NativeScriptCommonModule, SearchRoutingModule],
  declarations: [SearchComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
~~~

</details>

<details>
<summary>src/app/shared/country.ts</summary>

~~~typescript
export interface Country {
  id: number;
  name: string;
  capital: string;
}
~~~

</details>

<details>
<summary>src/app/shared/data.service.ts</summary>

~~~typescript
import { Injectable } from '@angular/core'

export interface DataItem {
  id: number
  name: string
  description: string
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private items = new Array<DataItem>(
    {
      id: 1,
      name: 'Item 1',
      description: 'Description for Item 1',
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description for Item 2',
    },
    {
      id: 3,
      name: 'Item 3',
      description: 'Description for Item 3',
    },
    {
      id: 4,
      name: 'Item 4',
      description: 'Description for Item 4',
    },
    {
      id: 5,
      name: 'Item 5',
      description: 'Description for Item 5',
    },
    {
      id: 6,
      name: 'Item 6',
      description: 'Description for Item 6',
    },
    {
      id: 7,
      name: 'Item 7',
      description: 'Description for Item 7',
    },
    {
      id: 8,
      name: 'Item 8',
      description: 'Description for Item 8',
    },
    {
      id: 9,
      name: 'Item 9',
      description: 'Description for Item 9',
    },
    {
      id: 10,
      name: 'Item 10',
      description: 'Description for Item 10',
    },
    {
      id: 11,
      name: 'Item 11',
      description: 'Description for Item 11',
    },
    {
      id: 12,
      name: 'Item 12',
      description: 'Description for Item 12',
    },
    {
      id: 13,
      name: 'Item 13',
      description: 'Description for Item 13',
    },
    {
      id: 14,
      name: 'Item 14',
      description: 'Description for Item 14',
    },
    {
      id: 15,
      name: 'Item 15',
      description: 'Description for Item 15',
    },
    {
      id: 16,
      name: 'Item 16',
      description: 'Description for Item 16',
    },
    {
      id: 17,
      name: 'Item 17',
      description: 'Description for Item 17',
    },
    {
      id: 18,
      name: 'Item 18',
      description: 'Description for Item 18',
    },
    {
      id: 19,
      name: 'Item 19',
      description: 'Description for Item 19',
    },
    {
      id: 20,
      name: 'Item 20',
      description: 'Description for Item 20',
    }
  )

  getItems(): Array<DataItem> {
    return this.items
  }

  getItem(id: number): DataItem {
    return this.items.filter((item) => item.id === id)[0]
  }
}
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

Dans Search, essayer Ottawa, une valeur vide et une capitale inexistante. Vérifier aussi le message quand le réseau est coupé.

## Vérification effectuée

Capture des résultats locaux — Recherche · réponses du service simulées.

![Résultats de la vérification](images/verification.png)
