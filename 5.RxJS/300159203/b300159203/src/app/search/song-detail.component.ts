import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular'
import { ApicallService } from '../shared/apicall.service'
import { Song } from '../shared/song'

@Component({
  selector: 'SongDetail',
  templateUrl: './song-detail.component.html',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SongDetailComponent {
  song: Song
  lyrics = ''
  lyricsMessage = ''
  loadingLyrics = false
  isFav = false

  constructor(
    private apiService: ApicallService,
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.song = this.apiService.selectedSong
    if (this.song) {
      this.isFav = this.apiService.isFavorite(this.song)
    }
    this.loadLyrics()
  }

  get bigArtwork(): string {
    return this.song ? this.song.artwork.replace('100x100', '600x600') : ''
  }

  toggleFav() {
    if (!this.song) {
      return
    }
    this.isFav = this.apiService.toggleFavorite(this.song)
  }

  loadLyrics() {
    if (!this.song) {
      return
    }
    console.log('LYRICS START', this.song.artist, this.song.title)
    this.loadingLyrics = true
    this.apiService.getLyrics(this.song.artist, this.song.title).subscribe({
      next: (text: string) => {
        console.log('LYRICS OK', (text || '').length)
        this.lyrics = (text || '').trim()
        this.lyricsMessage = this.lyrics ? '' : 'Paroles introuvables'
        this.loadingLyrics = false
        this.cd.detectChanges()
      },
      error: (err) => {
        console.log('LYRICS FAIL', err)
        this.lyrics = ''
        this.lyricsMessage = String(err)
        this.loadingLyrics = false
        this.cd.detectChanges()
      },
    })
  }

  goBack() {
    console.log('BACK')
    this.router.back({ relativeTo: this.route })
  }
}