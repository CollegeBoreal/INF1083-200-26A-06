import {
  Component,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert, confirm } from '@nativescript/core';

import {
  Message,
  MessageService
} from '../../services/message.service';

import {
  Church,
  ChurchService
} from '../../services/church.service';

import { AuthService } from '../../services/auth.service';
import { ChurchImageService } from '../../services/church-image.service';

@Component({
  selector: 'ns-manage-messages',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './manage-messages.component.html',
  styleUrls: ['./manage-messages.component.css']
})

export class ManageMessagesComponent {

  selectedChurchId: number | null = null;

  editingId: number | null = null;

  title = '';
  verse = '';
  content = '';

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private cdr: ChangeDetectorRef
  ) {}

  // Églises du pasteur connecté

  get churches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return [];
    }

    return this.churchService.getPastorChurches(user.id);

  }

  // Toutes les publications du pasteur

  get allMessages(): Message[] {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return [];
    }

    const churchIds = this.churches.map(
      church => church.id
    );

    return this.messageService
      .getPastorMessages(user.id)
      .filter(message =>
        message.churchId !== undefined &&
        churchIds.includes(message.churchId)
      );

  }

  // Filtrer les publications

  get messages(): Message[] {

    if (this.selectedChurchId === null) {
      return this.allMessages;
    }

    return this.allMessages.filter(
      message => message.churchId === this.selectedChurchId
    );

  }

  // Statistiques

  get totalMessages(): number {

    return this.messages.length;

  }

  get totalLikes(): number {

    return this.messages.reduce(
      (total, message) => total + message.likes,
      0
    );

  }

  get totalComments(): number {

    return this.messages.reduce(
      (total, message) => total + message.comments.length,
      0
    );

  }

  // Sélectionner une église

  selectChurch(churchId: number | null) {

    this.selectedChurchId = churchId;

    this.cancelEdit();

  }

  // Informations sur l'église

  getChurchName(message: Message): string {

    if (message.churchId === undefined) {
      return 'Église inconnue';
    }

    return this.churchService
      .getChurchById(message.churchId)?.name
      || 'Église inconnue';

  }

  getChurchLogo(message: Message): string {

    if (message.churchId === undefined) {
      return '';
    }

    const church = this.churchService.getChurchById(
      message.churchId
    );

    return church?.logo
      ? this.imageService.getImagePath(church.logo)
      : '';

  }

  // Modifier une publication

  editMessage(message: Message) {

    if (!this.allMessages.some(item => item.id === message.id)) {
      return;
    }

    this.editingId = message.id;

    this.title = message.title;
    this.verse = message.verse;
    this.content = message.content;

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

  // Enregistrer les modifications

  async saveMessage() {

    if (
      !this.title.trim() ||
      !this.verse.trim() ||
      !this.content.trim()
    ) {

      await alert('Veuillez remplir tous les champs.');

      return;

    }

    const message = this.allMessages.find(
      item => item.id === this.editingId
    );

    if (!message) {

      await alert('Vous ne pouvez pas modifier cette publication.');

      return;

    }

    this.messageService.updateMessage(
      message.id,
      this.title,
      this.verse,
      this.content
    );

    const updated = this.allMessages.find(
      item => item.id === message.id
    );

    if (
      !updated ||
      updated.title !== this.title.trim() ||
      updated.verse !== this.verse.trim() ||
      updated.content !== this.content.trim()
    ) {

      await alert('La modification a échoué.');

      return;

    }

    this.cancelEdit();

    this.cdr.markForCheck();

    await alert({

      title: 'Modification réussie',

      message: 'Votre publication a été mise à jour.',

      okButtonText: 'OK'

    });

  }

  cancelEdit() {

    this.editingId = null;

    this.title = '';
    this.verse = '';
    this.content = '';

  }

  // Supprimer une publication

  async deleteMessage(message: Message) {

    if (!this.allMessages.some(item => item.id === message.id)) {
      return;
    }

    const result = await confirm({

      title: 'Supprimer la publication',

      message: `Voulez-vous vraiment supprimer « ${message.title} » ?`,

      okButtonText: 'Supprimer',

      cancelButtonText: 'Annuler'

    });

    if (!result) {
      return;
    }

    this.messageService.deleteMessage(message.id);

    const stillExists = this.messageService
      .getMessages()
      .some(item => item.id === message.id);

    if (stillExists) {

      await alert('Impossible de supprimer cette publication.');

      return;

    }

    if (this.editingId === message.id) {

      this.cancelEdit();

    }

    this.cdr.markForCheck();

    await alert({

      title: 'Publication supprimée',

      message: 'Le message a été retiré de la page de votre église.',

      okButtonText: 'OK'

    });

  }

  // Nouvelle publication

  publishMessage() {

    this.router.navigate(['/publish-message']);

  }

  // Retour au tableau de bord

  goBack() {

    this.router.navigate(['/admin'], {

      clearHistory: true

    });

  }

}