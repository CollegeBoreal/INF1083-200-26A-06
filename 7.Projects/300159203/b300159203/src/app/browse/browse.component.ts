import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
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
    private cd: ChangeDetectorRef,
    private router: RouterExtensions,
    private route: ActivatedRoute
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

  openSong(song: Song) {
    console.log('TAP FAVORIS', song.title)
    this.apiService.selectedSong = song
    this.router.navigate(['../detail'], { relativeTo: this.route })
  }
}