import {
  Component,
  NO_ERRORS_SCHEMA
} from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ns-login',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;

  constructor(
    private router: RouterExtensions,
    private authService: AuthService
  ) {}

  onEmailChange(args: any) {
    this.email = args.object.text;
  }

  onPasswordChange(args: any) {
    this.password = args.object.text;
  }

  async login() {

    if (this.loading) {
      return;
    }

    const email = this.email.trim().toLowerCase();

    if (!email || !this.password) {

      await alert(
        'Veuillez remplir tous les champs.'
      );

      return;
    }

    this.loading = true;

    try {

      const success = await this.authService.login(
        email,
        this.password
      );

      if (!success) {

        await alert({
          title: 'Connexion impossible',
          message:
            'Vérifiez vos identifiants, votre connexion Internet et votre profil.',
          okButtonText: 'OK'
        });

        return;
      }

      this.password = '';

      if (this.authService.isAdmin()) {

        await this.router.navigate(['/admin'], {
          clearHistory: true
        });

      } else {

        await this.router.navigate(['/home'], {
          clearHistory: true
        });
      }

    } finally {

      this.loading = false;
    }
  }

  goToRegister() {

    if (!this.loading) {
      this.router.navigate(['/register']);
    }
  }
}