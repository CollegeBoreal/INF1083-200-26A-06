import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { ApicallService } from '../shared/apicall.service'
import { Song } from '../shared/song'

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  standalone: false,
})
export class SearchComponent implements OnInit {
  term = ''
  songs: Array<Song> = []
  loading = false
  message = 'Tape un artiste ou un titre'

  constructor(
    private apiService: ApicallService,
    private router: RouterExtensions,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  searchSong() {
    const t = (this.term || '').trim()
    if (!t) {
      this.message = 'Tape un artiste ou un titre'
      return
    }

    this.loading = true
    this.message = ''

    this.apiService.searchSongByName(t).subscribe({
      next: (data: Song[]) => {
        console.log(data)
        this.songs = data
        this.loading = false
        if (data.length === 0) {
          this.message = 'Aucun résultat'
        }
      },
      error: (err) => {
        this.songs = []
        this.loading = false
        this.message = 'Erreur : ' + err
      },
    })
  }

  openSong(song: Song) {
    console.log('TAP', song.title)
    this.apiService.selectedSong = song
    this.router.navigate(['../detail'], { relativeTo: this.route })
  }
}