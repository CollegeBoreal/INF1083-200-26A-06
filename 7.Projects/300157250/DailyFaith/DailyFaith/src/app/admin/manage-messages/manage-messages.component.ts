
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';
import { alert, confirm } from '@nativescript/core';
import { Message, MessageService } from '../../services/message.service';

@Component({
  selector: 'ns-manage-messages',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './manage-messages.component.html',
  styleUrls: ['./manage-messages.component.css'],
})
export class ManageMessagesComponent {

  editingId: number | null = null;

  title = '';
  verse = '';
  content = '';

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService
  ) {}

  get messages(): Message[] {
    return this.messageService.getMessages();
  }

  editMessage(message: Message) {
    this.editingId = message.id;
    this.title = message.title;
    this.verse = message.verse;
    this.content = message.content;
  }

  onTitleChange(args: any) {
    this.title = args.object.text;
  }

  onVerseChange(args: any) {
    this.verse = args.object.text;
  }

  onContentChange(args: any) {
    this.content = args.object.text;
  }

  async saveMessage() {

    if (
      !this.title.trim() ||
      !this.verse.trim() ||
      !this.content.trim()
    ) {
      await alert('Veuillez remplir tous les champs.');
      return;
    }

    if (this.editingId !== null) {

      this.messageService.updateMessage(
        this.editingId,
        this.title,
        this.verse,
        this.content
      );

      this.cancelEdit();

      await alert('Message modifié avec succès.');
    }
  }

  cancelEdit() {
    this.editingId = null;
    this.title = '';
    this.verse = '';
    this.content = '';
  }

  async deleteMessage(message: Message) {

    const result = await confirm({
      title: 'Supprimer le message',
      message: 'Voulez-vous vraiment supprimer ce message biblique ?',
      okButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result) {

      this.messageService.deleteMessage(message.id);

      if (this.editingId === message.id) {
        this.cancelEdit();
      }

      await alert('Message supprimé avec succès.');
    }
  }

  goBack() {
    this.router.navigate(['/admin'], {
      clearHistory: true
    });
  }
}
