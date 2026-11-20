import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular'
import { CoreTypes, View } from '@nativescript/core'
import { TNSPlayer } from '@nativescript-community/audio'
import { ApicallService } from '../shared/apicall.service'
import { Song } from '../shared/song'

@Component({
  selector: 'SongDetail',
  templateUrl: './song-detail.component.html',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SongDetailComponent implements OnDestroy {
  song: Song
  lyrics = ''
  lyricsMessage = ''
  loadingLyrics = false
  isFav = false

  player: TNSPlayer
  playing = false
  started = false
  previewMessage = ''

  favBtn: View

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

  // ---------- Animations ----------

  onArtworkLoaded(args: any) {
    const view = args.object as View
    view.opacity = 0
    view.scaleX = 0.7
    view.scaleY = 0.7
    view
      .animate({
        opacity: 1,
        scale: { x: 1, y: 1 },
        duration: 600,
        curve: CoreTypes.AnimationCurve.easeOut,
      })
      .catch(() => {})
  }

  onInfoLoaded(args: any) {
    const view = args.object as View
    view.opacity = 0
    view.translateY = 30
    view
      .animate({
        opacity: 1,
        translate: { x: 0, y: 0 },
        duration: 500,
        delay: 250,
        curve: CoreTypes.AnimationCurve.easeOut,
      })
      .catch(() => {})
  }

  onFavLoaded(args: any) {
    this.favBtn = args.object as View
  }

  pulseFav() {
    if (!this.favBtn) {
      return
    }
    this.favBtn
      .animate({ scale: { x: 1.15, y: 1.15 }, duration: 120 })
      .then(() => this.favBtn.animate({ scale: { x: 1, y: 1 }, duration: 120 }))
      .catch(() => {})
  }

  // ---------- Favoris ----------

  toggleFav() {
    if (!this.song) {
      return
    }
    this.isFav = this.apiService.toggleFavorite(this.song)
    this.pulseFav()
  }

  // ---------- Extrait audio ----------

  async togglePreview() {
    if (!this.song || !this.song.preview) {
      this.previewMessage = "Pas d'extrait disponible pour cette chanson"
      this.cd.detectChanges()
      return
    }

    try {
      this.previewMessage = ''
      if (!this.player) {
        this.player = new TNSPlayer()
      }

      if (this.playing) {
        await this.player.pause()
        this.playing = false
      } else if (this.started) {
        this.player.resume()
        this.playing = true
      } else {
        await this.player.playFromUrl({
          audioFile: this.song.preview,
          loop: false,
          completeCallback: () => {
            this.playing = false
            this.started = false
            this.cd.detectChanges()
          },
          errorCallback: (e: any) => {
            console.log('AUDIO ERROR', JSON.stringify(e))
            this.playing = false
            this.started = false
            this.previewMessage = "Impossible de lire l'extrait"
            this.cd.detectChanges()
          },
        })
        this.playing = true
        this.started = true
      }
    } catch (e) {
      console.log('AUDIO FAIL', e)
      this.playing = false
      this.previewMessage = "Impossible de lire l'extrait"
    }
    this.cd.detectChanges()
  }

  stopPreview() {
    if (this.player) {
      this.player.dispose().catch(() => {})
      this.player = null
    }
    this.playing = false
    this.started = false
  }

  // ---------- Paroles ----------

  loadLyrics() {
    if (!this.song) {
      return
    }
    this.loadingLyrics = true
    this.apiService.getLyrics(this.song.artist, this.song.title).subscribe({
      next: (text: string) => {
        this.lyrics = (text || '').trim()
        this.lyricsMessage = this.lyrics ? '' : 'Paroles introuvables'
        this.loadingLyrics = false
        this.cd.detectChanges()
      },
      error: (err) => {
        this.lyrics = ''
        this.lyricsMessage = String(err)
        this.loadingLyrics = false
        this.cd.detectChanges()
      },
    })
  }

  goBack() {
    this.stopPreview()
    this.router.back({ relativeTo: this.route })
  }

  ngOnDestroy() {
    this.stopPreview()
  }
}