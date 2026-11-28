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

import {
  ChurchFirestoreService
} from '../../services/church-firestore.service';

import { AuthService } from '../../services/auth.service';

import {
  ChurchImageService
} from '../../services/church-image.service';

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
  firestoreId = '';

  online = false;
  loading = true;
  saving = false;
  errorMessage = '';

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
    private firestoreService: ChurchFirestoreService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id') || '';

    const user = this.authService.getCurrentUser();

    this.online =
      this.route.snapshot.queryParamMap.get('source') === 'firebase';

    try {

      if (!user || !this.authService.isAdmin()) {
        return;
      }

      if (this.online) {

        this.firestoreId = id;

        const church =
          await this.firestoreService.getChurchById(id);

        if (
          !church ||
          church.ownerUid !== user.uid ||
          this.authService.getCurrentUser()?.uid !== user.uid
        ) {
          return;
        }

        this.loadFields(church);

      } else {

        this.churchId = Number(id);

        const church =
          this.churchService.getChurchById(this.churchId);

        if (!church || church.ownerId !== user.id) {
          return;
        }

        this.loadFields(church);
      }

      this.authorized = true;

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur chargement du profil',
        error
      );

      this.errorMessage =
        'Impossible de charger le profil de cette église.';

    } finally {

      this.loading = false;
      this.cdr.markForCheck();

    }
  }

  private loadFields(church: {
    name: string;
    username: string;
    pastor: string;
    country: string;
    city: string;
    address: string;
    description: string;
    logo: string;
    cover: string;
  }) {

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

  get logoPath(): string {

    return this.online
      ? this.logo
      : this.imageService.getImagePath(this.logo);
  }

  get coverPath(): string {

    return this.online
      ? this.cover
      : this.imageService.getImagePath(this.cover);
  }

  async selectLogo() {
    await this.selectPhoto('logo');
  }

  async selectCover() {
    await this.selectPhoto('cover');
  }

  private async selectPhoto(type: 'logo' | 'cover') {

    if (
      !this.authorized ||
      this.selectingImage ||
      this.saving ||
      this.online
    ) {
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
    if (!this.online && !this.saving) {
      this.logo = '';
    }
  }

  removeCover() {
    if (!this.online && !this.saving) {
      this.cover = '';
    }
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

    if (this.selectingImage || this.saving) {
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

    this.saving = true;
    this.cdr.markForCheck();

    try {

      let updated = false;

      if (this.online) {

        updated = await this.firestoreService.updateChurch(
          this.firestoreId,
          {
            name: this.name,
            username: this.username,
            pastor: this.pastor,
            country: this.country,
            city: this.city,
            address: this.address,
            description: this.description
          }
        );

      } else {

        updated = this.churchService.updateChurch(
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

      }

      if (!updated) {
        throw new Error(
          'Identifiant invalide, déjà utilisé ou accès non autorisé.'
        );
      }

      await alert({
        title: 'Profil mis à jour',
        message: this.online
          ? 'Les modifications ont été enregistrées dans Firebase.'
          : 'Les modifications ont été enregistrées localement.',
        okButtonText: 'Continuer'
      });

      await this.router.navigate(['/manage-churches'], {
        clearHistory: true
      });

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur modification église',
        error
      );

      await alert({
        title: 'Modification impossible',
        message: error instanceof Error
          ? error.message
          : 'Vérifiez votre connexion Internet.',
        okButtonText: 'OK'
      });

    } finally {

      this.saving = false;
      this.cdr.markForCheck();

    }
  }

  goBack() {

    if (this.selectingImage || this.saving) {
      return;
    }

    this.router.navigate(['/manage-churches'], {
      clearHistory: true
    });
  }
}