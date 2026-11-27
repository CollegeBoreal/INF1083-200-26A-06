
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
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

  login() {

    const email = this.email.trim().toLowerCase();

    if (!email || !this.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Vérifier les identifiants
    const success = this.authService.login(
      email,
      this.password
    );

    if (!success) {
      alert('Adresse email ou mot de passe incorrect.');
      return;
    }

    // Connexion du pasteur
    if (this.authService.isAdmin()) {

      this.router.navigate(['/admin'], {
        clearHistory: true
      });

    } else {

      // Connexion du membre
      this.router.navigate(['/home'], {
        clearHistory: true
      });

    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
