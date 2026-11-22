import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { BrowseComponent } from './browse.component'
import { SongDetailComponent } from '../search/song-detail.component'

const routes: Routes = [
  { path: 'default', component: BrowseComponent },
  { path: 'detail', component: SongDetailComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class BrowseRoutingModule {}