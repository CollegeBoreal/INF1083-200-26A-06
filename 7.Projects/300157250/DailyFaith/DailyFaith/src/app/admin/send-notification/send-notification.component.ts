
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';
import { alert, confirm } from '@nativescript/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'ns-send-notification',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css'],
})
export class SendNotificationComponent {

  title = '';
  content = '';

  constructor(
    private router: RouterExtensions,
    private notificationService: NotificationService
  ) {}

  onTitleChange(args: any) {
    this.title = args.object.text;
  }

  onContentChange(args: any) {
    this.content = args.object.text;
  }

  async sendNotification() {

    if (!this.title.trim() || !this.content.trim()) {
      await alert('Veuillez remplir tous les champs.');
      return;
    }

    const result = await confirm({
      title: 'Envoyer la notification',
      message: 'Voulez-vous publier cette notification dans l’espace membre ?',
      okButtonText: 'Envoyer',
      cancelButtonText: 'Annuler'
    });

    if (!result) {
      return;
    }

    this.notificationService.addNotification(
      this.title,
      this.content
    );

    await alert({
      title: 'Notification publiée',
      message: 'Votre notification est disponible dans l’espace membre.',
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
