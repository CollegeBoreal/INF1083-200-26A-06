
import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert } from '@nativescript/core';

import { ChurchService } from '../../services/church.service';
import { AuthService } from '../../services/auth.service';
import { ChurchImageService } from '../../services/church-image.service';

@Component({
  selector: 'ns-edit-church',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './edit-church.component.html',
  styleUrls: ['./edit-church.component.css']
})
export class EditChurchComponent implements OnInit {

  churchId = 0;

  name = '';
  username = '';
  pastor = '';
  country = '';
  city = '';
  address = '';
  description = '';

  logo = '';
  cover = '';

  authorized = false;
  selectingImage = false;

  constructor(
    private route: ActivatedRoute,
    private router: RouterExtensions,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.churchId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const user = this.authService.getCurrentUser();

    const church = this.churchService.getChurchById(
      this.churchId
    );

    if (
      !user ||
      !this.authService.isAdmin() ||
      !church ||
      church.ownerId !== user.id
    ) {
      return;
    }

    this.authorized = true;

    this.name = church.name;
    this.username = church.username;
    this.pastor = church.pastor;
    this.country = church.country;
    this.city = church.city;
    this.address = church.address;
    this.description = church.description;

    this.logo = church.logo || '';
    this.cover = church.cover || '';
  }

  // Chemin du logo
  get logoPath(): string {
    return this.imageService.getImagePath(this.logo);
  }

  // Chemin de la couverture
  get coverPath(): string {
    return this.imageService.getImagePath(this.cover);
  }

  // Sélectionner un logo
  async selectLogo() {
    await this.selectPhoto('logo');
  }

  // Sélectionner une couverture
  async selectCover() {
    await this.selectPhoto('cover');
  }

  private async selectPhoto(type: 'logo' | 'cover') {

    if (!this.authorized || this.selectingImage) {
      return;
    }

    this.selectingImage = true;

    try {

      const image = await this.imageService.selectImage(
        this.churchId,
        type
      );

      if (image) {

        if (type === 'logo') {
          this.logo = image;
        } else {
          this.cover = image;
        }
      }

    } finally {

      this.selectingImage = false;
      this.cdr.markForCheck();
    }
  }

  removeLogo() {
    this.logo = '';
  }

  removeCover() {
    this.cover = '';
  }

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

  async saveChanges() {

    if (this.selectingImage) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (
      !user ||
      !this.authorized ||
      !this.authService.isAdmin()
    ) {
      await alert('Accès non autorisé.');
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

    const updated = this.churchService.updateChurch(
      this.churchId,
      user.id,
      this.name,
      this.username,
      this.pastor,
      this.country,
      this.city,
      this.address,
      this.description,
      this.logo,
      this.cover
    );

    if (!updated) {

      await alert({
        title: 'Modification impossible',
        message: 'Identifiant invalide, déjà utilisé ou accès non autorisé.',
        okButtonText: 'OK'
      });

      return;
    }

    await alert({
      title: 'Profil mis à jour',
      message: 'Les modifications ont été enregistrées avec succès.',
      okButtonText: 'Continuer'
    });

    this.goBack();
  }

  goBack() {

    if (this.selectingImage) {
      return;
    }

    this.router.navigate(['/manage-churches'], {
      clearHistory: true
    });
  }
}
