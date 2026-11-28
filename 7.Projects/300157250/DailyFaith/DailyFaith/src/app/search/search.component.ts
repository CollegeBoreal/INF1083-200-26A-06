
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import {
  Church,
  ChurchService
} from '../services/church.service';

import { AuthService } from '../services/auth.service';
import { ChurchImageService } from '../services/church-image.service';
import { NavigationComponent } from '../navigation/navigation.component';

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
export class SearchComponent {

  searchQuery = '';

  constructor(
    private router: RouterExtensions,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService
  ) {}

  get churches(): Church[] {

    return this.churchService.searchChurches(
      this.searchQuery
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

  getLogoPath(church: Church): string {

    return this.imageService.getImagePath(
      church.logo || ''
    );
  }

  isFollowing(church: Church): boolean {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return false;
    }

    return this.churchService.isFollowing(
      church.id,
      user.id
    );
  }

  viewChurch(church: Church) {

    this.router.navigate([
      '/church-profile',
      church.id
    ]);
  }
}
