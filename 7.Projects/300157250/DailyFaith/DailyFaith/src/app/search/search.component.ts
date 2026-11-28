import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import {
  Church,
  ChurchService
} from '../services/church.service';

import {
  ChurchFirestoreService,
  FirestoreChurch
} from '../services/church-firestore.service';

import { AuthService } from '../services/auth.service';
import { ChurchImageService } from '../services/church-image.service';
import { NavigationComponent } from '../navigation/navigation.component';

interface SearchChurch {
  id: number | string;
  name: string;
  username: string;
  pastor: string;
  country: string;
  city: string;
  description: string;
  logo: string;
  followers: number[];
  online: boolean;
}

@Component({
  selector: 'ns-search',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery = '';
  loading = false;
  errorMessage = '';

  allChurches: SearchChurch[] = [];

  followedOnlineIds = new Set<string>();

  constructor(
    private router: RouterExtensions,
    private churchService: ChurchService,
    private firestoreService: ChurchFirestoreService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    await this.loadChurches();
  }

  async loadChurches() {

    if (this.loading) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {

      this.allChurches = [];
      this.followedOnlineIds.clear();

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.followedOnlineIds.clear();

    const localChurches: SearchChurch[] =
      this.churchService.getChurches()
        .map((church: Church) => ({
          ...church,
          online: false
        }));

    this.allChurches = localChurches;

    this.cdr.markForCheck();

    try {

      const firebaseChurches =
        await this.firestoreService.getChurches();

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      const onlineChurches: SearchChurch[] =
        firebaseChurches.map((church: FirestoreChurch) => ({
          ...church,
          followers: [],
          online: true
        }));

      this.allChurches = [
        ...onlineChurches,
        ...localChurches
      ];

      console.log(
        'DAILY FAITH : Recherche Firebase chargée =',
        onlineChurches.length
      );

      const followed =
        await this.firestoreService.getFollowedChurches(
          firebaseChurches
        );

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      this.followedOnlineIds = new Set(
        followed.map(church => church.id)
      );

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur recherche Firebase',
        error
      );

      this.errorMessage =
        'Impossible de charger toutes les informations en ligne.';

    } finally {

      this.loading = false;
      this.cdr.markForCheck();

    }
  }

  private normalize(value: string): string {

    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/^@/, '');
  }

  get churches(): SearchChurch[] {

    const query = this.normalize(this.searchQuery);

    return this.allChurches.filter(church =>
      [
        church.name,
        church.username,
        church.pastor,
        church.city,
        church.country
      ].some(value =>
        this.normalize(value).includes(query)
      )
    );
  }

  get totalResults(): number {

    return this.churches.length;
  }

  onSearchChange(args: any) {

    this.searchQuery = args.object.text || '';
  }

  clearSearch() {

    this.searchQuery = '';
  }

  getLogoPath(church: SearchChurch): string {

    return church.online
      ? church.logo || ''
      : this.imageService.getImagePath(church.logo || '');
  }

  isFollowing(church: SearchChurch): boolean {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return false;
    }

    if (church.online) {

      return this.followedOnlineIds.has(
        String(church.id)
      );

    }

    if (typeof church.id !== 'number') {
      return false;
    }

    return this.churchService.isFollowing(
      church.id,
      user.id
    );
  }

  viewChurch(church: SearchChurch) {

    this.router.navigate(
      ['/church-profile', church.id],
      {
        queryParams: {
          source: church.online ? 'firebase' : 'local'
        }
      }
    );
  }
}