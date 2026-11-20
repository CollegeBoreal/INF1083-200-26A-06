import { ChangeDetectorRef, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { CoreTypes, View } from '@nativescript/core'
import { ApicallService } from '../shared/apicall.service'
import { Song } from '../shared/song'

interface Genre {
  name: string
  emoji: string
  color: string
  query: string
}

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  genres: Array<Genre> = [
    { name: 'Rap', emoji: '🎤', color: '#e8115b', query: 'hip hop rap' },
    { name: 'Metal', emoji: '🤘', color: '#4b4b4b', query: 'heavy metal' },
    { name: 'Rock', emoji: '🎸', color: '#e13300', query: 'rock classics' },
    { name: 'Pop', emoji: '🎵', color: '#8d67ab', query: 'pop hits' },
    { name: 'Jazz', emoji: '🎷', color: '#1e3264', query: 'jazz' },
    { name: 'Électro', emoji: '🎧', color: '#0d73ec', query: 'electronic dance' },
    { name: 'Reggae', emoji: '🌴', color: '#148a08', query: 'reggae' },
    { name: 'Classique', emoji: '🎻', color: '#b49bc8', query: 'classical piano' },
  ]

  selected: Genre = null
  songs: Array<Song> = []
  loading = false
  message = ''

  constructor(
    private apiService: ApicallService,
    private cd: ChangeDetectorRef,
    private router: RouterExtensions,
    private route: ActivatedRoute
  ) {}

  // ---------- Animation : les cartes apparaissent l'une après l'autre ----------

  onCardLoaded(args: any, genre: Genre) {
    const view = args.object as View
    const index = this.genres.indexOf(genre)
    console.log('CARD LOADED', index)

    view.opacity = 0
    view.translateY = 120

    setTimeout(() => {
      view
        .animate({
          opacity: 1,
          translate: { x: 0, y: 0 },
          duration: 600,
          delay: index * 150,
          curve: CoreTypes.AnimationCurve.easeOut,
        })
        .catch((e) => console.log('CARD ANIM ERROR', e))
    }, 50)
  }

  // ---------- Genres ----------

  openGenre(genre: Genre) {
    this.selected = genre
    this.songs = []
    this.message = ''
    this.loading = true

    this.apiService.searchSongByName(genre.query).subscribe({
      next: (data: Song[]) => {
        this.songs = data
        this.loading = false
        if (data.length === 0) {
          this.message = 'Aucun résultat'
        }
        this.cd.detectChanges()
      },
      error: (err) => {
        this.loading = false
        this.message = 'Erreur : ' + err
        this.cd.detectChanges()
      },
    })
  }

  backToGenres() {
    this.selected = null
    this.songs = []
    this.message = ''
    this.loading = false
  }

  openSong(song: Song) {
    console.log('TAP HOME', song.title)
    this.apiService.selectedSong = song
    this.router.navigate(['../detail'], { relativeTo: this.route })
  }
}