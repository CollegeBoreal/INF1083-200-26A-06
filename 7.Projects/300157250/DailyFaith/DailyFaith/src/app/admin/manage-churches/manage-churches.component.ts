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

import { alert } from '@nativescript/core';

import {
  Church,
  ChurchService
} from '../../services/church.service';

import {
  FirestoreChurch,
  ChurchFirestoreService
} from '../../services/church-firestore.service';

import { AuthService } from '../../services/auth.service';

import {
  ChurchImageService
} from '../../services/church-image.service';

interface ChurchView {
  id: number | string;
  name: string;
  username: string;
  pastor: string;
  country: string;
  city: string;
  address: string;
  description: string;
  logo: string;
  cover: string;
  followers: number[];
  online: boolean;
  ownerId?: number;
  ownerUid?: string;
}

@Component({
  selector: 'ns-manage-churches',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './manage-churches.component.html',
  styleUrls: ['./manage-churches.component.css']
})
export class ManageChurchesComponent implements OnInit {

  churches: ChurchView[] = [];

  loading = false;
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

    if (!user || !this.authService.isAdmin()) {
      this.churches = [];
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // Conserver les anciennes églises locales

    const localChurches: ChurchView[] =
      this.churchService
        .getPastorChurches(user.id)
        .map((church: Church) => ({
          ...church,
          online: false
        }));

    this.churches = localChurches;

    try {

      // Charger les églises Firebase

      const firebaseChurches =
        await this.firestoreService.getPastorChurches();

      const onlineChurches: ChurchView[] =
        firebaseChurches.map((church: FirestoreChurch) => ({
          ...church,
          followers: [],
          online: true
        }));

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      this.churches = [
        ...onlineChurches,
        ...localChurches
      ];

      console.log(
        'DAILY FAITH : Églises Firebase chargées =',
        onlineChurches.length
      );

      console.log(
        'DAILY FAITH : Églises locales chargées =',
        localChurches.length
      );

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur chargement des églises',
        error
      );

      this.errorMessage =
        'Impossible de charger les églises en ligne.';

    } finally {

      this.loading = false;
      this.cdr.markForCheck();

    }
  }

  get totalChurches(): number {
    return this.churches.length;
  }

  get totalFollowers(): number {

    return this.churches.reduce(
      (total, church) => total + church.followers.length,
      0
    );
  }

  getLogoPath(church: ChurchView): string {

    if (church.online) {
      return church.logo || '';
    }

    return this.imageService.getImagePath(
      church.logo || ''
    );
  }

  getCoverPath(church: ChurchView): string {

    if (church.online) {
      return church.cover || '';
    }

    return this.imageService.getImagePath(
      church.cover || ''
    );
  }

  async viewChurchProfile(church: ChurchView) {

  await this.router.navigate(
    ['/church-profile', church.id],
    {
      queryParams: {
        source: church.online ? 'firebase' : 'local'
      }
    }
  );
}

  createChurch() {
    this.router.navigate(['/create-church']);
  }

  async editChurch(church: ChurchView) {

  const user = this.authService.getCurrentUser();

  if (!user || !this.authService.isAdmin()) {
    return;
  }

  if (church.online) {

    if (church.ownerUid !== user.uid) {
      return;
    }

    await this.router.navigate(
      ['/edit-church', church.id],
      {
        queryParams: {
          source: 'firebase'
        }
      }
    );

    return;
  }

  if (church.ownerId !== user.id) {
    return;
  }

  await this.router.navigate([
    '/edit-church',
    church.id
  ]);
}

  goBack() {

    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }
}