
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  NativeScriptRouterModule
} from '@nativescript/angular';

import { TextField } from '@nativescript/core';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {

  showPassword: boolean = false;

  message: string = '';
  messageColor: string = '#16A34A';

  // Afficher ou masquer le mot de passe
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Afficher un message d'erreur
  showError(text: string) {
    this.message = text;
    this.messageColor = '#EF4444';
  }

  // Validation du formulaire
  onSignUp(
    emailField: any,
    usernameField: any,
    passwordField: any,
    confirmPasswordField: any
  ) {

    const email = (emailField.text || '').trim();
    const username = (usernameField.text || '').trim();
    const password = passwordField.text || '';
    const confirmPassword = confirmPasswordField.text || '';

    // Vérification de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      this.showError('Please enter a valid email address.');
      return;
    }

    // Vérification du username
    if (username.length < 3) {
      this.showError('Username must have at least 3 characters.');
      return;
    }

    // Vérification du mot de passe
    if (password.length < 6) {
      this.showError('Password must have at least 6 characters.');
      return;
    }

    // Confirmation du mot de passe
    if (password !== confirmPassword) {
      this.showError('Passwords do not match.');
      return;
    }

    // Succès
    this.message = 'Account created successfully!';
    this.messageColor = '#16A34A';

    console.log('Email : ' + email);
    console.log('Username : ' + username);

    // Ne jamais afficher les mots de passe dans la console
  }

  // Réinitialiser les champs
  onReset(
    emailField: any,
    usernameField: any,
    passwordField: any,
    confirmPasswordField: any
  ) {

    emailField.text = '';
    usernameField.text = '';
    passwordField.text = '';
    confirmPasswordField.text = '';

    this.showPassword = false;
    this.message = '';

    console.log('Form reset successfully.');
  }

}
