import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { HomeComponent } from './home.component'
import { ItemDetailComponent } from './item-detail/item-detail.component'
import { SongDetailComponent } from '../search/song-detail.component'

const routes: Routes = [
  { path: 'default', component: HomeComponent },
  { path: 'detail', component: SongDetailComponent },
  { path: 'item/:id', component: ItemDetailComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class HomeRoutingModule {}