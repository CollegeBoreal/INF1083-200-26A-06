import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule
} from '@nativescript/angular';

import { NavigationComponent } from '../navigation/navigation.component';

import {
  Message,
  MessageService
} from '../services/message.service';

import { AuthService } from '../services/auth.service';
import { ChurchService } from '../services/church.service';

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
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent {

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private churchService: ChurchService
  ) {}

  // Publications des églises suivies

  get messages(): Message[] {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return [];
    }

    return this.messageService
      .getFollowedChurchMessages(user.id)
      .sort((a, b) => b.id - a.id);

  }

  // Nom de l'église

  getChurchName(message: Message): string {

    if (message.churchId === undefined) {
      return 'Église inconnue';
    }

    return this.churchService
      .getChurchById(message.churchId)?.name
      || 'Église inconnue';

  }

  // Vérifier le like du membre

  isLiked(message: Message): boolean {

    return this.messageService
      .isLikedByCurrentUser(message);

  }

  // Aimer une publication

  toggleLike(message: Message) {

    this.messageService.toggleLike(message);

  }

  // Afficher les commentaires

  toggleComments(message: Message) {

    message.showComments = !message.showComments;

  }

  onCommentChange(args: any, message: Message) {

    message.newComment = args.object.text || '';

  }

  // Publier un commentaire

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