import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert } from '@nativescript/core';

import {
  ChurchFirestoreService
} from '../../services/church-firestore.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ns-create-church',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './create-church.component.html',
  styleUrls: ['./create-church.component.css']
})
export class CreateChurchComponent {

  name = '';
  username = '';
  pastor = '';
  country = '';
  city = '';
  address = '';
  description = '';

  loading = false;

  constructor(
    private router: RouterExtensions,
    private churchService: ChurchFirestoreService,
    private authService: AuthService
  ) {}

  onNameChange(args: any) {
    this.name = args.object.text;
  }

  onUsernameChange(args: any) {
    this.username = args.object.text;
  }

  onPastorChange(args: any) {
    this.pastor = args.object.text;
  }

  onCountryChange(args: any) {
    this.country = args.object.text;
  }

  onCityChange(args: any) {
    this.city = args.object.text;
  }

  onAddressChange(args: any) {
    this.address = args.object.text;
  }

  onDescriptionChange(args: any) {
    this.description = args.object.text;
  }

  async createChurch() {

    if (this.loading) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      await alert('Accès réservé aux pasteurs.');
      return;
    }

    if (
      !this.name.trim() ||
      !this.username.trim() ||
      !this.pastor.trim() ||
      !this.country.trim() ||
      !this.city.trim()
    ) {
      await alert({
        title: 'Champs obligatoires',
        message: 'Veuillez remplir tous les champs obligatoires.',
        okButtonText: 'OK'
      });

      return;
    }

    this.loading = true;

    try {

      const churchId = await this.churchService.createChurch({
        name: this.name,
        username: this.username,
        pastor: this.pastor,
        country: this.country,
        city: this.city,
        address: this.address,
        description: this.description
      });

      console.log(
        'DAILY FAITH : Identifiant Firestore =',
        churchId
      );

      await alert({
        title: 'Félicitations !',
        message: `La page ${this.name} a été créée en ligne avec succès.`,
        okButtonText: 'Continuer'
      });

      await this.router.navigate(['/admin'], {
        clearHistory: true
      });

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur création église',
        error
      );

      await alert({
        title: 'Création impossible',
        message: 'Vérifiez les informations et votre connexion Internet.',
        okButtonText: 'OK'
      });

    } finally {

      this.loading = false;

    }
  }

  cancel() {

    if (this.loading) {
      return;
    }

    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }
}