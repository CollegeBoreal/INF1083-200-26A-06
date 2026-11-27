
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
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

    this.message = '';

    // Vérifier les champs
    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }

    // Vérifier le format de l'adresse email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email.trim())) {
      this.message = 'Veuillez saisir une adresse email valide.';
      return;
    }

    // Vérifier la longueur du mot de passe
    if (this.password.length < 6) {
      this.message = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }

    // Vérifier la confirmation du mot de passe
    if (this.password !== this.confirmPassword) {
      this.message = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // Créer le compte
    const success = this.authService.register(
      this.name,
      this.email,
      this.password
    );

    if (!success) {
      this.message = 'Cette adresse email est déjà utilisée.';
      return;
    }

    await alert({
      title: 'Inscription réussie',
      message: 'Bienvenue dans la communauté Daily Faith ! Vous pouvez maintenant vous connecter.',
      okButtonText: 'Se connecter'
    });

    this.router.navigate(['/login'], {
      clearHistory: true
    });
  }

  goToLogin() {
    this.router.navigate(['/login'], {
      clearHistory: true
    });
  }
}
