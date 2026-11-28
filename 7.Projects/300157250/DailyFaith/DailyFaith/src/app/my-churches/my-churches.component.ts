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

import { confirm, alert } from '@nativescript/core';

import {
  Church,
  ChurchService
} from '../services/church.service';

import {
  FirestoreChurch,
  ChurchFirestoreService
} from '../services/church-firestore.service';

import { AuthService } from '../services/auth.service';
import { ChurchImageService } from '../services/church-image.service';
import { NavigationComponent } from '../navigation/navigation.component';

interface FollowedChurch {
  id: number | string;
  name: string;
  username: string;
  pastor: string;
  city: string;
  country: string;
  description: string;
  logo: string;
  cover: string;
  followers: number[];
  online: boolean;
}

@Component({
  selector: 'ns-my-churches',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './my-churches.component.html',
  styleUrls: ['./my-churches.component.css']
})
export class MyChurchesComponent implements OnInit {

  churches: FollowedChurch[] = [];

  loading = false;
  saving = false;
  errorMessage = '';

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

      this.churches = [];

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const localChurches: FollowedChurch[] =
      this.churchService
        .getFollowedChurches(user.id)
        .map((church: Church) => ({
          ...church,
          online: false
        }));

    this.churches = localChurches;

    this.cdr.markForCheck();

    try {

      const firebaseChurches =
        await this.firestoreService.getFollowedChurches();

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      const onlineChurches: FollowedChurch[] =
        firebaseChurches.map((church: FirestoreChurch) => ({
          ...church,
          followers: [],
          online: true
        }));

      this.churches = [
        ...onlineChurches,
        ...localChurches
      ];

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur mes abonnements',
        error
      );

      this.errorMessage =
        'Impossible de charger vos abonnements en ligne.';

    } finally {

      this.loading = false;
      this.cdr.markForCheck();

    }
  }

  get totalChurches(): number {

    return this.churches.length;
  }

  getLogoPath(church: FollowedChurch): string {

    return church.online
      ? church.logo || ''
      : this.imageService.getImagePath(church.logo || '');
  }

  getCoverPath(church: FollowedChurch): string {

    return church.online
      ? church.cover || ''
      : this.imageService.getImagePath(church.cover || '');
  }

  viewChurch(church: FollowedChurch) {

    this.router.navigate(
      ['/church-profile', church.id],
      {
        queryParams: {
          source: church.online ? 'firebase' : 'local'
        }
      }
    );
  }

  async unfollowChurch(church: FollowedChurch) {

    if (this.saving || this.loading) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {
      return;
    }

    this.saving = true;
    this.cdr.markForCheck();

    try {

      const accepted = await confirm({
        title: 'Se désabonner',
        message: `Voulez-vous vous désabonner de ${church.name} ?`,
        okButtonText: 'Se désabonner',
        cancelButtonText: 'Annuler'
      });

      if (!accepted) {
        return;
      }

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      if (church.online) {

        await this.firestoreService.unfollowChurch(
          String(church.id)
        );

      } else if (typeof church.id === 'number') {

        this.churchService.unfollowChurch(
          church.id,
          user.id
        );

      }

      this.churches = this.churches.filter(item =>
        item.id !== church.id ||
        item.online !== church.online
      );

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur désabonnement',
        error
      );

      await alert({
        title: 'Erreur',
        message: 'Impossible de supprimer cet abonnement.',
        okButtonText: 'OK'
      });

    } finally {

      this.saving = false;
      this.cdr.markForCheck();

    }
  }

  discoverChurches() {

    this.router.navigate(['/search'], {
      clearHistory: true
    });
  }
}