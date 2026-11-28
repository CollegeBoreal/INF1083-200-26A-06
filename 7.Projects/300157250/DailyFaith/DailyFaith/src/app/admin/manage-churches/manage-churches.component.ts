
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import {
  Church,
  ChurchService
} from '../../services/church.service';

import { AuthService } from '../../services/auth.service';
import { ChurchImageService } from '../../services/church-image.service';

@Component({
  selector: 'ns-manage-churches',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './manage-churches.component.html',
  styleUrls: ['./manage-churches.component.css']
})
export class ManageChurchesComponent {

  constructor(
    private router: RouterExtensions,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService
  ) {}

  get churches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return [];
    }

    return this.churchService.getPastorChurches(user.id);
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

  getLogoPath(church: Church): string {
    return this.imageService.getImagePath(church.logo || '');
  }

  getCoverPath(church: Church): string {
    return this.imageService.getImagePath(church.cover || '');
  }

  // Voir le profil public

  viewChurchProfile(church: Church) {

    this.router.navigate([
      '/church-profile',
      church.id
    ]);
  }

  createChurch() {
    this.router.navigate(['/create-church']);
  }

  editChurch(church: Church) {

    const user = this.authService.getCurrentUser();

    if (
      !user ||
      !this.authService.isAdmin() ||
      church.ownerId !== user.id
    ) {
      return;
    }

    this.router.navigate(['/edit-church', church.id]);
  }

  goBack() {

    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }
}
