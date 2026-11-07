import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SearchComponent } from './search.component'
import { SongDetailComponent } from './song-detail.component'

const routes: Routes = [
  { path: 'default', component: SearchComponent },
  { path: 'detail', component: SongDetailComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SearchRoutingModule {}