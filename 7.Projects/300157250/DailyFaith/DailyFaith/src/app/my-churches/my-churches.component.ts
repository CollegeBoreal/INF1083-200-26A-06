import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { confirm } from '@nativescript/core';

import { Church, ChurchService } from '../services/church.service';
import { AuthService } from '../services/auth.service';
import { ChurchImageService } from '../services/church-image.service';
import { NavigationComponent } from '../navigation/navigation.component';

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

export class MyChurchesComponent {

  constructor(
    private router: RouterExtensions,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService
  ) {}

  get churches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return [];
    }

    return this.churchService.getFollowedChurches(user.id);
  }

  get totalChurches(): number {
    return this.churches.length;
  }

  getLogoPath(church: Church): string {
    return this.imageService.getImagePath(church.logo);
  }

  getCoverPath(church: Church): string {
    return this.imageService.getImagePath(church.cover);
  }

  viewChurch(church: Church) {

    this.router.navigate(['/church-profile', church.id]);

  }

  async unfollowChurch(church: Church) {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    const accepted = await confirm({
      title: 'Se désabonner',
      message: `Voulez-vous vous désabonner de ${church.name} ?`,
      okButtonText: 'Se désabonner',
      cancelButtonText: 'Annuler'
    });

    if (accepted) {

      this.churchService.unfollowChurch(
        church.id,
        user.id
      );

    }
  }

  discoverChurches() {

    this.router.navigate(['/search'], {
      clearHistory: true
    });

  }

}