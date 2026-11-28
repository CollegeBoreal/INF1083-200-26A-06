
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ns-profile',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  constructor(
    private router: RouterExtensions,
    private authService: AuthService
  ) {}

    // Récupérer les informations du membre connecté
  get user() {

    const currentUser = this.authService.getCurrentUser();

    return {
      name: currentUser?.name || 'Non connecté',
      email: currentUser?.email || '',
      role: currentUser
        ? (currentUser.role === 'admin' ? 'Pasteur' : 'Membre')
        : 'Invité'
    };
  }

  // Déconnexion Firebase
  async logout() {

    try {

      await this.authService.logout();

      await this.router.navigate(['/login'], {
        clearHistory: true
      });

    } catch (error) {

      console.error(
        'Erreur de déconnexion Firebase',
        error
      );
    }
  }
}