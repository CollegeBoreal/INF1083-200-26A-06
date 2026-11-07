import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ApicallService } from '../shared/apicall.service'
import { Song } from '../shared/song'

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  favorites: Array<Song> = []

  constructor(
    private apiService: ApicallService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.favorites = this.apiService.getFavorites()
    this.cd.detectChanges()
  }

  remove(song: Song) {
    this.apiService.toggleFavorite(song)
    this.refresh()
  }
}