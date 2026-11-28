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
  selector: 'ns-register',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  message = '';
  loading = false;

  constructor(
    private router: RouterExtensions,
    private authService: AuthService
  ) {}

  onNameChange(args: any) {
    this.name = args.object.text;
  }

  onEmailChange(args: any) {
    this.email = args.object.text;
  }

  onPasswordChange(args: any) {
    this.password = args.object.text;
  }

  onConfirmPasswordChange(args: any) {
    this.confirmPassword = args.object.text;
  }

  async register() {

    if (this.loading) {
      return;
    }

    this.message = '';

    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {

      this.message =
        'Veuillez remplir tous les champs.';

      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email.trim())) {

      this.message =
        'Veuillez saisir une adresse email valide.';

      return;
    }

    if (this.password.length < 6) {

      this.message =
        'Le mot de passe doit contenir au moins 6 caractères.';

      return;
    }

    if (this.password !== this.confirmPassword) {

      this.message =
        'Les mots de passe ne correspondent pas.';

      return;
    }

    this.loading = true;

    try {

      const success = await this.authService.register(
        this.name,
        this.email,
        this.password
      );

      if (!success) {

        this.message =
          'Inscription impossible. Vérifiez votre adresse email et votre connexion Internet.';

        await alert(this.message);

        return;
      }

      this.password = '';
      this.confirmPassword = '';

      await alert({
        title: 'Inscription réussie',
        message:
          'Bienvenue dans la communauté Daily Faith ! Vous pouvez maintenant vous connecter.',
        okButtonText: 'Se connecter'
      });

      await this.router.navigate(['/login'], {
        clearHistory: true
      });

    } finally {

      this.loading = false;
    }
  }

  goToLogin() {

    if (!this.loading) {

      this.router.navigate(['/login'], {
        clearHistory: true
      });
    }
  }
}