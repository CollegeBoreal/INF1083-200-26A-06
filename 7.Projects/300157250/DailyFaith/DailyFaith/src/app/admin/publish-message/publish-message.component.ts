
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';
import { alert } from '@nativescript/core';
import { MessageService } from '../../services/message.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'ns-publish-message',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './publish-message.component.html',
  styleUrls: ['./publish-message.component.css'],
})
export class PublishMessageComponent {

  title = '';
  verse = '';
  content = '';

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {}

  onTitleChange(args: any) {
    this.title = args.object.text;
  }

  onVerseChange(args: any) {
    this.verse = args.object.text;
  }

  onContentChange(args: any) {
    this.content = args.object.text;
  }

  async publish() {

    if (
      !this.title.trim() ||
      !this.verse.trim() ||
      !this.content.trim()
    ) {
      await alert('Veuillez remplir tous les champs.');
      return;
    }

    this.messageService.addMessage(
      this.title,
      this.verse,
      this.content
    );

    // Notification automatique
    this.notificationService.addNotification(
      'Nouveau message biblique',
      `Le pasteur a publié un nouveau message : ${this.title.trim()}. Retrouvez-le dans la rubrique Messages.`
    );

    await alert({
      title: 'Publication réussie',
      message: 'Votre message biblique a été publié et une notification a été ajoutée dans l’espace membre.',
      okButtonText: 'OK'
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
