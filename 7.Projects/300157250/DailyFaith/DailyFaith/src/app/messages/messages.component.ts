import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import {
  NativeScriptCommonModule
} from '@nativescript/angular';

import { alert } from '@nativescript/core';

import { NavigationComponent } from '../navigation/navigation.component';

import {
  Message,
  MessageService
} from '../services/message.service';

import { AuthService } from '../services/auth.service';

import { ChurchService } from '../services/church.service';

import {
  PublicationFeedService,
  OnlinePublication
} from '../services/publication-feed.service';

import {
  FirestoreChurch
} from '../services/church-firestore.service';

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
export class MessagesComponent implements OnInit {

  onlinePublications: OnlinePublication[] = [];

  onlineChurches: FirestoreChurch[] = [];

  feedLoading = false;

  feedError = '';

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private churchService: ChurchService,
    private feed: PublicationFeedService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    await this.refreshFeed();
  }

  // Charger les publications Firebase

  async refreshFeed() {

    if (this.feedLoading) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {

      this.onlinePublications = [];

      this.onlineChurches = [];

      return;
    }

    const uid = user.uid;

    this.feedLoading = true;

    this.feedError = '';

    this.onlinePublications = [];

    this.onlineChurches = [];

    this.cdr.markForCheck();

    try {

      const result = await this.feed.followed();

      if (
        this.authService.getCurrentUser()?.uid !== uid
      ) {
        return;
      }

      this.onlineChurches = result.churches;

      this.onlinePublications = result.publications;

      if (result.partial) {

        this.feedError =
          'Certaines publications sont indisponibles.';
      }

      console.log(
        'DAILY FAITH : Messages Firebase chargés =',
        this.onlinePublications.length
      );

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur fil Firebase',
        error
      );

      this.feedError =
        'Impossible de charger les publications en ligne.';

    } finally {

      if (
        this.authService.getCurrentUser()?.uid !== uid
      ) {

        this.onlinePublications = [];

        this.onlineChurches = [];
      }

      this.feedLoading = false;

      this.cdr.markForCheck();
    }
  }

  // Publications locales des églises suivies

  get messages(): Message[] {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return [];
    }

    return this.messageService
      .getFollowedChurchMessages(user.id)
      .sort((a, b) => b.id - a.id);
  }

  // Nombre total de publications

  get totalMessages(): number {

    return this.onlinePublications.length
      + this.messages.length;
  }

  // Nom de l'église locale

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

  // Aimer une publication locale

  toggleLike(message: Message) {

    this.messageService.toggleLike(message);

    this.cdr.markForCheck();
  }

  // Afficher les commentaires

  toggleComments(message: Message) {

    message.showComments = !message.showComments;

    this.cdr.markForCheck();
  }

  // Saisir un commentaire

  onCommentChange(args: any, message: Message) {

    message.newComment = args.object.text || '';
  }

  // Publier un commentaire local

  addComment(message: Message) {

    if (!message.newComment.trim()) {

      alert('Veuillez écrire un commentaire.');

      return;
    }

    this.messageService.addComment(
      message,
      message.newComment
    );

    this.cdr.markForCheck();
  }
}