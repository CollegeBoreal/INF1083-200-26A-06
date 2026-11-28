import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert } from '@nativescript/core';

import { MessageService } from '../../services/message.service';
import { NotificationService } from '../../services/notification.service';
import { Church, ChurchService } from '../../services/church.service';
import { AuthService } from '../../services/auth.service';
import { ChurchImageService } from '../../services/church-image.service';

@Component({

  selector: 'ns-publish-message',

  standalone: true,

  imports: [NativeScriptCommonModule],

  schemas: [NO_ERRORS_SCHEMA],

  templateUrl: './publish-message.component.html',

  styleUrls: ['./publish-message.component.css']

})

export class PublishMessageComponent {

  title = '';
  verse = '';
  content = '';

  selectedChurchId: number | null = null;

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private notificationService: NotificationService
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

  onVerseChange(args: any) {

    this.verse = args.object.text || '';

  }

  onContentChange(args: any) {

    this.content = args.object.text || '';

  }

  async publish() {

    const church = this.selectedChurch;

    if (!church) {

      await alert('Veuillez sélectionner une église.');

      return;

    }

    if (
      !this.title.trim() ||
      !this.verse.trim() ||
      !this.content.trim()
    ) {

      await alert('Veuillez remplir tous les champs.');

      return;

    }

    const published = this.messageService.addMessage(
      this.title,
      this.verse,
      this.content,
      church.id
    );

    if (!published) {

      await alert('Impossible de publier ce message.');

      return;

    }

    // Notification automatique

    const notified = this.notificationService.addNotification(
      'Nouveau message biblique',
      `${this.title}\n${this.verse}`,
      church.id,
      'message'
    );

    await alert({

      title: 'Publication réussie',

      message: notified
        ? `Votre message a été publié sur la page de ${church.name}. Une notification interne a été créée pour les abonnés concernés.`
        : `Votre message a été publié, mais la notification n'a pas pu être créée.`,

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