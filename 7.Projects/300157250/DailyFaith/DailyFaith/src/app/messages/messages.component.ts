
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NavigationComponent } from '../navigation/navigation.component';
import { Message, MessageService } from '../services/message.service';
import { alert } from '@nativescript/core';

@Component({
  selector: 'ns-messages',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {

  constructor(private messageService: MessageService) {}

  get messages(): Message[] {
    return this.messageService.getMessages();
  }

  // Aimer et sauvegarder un message
  toggleLike(message: Message) {
    this.messageService.toggleLike(message);
  }

  // Afficher ou masquer les commentaires
  toggleComments(message: Message) {
    message.showComments = !message.showComments;
  }

  // Récupérer le commentaire saisi
  onCommentChange(args: any, message: Message) {
    message.newComment = args.object.text;
  }

  // Publier et sauvegarder un commentaire
  addComment(message: Message) {

    if (!message.newComment.trim()) {
      alert('Veuillez écrire un commentaire.');
      return;
    }

    this.messageService.addComment(
      message,
      message.newComment
    );
  }
}
