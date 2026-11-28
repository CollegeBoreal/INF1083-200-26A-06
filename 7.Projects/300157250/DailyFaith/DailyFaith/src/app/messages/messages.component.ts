import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import {
  NativeScriptCommonModule
} from '@nativescript/angular';

import { alert, confirm } from '@nativescript/core';

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

import {
  InteractionFirestoreService,
  OnlineComment
} from '../services/interaction-firestore.service';

type FeedMessage = Message | OnlinePublication;

interface OnlineLikeState {
  likes: number;
  liked: boolean;
}

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

  // Likes Firebase

  onlineLikes = new Map<string, OnlineLikeState>();

  likesLoading = new Set<string>();

  likesErrors = new Set<string>();

  // Commentaires Firebase

  onlineComments = new Map<string, OnlineComment[]>();

  commentsLoading = new Set<string>();

  commentsErrors = new Set<string>();

  openedComments = new Set<string>();

  commentInputs = new Map<string, string>();

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private churchService: ChurchService,
    private feed: PublicationFeedService,
    private interactionService: InteractionFirestoreService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    await this.refreshFeed();
  }

  // ==========================================
  // GESTION DE LA SESSION
  // ==========================================

  private isCurrentSession(uid: string): boolean {

    return this.authService.getCurrentUser()?.uid === uid
      && this.authService.isLoggedIn();
  }

  private clearInteractions() {

    this.onlineLikes.clear();

    this.likesErrors.clear();

    this.onlineComments.clear();

    this.commentsErrors.clear();

    this.openedComments.clear();

    this.commentInputs.clear();
  }

  get interactionsLoading(): boolean {

    return this.likesLoading.size > 0
      || this.commentsLoading.size > 0;
  }

  // ==========================================
  // PUBLICATIONS FIREBASE
  // ==========================================

  async refreshFeed() {

    if (this.feedLoading || this.interactionsLoading) {

      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {

      this.onlinePublications = [];

      this.onlineChurches = [];

      this.clearInteractions();

      this.cdr.markForCheck();

      return;
    }

    const uid = user.uid;

    this.feedLoading = true;

    this.feedError = '';

    this.onlinePublications = [];

    this.onlineChurches = [];

    this.clearInteractions();

    this.cdr.markForCheck();

    try {

      const result = await this.feed.followed();

      if (!this.isCurrentSession(uid)) {

        return;
      }

      this.onlineChurches = result.churches;

      this.onlinePublications = result.publications;

      if (result.partial) {

        this.feedError =
          'Certaines publications sont indisponibles.';
      }

      // Charger les interactions Firebase

      await Promise.all(

        this.onlinePublications.map(async message => {

          await Promise.all([

            this.loadOnlineLikes(message),

            this.loadOnlineComments(message)

          ]);

        })

      );

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

      if (!this.isCurrentSession(uid)) {

        this.onlinePublications = [];

        this.onlineChurches = [];

        this.clearInteractions();
      }

      this.feedLoading = false;

      this.cdr.markForCheck();
    }
  }

  // ==========================================
  // PUBLICATIONS LOCALES
  // ==========================================

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

  // Vérifier la source d'une publication

  isOnlineMessage(
    message: FeedMessage
  ): message is OnlinePublication {

    return 'church' in message;
  }

  // Nom de l'église

  getChurchName(message: FeedMessage): string {

    if (this.isOnlineMessage(message)) {

      return message.church.name;
    }

    if (message.churchId === undefined) {

      return 'Église inconnue';
    }

    return this.churchService
      .getChurchById(message.churchId)?.name
      || 'Église inconnue';
  }

  // ==========================================
  // LIKES FIREBASE
  // ==========================================

  private async fetchOnlineLikes(
    message: OnlinePublication
  ) {

    const uid = this.authService.getCurrentUser()?.uid;

    if (!uid || !this.authService.isLoggedIn()) {

      return;
    }

    const [likes, liked] = await Promise.all([

      this.interactionService.getLikesCount(
        message.churchId,
        message.id
      ),

      this.interactionService.isLiked(
        message.churchId,
        message.id
      )

    ]);

    if (!this.isCurrentSession(uid)) {

      return;
    }

    this.onlineLikes.set(message.key, {

      likes: likes,

      liked: liked

    });

    this.likesErrors.delete(message.key);

    console.log(
      'DAILY FAITH : Likes Messages Firebase =',
      likes
    );

    this.cdr.markForCheck();
  }

  // Charger les likes

  async loadOnlineLikes(
    message: OnlinePublication
  ) {

    const key = message.key;

    if (this.likesLoading.has(key)) {

      return;
    }

    this.likesLoading.add(key);

    this.likesErrors.delete(key);

    this.cdr.markForCheck();

    try {

      await this.fetchOnlineLikes(message);

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur chargement likes Messages',
        error
      );

      this.onlineLikes.delete(key);

      this.likesErrors.add(key);

    } finally {

      this.likesLoading.delete(key);

      this.cdr.markForCheck();
    }
  }

  // Vérifier le chargement des likes

  isLikeLoading(message: FeedMessage): boolean {

    return this.isOnlineMessage(message)
      && this.likesLoading.has(message.key);
  }

  // Vérifier les erreurs

  hasLikeError(message: FeedMessage): boolean {

    return this.isOnlineMessage(message)
      && this.likesErrors.has(message.key);
  }

  // Vérifier si la publication est aimée

  isLiked(message: FeedMessage): boolean {

    if (this.isOnlineMessage(message)) {

      return this.onlineLikes.get(message.key)?.liked
        ?? false;
    }

    return this.messageService
      .isLikedByCurrentUser(message);
  }

  // Nombre de likes

  getLikes(message: FeedMessage): number | string {

    if (this.isOnlineMessage(message)) {

      return this.onlineLikes.get(message.key)?.likes
        ?? '—';
    }

    return message.likes;
  }

  // Autoriser le bouton J'aime

  canLike(message: FeedMessage): boolean {

    if (!this.authService.isLoggedIn()) {

      return false;
    }

    if (!this.isOnlineMessage(message)) {

      return true;
    }

    return !this.feedLoading
      && !this.likesLoading.has(message.key);
  }

  // Ajouter ou retirer un like

  async toggleLike(message: FeedMessage) {

    if (!this.canLike(message)) {

      return;
    }

    // Likes locaux

    if (!this.isOnlineMessage(message)) {

      this.messageService.toggleLike(message);

      this.cdr.markForCheck();

      return;
    }

    // Likes Firebase

    const key = message.key;

    const uid = this.authService.getCurrentUser()?.uid;

    if (!uid) {

      return;
    }

    this.likesLoading.add(key);

    this.cdr.markForCheck();

    try {

      if (
        this.likesErrors.has(key) ||
        !this.onlineLikes.has(key)
      ) {

        await this.fetchOnlineLikes(message);

        return;
      }

      await this.interactionService.toggleLike(
        message.churchId,
        message.id
      );

      if (!this.isCurrentSession(uid)) {

        return;
      }

      await this.fetchOnlineLikes(message);

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur modification like Messages',
        error
      );

      this.onlineLikes.delete(key);

      this.likesErrors.add(key);

      if (this.isCurrentSession(uid)) {

        await alert({

          title: 'Publication',

          message:
            'Impossible de confirmer votre like. Veuillez réessayer.',

          okButtonText: 'OK'

        });
      }

    } finally {

      this.likesLoading.delete(key);

      this.cdr.markForCheck();
    }
  }

  // ==========================================
  // COMMENTAIRES FIREBASE
  // ==========================================

  private async fetchOnlineComments(
    message: OnlinePublication
  ) {

    const uid = this.authService.getCurrentUser()?.uid;

    if (!uid || !this.authService.isLoggedIn()) {

      return;
    }

    const comments =
      await this.interactionService.getComments(
        message.churchId,
        message.id
      );

    if (!this.isCurrentSession(uid)) {

      return;
    }

    this.onlineComments.set(
      message.key,
      comments
    );

    this.commentsErrors.delete(message.key);

    console.log(
      'DAILY FAITH : Commentaires Messages Firebase =',
      comments.length
    );

    this.cdr.markForCheck();
  }

  // Charger les commentaires

  async loadOnlineComments(
    message: OnlinePublication
  ) {

    const key = message.key;

    if (this.commentsLoading.has(key)) {

      return;
    }

    this.commentsLoading.add(key);

    this.commentsErrors.delete(key);

    this.cdr.markForCheck();

    try {

      await this.fetchOnlineComments(message);

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur chargement commentaires Messages',
        error
      );

      this.commentsErrors.add(key);

    } finally {

      this.commentsLoading.delete(key);

      this.cdr.markForCheck();
    }
  }

  // Actualiser les commentaires

  async refreshComments(message: FeedMessage) {

    if (
      !this.isOnlineMessage(message) ||
      this.feedLoading ||
      this.isCommentLoading(message) ||
      !this.authService.isLoggedIn()
    ) {

      return;
    }

    await this.loadOnlineComments(message);
  }

  // Récupérer les commentaires Firebase

  getOnlineComments(
    message: FeedMessage
  ): OnlineComment[] {

    if (!this.isOnlineMessage(message)) {

      return [];
    }

    return this.onlineComments.get(message.key)
      ?? [];
  }

  // Récupérer les commentaires locaux

  getComments(message: FeedMessage) {

    return this.isOnlineMessage(message)
      ? []
      : message.comments;
  }

  // Nombre de commentaires

  getCommentsCount(
    message: FeedMessage
  ): number | string {

    if (this.isOnlineMessage(message)) {

      if (this.commentsErrors.has(message.key)) {

        return '—';
      }

      return this.onlineComments.get(message.key)?.length
        ?? '—';
    }

    return message.comments.length;
  }

  // Vérifier le chargement

  isCommentLoading(message: FeedMessage): boolean {

    return this.isOnlineMessage(message)
      && this.commentsLoading.has(message.key);
  }

  // Vérifier les erreurs

  hasCommentError(message: FeedMessage): boolean {

    return this.isOnlineMessage(message)
      && this.commentsErrors.has(message.key);
  }

  // Vérifier si les commentaires sont ouverts

  showComments(message: FeedMessage): boolean {

    if (this.isOnlineMessage(message)) {

      return this.openedComments.has(message.key);
    }

    return message.showComments;
  }

  // Ouvrir ou fermer les commentaires

  async toggleComments(message: FeedMessage) {

    if (!this.authService.isLoggedIn()) {

      return;
    }

    // Commentaires locaux

    if (!this.isOnlineMessage(message)) {

      message.showComments = !message.showComments;

      this.cdr.markForCheck();

      return;
    }

    // Commentaires Firebase

    if (
      this.feedLoading ||
      this.isCommentLoading(message)
    ) {

      return;
    }

    const key = message.key;

    if (this.openedComments.has(key)) {

      this.openedComments.delete(key);

    } else {

      this.openedComments.add(key);

      this.cdr.markForCheck();

      await this.loadOnlineComments(message);
    }

    this.cdr.markForCheck();
  }

  // Récupérer le texte du commentaire

  getNewComment(message: FeedMessage): string {

    if (this.isOnlineMessage(message)) {

      return this.commentInputs.get(message.key)
        ?? '';
    }

    return message.newComment;
  }

  // Saisir un commentaire

  onCommentChange(
    args: any,
    message: FeedMessage
  ) {

    const content = args.object.text || '';

    if (this.isOnlineMessage(message)) {

      this.commentInputs.set(
        message.key,
        content
      );

    } else {

      message.newComment = content;
    }

    this.cdr.markForCheck();
  }

  // Autoriser la publication

  canComment(message: FeedMessage): boolean {

    const content = this.getNewComment(message).trim();

    return this.authService.isLoggedIn()
      && !this.feedLoading
      && !this.isCommentLoading(message)
      && !this.hasCommentError(message)
      && content.length > 0
      && content.length <= 2000;
  }

  // Publier un commentaire

  async addComment(message: FeedMessage) {

    const content = this.getNewComment(message).trim();

    if (!content) {

      await alert(
        'Veuillez écrire un commentaire.'
      );

      return;
    }

    if (content.length > 2000) {

      await alert(
        'Le commentaire ne doit pas dépasser 2000 caractères.'
      );

      return;
    }

    if (!this.canComment(message)) {

      return;
    }

    // Commentaires locaux

    if (!this.isOnlineMessage(message)) {

      this.messageService.addComment(
        message,
        content
      );

      this.cdr.markForCheck();

      return;
    }

    // Commentaires Firebase

    const key = message.key;

    const uid = this.authService.getCurrentUser()?.uid;

    if (!uid) {

      return;
    }

    this.commentsLoading.add(key);

    this.commentsErrors.delete(key);

    this.cdr.markForCheck();

    let saved = false;

    try {

      await this.interactionService.addComment(
        message.churchId,
        message.id,
        content
      );

      saved = true;

      if (!this.isCurrentSession(uid)) {

        return;
      }

      // Vider le champ après publication

      if (
        this.getNewComment(message).trim() === content
      ) {

        this.commentInputs.delete(key);
      }

      await this.fetchOnlineComments(message);

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur publication commentaire Messages',
        error
      );

      this.commentsErrors.add(key);

      if (this.isCurrentSession(uid)) {

        await alert({

          title: 'Commentaire',

          message: saved
            ? 'Commentaire enregistré. Actualisez pour le voir.'
            : 'Impossible de confirmer le commentaire. Actualisez avant de réessayer.',

          okButtonText: 'OK'

        });
      }

    } finally {

      this.commentsLoading.delete(key);

      this.cdr.markForCheck();
    }
  }

  // ==========================================
  // SUPPRESSION DES COMMENTAIRES
  // ==========================================

  canDeleteComment(
    message: FeedMessage,
    comment: OnlineComment
  ): boolean {

    const user = this.authService.getCurrentUser();

    if (
      !user ||
      !this.authService.isLoggedIn() ||
      !this.isOnlineMessage(message)
    ) {

      return false;
    }

    return comment.authorUid === user.uid
      || (
        this.authService.isAdmin()
        && message.church.ownerUid === user.uid
      );
  }

  async deleteOnlineComment(
    message: FeedMessage,
    comment: OnlineComment
  ) {

    if (
      !this.isOnlineMessage(message) ||
      !this.canDeleteComment(message, comment) ||
      this.isCommentLoading(message) ||
      this.feedLoading
    ) {

      return;
    }

    const key = message.key;

    const uid = this.authService.getCurrentUser()?.uid;

    if (!uid) {

      return;
    }

    this.commentsLoading.add(key);

    this.cdr.markForCheck();

    try {

      const confirmed = await confirm({

        title: 'Supprimer le commentaire',

        message:
          'Voulez-vous vraiment supprimer ce commentaire ?',

        okButtonText: 'Supprimer',

        cancelButtonText: 'Annuler'

      });

      if (
        !confirmed ||
        !this.isCurrentSession(uid)
      ) {

        return;
      }

      await this.interactionService.deleteComment(
        message.churchId,
        message.id,
        comment.id
      );

      if (!this.isCurrentSession(uid)) {

        return;
      }

      await this.fetchOnlineComments(message);

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur suppression commentaire Messages',
        error
      );

      this.commentsErrors.add(key);

      if (this.isCurrentSession(uid)) {

        await alert({

          title: 'Commentaire',

          message:
            'Impossible de confirmer la suppression. Veuillez actualiser.',

          okButtonText: 'OK'

        });
      }

    } finally {

      this.commentsLoading.delete(key);

      this.cdr.markForCheck();
    }
  }
}