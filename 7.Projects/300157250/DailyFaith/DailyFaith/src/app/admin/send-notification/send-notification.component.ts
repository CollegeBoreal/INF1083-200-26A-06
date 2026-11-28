import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert, confirm } from '@nativescript/core';

import { NotificationService } from '../../services/notification.service';
import { Church, ChurchService } from '../../services/church.service';
import { AuthService } from '../../services/auth.service';
import { ChurchImageService } from '../../services/church-image.service';

@Component({

  selector: 'ns-send-notification',

  standalone: true,

  imports: [NativeScriptCommonModule],

  schemas: [NO_ERRORS_SCHEMA],

  templateUrl: './send-notification.component.html',

  styleUrls: ['./send-notification.component.css']

})

export class SendNotificationComponent {

  title = '';
  content = '';

  selectedChurchId: number | null = null;

  constructor(
    private router: RouterExtensions,
    private notificationService: NotificationService,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService
  ) {

    if (this.churches.length === 1) {

      this.selectedChurchId = this.churches[0].id;

    }

  }

  get churches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return [];
    }

    return this.churchService.getPastorChurches(user.id);

  }

  get selectedChurch(): Church | undefined {

    return this.churches.find(
      church => church.id === this.selectedChurchId
    );

  }

  get recipientsCount(): number {

    const church = this.selectedChurch;

    if (!church) {
      return 0;
    }

    return church.followers.filter(userId =>

      this.notificationService.areNotificationsEnabled(
        church.id,
        userId
      )

    ).length;

  }

  selectChurch(church: Church) {

    this.selectedChurchId = church.id;

  }

  getLogoPath(church: Church): string {

    return this.imageService.getImagePath(
      church.logo || ''
    );

  }

  onTitleChange(args: any) {

    this.title = args.object.text || '';

  }

  onContentChange(args: any) {

    this.content = args.object.text || '';

  }

  async sendNotification() {

    const church = this.selectedChurch;

    if (!church) {

      await alert('Veuillez sélectionner une église.');

      return;

    }

    if (!this.title.trim() || !this.content.trim()) {

      await alert('Veuillez remplir tous les champs.');

      return;

    }

    if (this.recipientsCount === 0) {

      await alert('Aucun abonné ne peut recevoir cette notification actuellement.');

      return;

    }

    const result = await confirm({

      title: 'Envoyer la notification',

      message: `Envoyer cette annonce aux ${this.recipientsCount} destinataire(s) de ${church.name} ?`,

      okButtonText: 'Envoyer',

      cancelButtonText: 'Annuler'

    });

    if (!result) {
      return;
    }

    const success = this.notificationService.addNotification(

      this.title,

      this.content,

      church.id,

      'announcement'

    );

    if (!success) {

      await alert('Impossible de publier cette notification.');

      return;

    }

    await alert({

      title: 'Notification publiée',

      message: `Votre annonce est disponible pour les abonnés concernés de ${church.name}.`,

      okButtonText: 'OK'

    });

    this.router.navigate(['/admin'], {
      clearHistory: true
    });

  }

  createChurch() {

    this.router.navigate(['/create-church']);

  }

  cancel() {

    this.router.navigate(['/admin'], {
      clearHistory: true
    });

  }

}