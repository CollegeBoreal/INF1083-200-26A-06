
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert } from '@nativescript/core';
import { ChurchService } from '../../services/church.service';
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

  constructor(
    private router: RouterExtensions,
    private churchService: ChurchService,
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

    const church = this.churchService.createChurch(
      user.id,
      this.name,
      this.username,
      this.pastor,
      this.country,
      this.city,
      this.address,
      this.description
    );

    if (!church) {
      await alert({
        title: 'Création impossible',
        message: 'Cet identifiant est déjà utilisé ou invalide.',
        okButtonText: 'OK'
      });
      return;
    }

    await alert({
      title: 'Félicitations !',
      message: `La page ${church.name} a été créée avec succès.`,
      okButtonText: 'Continuer'
    });

    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }

  cancel() {
    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }
}
