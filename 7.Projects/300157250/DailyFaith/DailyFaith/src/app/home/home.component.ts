import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert, confirm } from '@nativescript/core';

import { NavigationComponent } from '../navigation/navigation.component';

import {
  Message,
  MessageService
} from '../services/message.service';

import {
  Church,
  ChurchService
} from '../services/church.service';

import {
  FirestoreChurch
} from '../services/church-firestore.service';

import {
  PublicationFeedService,
  OnlinePublication
} from '../services/publication-feed.service';

import {
  InteractionFirestoreService,
  OnlineComment
} from '../services/interaction-firestore.service';

import { AuthService } from '../services/auth.service';

import { ChurchImageService } from '../services/church-image.service';

type FeedMessage = Message | OnlinePublication;

type FeedChurch = Church | FirestoreChurch;

interface OnlineLikeState {
  likes: number;
  liked: boolean;
}

@Component({
  selector: 'ns-home',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  onlineChurches: FirestoreChurch[] = [];

  onlineMessages: OnlinePublication[] = [];

  loading = false;

  errorMessage = '';

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
    private router: RouterExtensions,
    private messageService: MessageService,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private publicationFeed: PublicationFeedService,
    private interactionService: InteractionFirestoreService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    await this.loadFeed();
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

  async loadFeed() {

    if (this.loading || this.interactionsLoading) {

      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {

      this.onlineChurches = [];

      this.onlineMessages = [];

      this.clearInteractions();

      this.cdr.markForCheck();

      return;
    }

    this.loading = true;

    this.errorMessage = '';

    this.onlineChurches = [];

    this.onlineMessages = [];

    this.clearInteractions();

    this.cdr.markForCheck();

    try {

      const result =
        await this.publicationFeed.followed();

      if (!this.isCurrentSession(user.uid)) {

        return;
      }

      this.onlineChurches = result.churches;

      this.onlineMessages = result.publications;

      if (result.partial) {

        this.errorMessage =
          'Certaines publications sont indisponibles.';
      }

      // Charger les likes et les commentaires

      await Promise.all(

        this.onlineMessages.map(async message => {

          await Promise.all([

            this.loadOnlineLikes(message),

            this.loadOnlineComments(message)

          ]);

        })

      );

      console.log(
        'DAILY FAITH : Communautés en ligne =',
        this.onlineChurches.length
      );

      console.log(
        'DAILY FAITH : Publications accueil Firebase =',
        this.onlineMessages.length
      );

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur accueil Firebase',
        error
      );

      this.errorMessage =
        'Impossible de charger les publications en ligne.';

    } finally {

      if (!this.isCurrentSession(user.uid)) {

        this.onlineChurches = [];

        this.onlineMessages = [];

        this.clearInteractions();
      }

      this.loading = false;

      this.cdr.markForCheck();
    }
  }

  // Actualiser le fil

  async refresh() {

    await this.loadFeed();
  }

  // Nom du membre

  get memberName(): string {

    return this.authService.getCurrentUser()?.name
      || 'Membre';
  }

  // Églises locales suivies

  get localChurches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user) {

      return [];
    }

    return this.churchService
      .getFollowedChurches(user.id);
  }

  // Toutes les communautés suivies

  get churches(): FeedChurch[] {

    return [

      ...this.onlineChurches,

      ...this.localChurches

    ];
  }

  // Publications locales

  get localMessages(): Message[] {

    const user = this.authService.getCurrentUser();

    if (!user) {

      return [];
    }

    return this.messageService
      .getFollowedChurchMessages(user.id)
      .sort((a, b) => b.id - a.id);
  }

  // Fil d'actualité

  get messages(): FeedMessage[] {

    return [

      ...this.onlineMessages,

      ...this.localMessages

    ];
  }

  // Dernière publication

  get latestMessage(): FeedMessage | undefined {

    return this.messages[0];
  }

  // Vérifier la source d'une publication

  isOnlineMessage(
    message: FeedMessage
  ): message is OnlinePublication {

    return 'church' in message;
  }

  // Identifiant unique

  getMessageKey(message: FeedMessage): string {

    return this.isOnlineMessage(message)
      ? `firebase:${message.key}`
      : `local:${message.id}`;
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

  // Nom du pasteur

  getAuthor(message: FeedMessage): string {

    return this.isOnlineMessage(message)
      ? message.church.pastor
      : message.author;
  }

  // Logo de l'église

  getLogoPath(church: FeedChurch): string {

    if (!church.logo) {

      return '';
    }

    if ('ownerUid' in church) {

      return church.logo;
    }

    return this.imageService
      .getImagePath(church.logo);
  }

  getMessageLogo(message: FeedMessage): string {

    if (this.isOnlineMessage(message)) {

      return this.getLogoPath(message.church);
    }

    if (message.churchId === undefined) {

      return '';
    }

    const church = this.churchService
      .getChurchById(message.churchId);

    return church
      ? this.getLogoPath(church)
      : '';
  }

  // Ouvrir le profil d'une église

  viewChurch(church: FeedChurch) {

    this.router.navigate(
      ['/church-profile', church.id],
      {
        queryParams: {

          source: 'ownerUid' in church
            ? 'firebase'
            : 'local'
        }
      }
    );
  }

  viewMessageChurch(message: FeedMessage) {

    if (message.churchId === undefined) {

      return;
    }

    this.router.navigate(
      ['/church-profile', message.churchId],
      {
        queryParams: {

          source: this.isOnlineMessage(message)
            ? 'firebase'
            : 'local'
        }
      }
    );
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
      'DAILY FAITH : Likes Firebase chargés =',
      likes
    );

    this.cdr.markForCheck();
  }

  // Charger les likes d'une publication

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
        'DAILY FAITH : Erreur chargement likes',
        error
      );

      this.onlineLikes.delete(key);

      this.likesErrors.add(key);

    } finally {

      this.likesLoading.delete(key);

      this.cdr.markForCheck();
    }
  }

  // Vérifier si les likes sont en chargement

  isLikeLoading(message: FeedMessage): boolean {

    return this.isOnlineMessage(message)
      && this.likesLoading.has(message.key);
  }

  // Vérifier une erreur de chargement

  hasLikeError(message: FeedMessage): boolean {

    return this.isOnlineMessage(message)
      && this.likesErrors.has(message.key);
  }

  // Vérifier si le membre aime la publication

  isLiked(message: FeedMessage): boolean {

    if (this.isOnlineMessage(message)) {

      return this.onlineLikes.get(message.key)?.liked
        ?? false;
    }

    return message.liked;
  }

  // Nombre de likes

  getLikes(message: FeedMessage): number | string {

    if (this.isOnlineMessage(message)) {

      return this.onlineLikes.get(message.key)?.likes
        ?? '—';
    }

    return message.likes;
  }

  // Autoriser ou désactiver le bouton

  canLike(message: FeedMessage): boolean {

    if (!this.authService.isLoggedIn()) {

      return false;
    }

    if (!this.isOnlineMessage(message)) {

      return true;
    }

    return !this.loading
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
        'DAILY FAITH : Erreur modification like',
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
      'DAILY FAITH : Commentaires accueil Firebase =',
      comments.length
    );

    this.cdr.markForCheck();
  }

  // Charger les commentaires d'une publication

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
        'DAILY FAITH : Erreur chargement commentaires',
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
      this.loading ||
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

    if (this.loading || this.isCommentLoading(message)) {

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

  // Modifier le texte du commentaire

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

  // Vérifier si le membre peut commenter

  canComment(message: FeedMessage): boolean {

    const content = this.getNewComment(message).trim();

    return this.authService.isLoggedIn()
      && !this.loading
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

      if (this.getNewComment(message).trim() === content) {

        this.commentInputs.delete(key);
      }

      // Recharger les commentaires

      await this.fetchOnlineComments(message);

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur publication commentaire',
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

    // Auteur du commentaire ou pasteur propriétaire

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
      this.loading
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

      // Confirmation avant suppression

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
        'DAILY FAITH : Erreur suppression commentaire',
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

  // ==========================================
  // NAVIGATION
  // ==========================================

  discoverChurches() {

    this.router.navigate(['/search'], {

      clearHistory: true
    });
  }

  goToMyChurches() {

    this.router.navigate(['/my-churches'], {

      clearHistory: true
    });
  }

  goToNotifications() {

    this.router.navigate(['/notifications'], {

      clearHistory: true
    });
  }

  goToEvents() {

    this.router.navigate(['/events'], {

      clearHistory: true
    });
  }

  goToMessages() {

    this.router.navigate(['/messages']);
  }

  // ==========================================
  // DECONNEXION
  // ==========================================

  async logout() {

    if (this.loading || this.interactionsLoading) {

      await alert(
        'Veuillez patienter pendant le chargement.'
      );

      return;
    }

    try {

      await this.authService.logout();

      this.onlineChurches = [];

      this.onlineMessages = [];

      this.clearInteractions();

      this.likesLoading.clear();

      this.commentsLoading.clear();

      await this.router.navigate(['/login'], {

        clearHistory: true
      });

    } catch (error) {

      console.error(
        'Erreur de déconnexion Firebase',
        error
      );
    }
  }
}