import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert, confirm } from '@nativescript/core';

import {
  Church,
  ChurchService
} from '../services/church.service';

import {
  FirestoreChurch,
  ChurchFirestoreService
} from '../services/church-firestore.service';

import { AuthService } from '../services/auth.service';

import { ChurchImageService } from '../services/church-image.service';

import {
  Message,
  MessageService
} from '../services/message.service';

import {
  ChurchEvent,
  EventService
} from '../services/event.service';

import {
  PublicationFeedService,
  OnlinePublication
} from '../services/publication-feed.service';

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
  selector: 'ns-church-profile',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './church-profile.component.html',
  styleUrls: ['./church-profile.component.css']
})
export class ChurchProfileComponent implements OnInit {

  church: Church | FirestoreChurch | undefined;

  localChurch: Church | undefined;

  onlineChurch: FirestoreChurch | undefined;

  online = false;

  loading = true;

  errorMessage = '';

  followingOnline = false;

  followLoading = false;

  followReady = false;

  onlineFollowersCount: number | string = '—';

  onlinePublications: OnlinePublication[] = [];

  publicationsLoading = false;

  publicationsError = '';

  publicationsReady = false;

  activeTab: 'publications' | 'events' = 'publications';

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
    private route: ActivatedRoute,
    private router: RouterExtensions,
    private churchService: ChurchService,
    private firestoreService: ChurchFirestoreService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private messageService: MessageService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private publicationFeed: PublicationFeedService,
    private interactionService: InteractionFirestoreService
  ) {}

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
  // INITIALISATION DU PROFIL
  // ==========================================

  async ngOnInit() {

    const id =
      this.route.snapshot.paramMap.get('id') || '';

    this.online =
      this.route.snapshot.queryParamMap.get('source') === 'firebase';

    const user = this.authService.getCurrentUser();

    try {

      if (!user || !this.authService.isLoggedIn() || !id) {

        return;
      }

      if (this.online) {

        const church =
          await this.firestoreService.getChurchById(id);

        if (!this.isCurrentSession(user.uid)) {

          return;
        }

        this.onlineChurch = church;

        this.church = church;

        if (church) {

          await this.loadFollowStatus();

          if (!this.isCurrentSession(user.uid)) {

            return;
          }

          await this.loadOnlinePublications();

          console.log(
            'DAILY FAITH : Profil Firebase chargé.',
            church.id
          );
        }

      } else {

        this.localChurch =
          this.churchService.getChurchById(Number(id));

        this.church = this.localChurch;
      }

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur profil Firebase',
        error
      );

      this.errorMessage =
        'Impossible de charger cette communauté.';

    } finally {

      if (user && !this.isCurrentSession(user.uid)) {

        this.church = undefined;

        this.onlineChurch = undefined;

        this.localChurch = undefined;

        this.onlinePublications = [];

        this.clearInteractions();
      }

      this.loading = false;

      this.cdr.markForCheck();
    }
  }

  // ==========================================
  // ETAT DE L'ABONNEMENT
  // ==========================================

  async loadFollowStatus() {

    const church = this.onlineChurch;

    const uid = this.authService.getCurrentUser()?.uid;

    if (!church || !uid || !this.isCurrentSession(uid)) {

      return;
    }

    this.followReady = false;

    try {

      if (this.isOwner) {

        const count =
          await this.firestoreService.getFollowersCount(
            church.id
          );

        if (!this.isCurrentSession(uid)) {

          return;
        }

        this.onlineFollowersCount = count;

      } else {

        const following =
          await this.firestoreService.isFollowing(
            church.id
          );

        if (!this.isCurrentSession(uid)) {

          return;
        }

        this.followingOnline = following;
      }

      this.followReady = true;

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur état abonnement',
        error
      );

    } finally {

      this.cdr.markForCheck();
    }
  }

  // Logo de l'église

  get logoPath(): string {

    const logo = this.church?.logo || '';

    return this.online
      ? logo
      : this.imageService.getImagePath(logo);
  }

  // Image de couverture

  get coverPath(): string {

    const cover = this.church?.cover || '';

    return this.online
      ? cover
      : this.imageService.getImagePath(cover);
  }

  // Nombre d'abonnés

  get followersCount(): number | string {

    return this.online
      ? this.onlineFollowersCount
      : this.localChurch?.followers.length ?? 0;
  }

  // ==========================================
  // PUBLICATIONS FIREBASE
  // ==========================================

  async loadOnlinePublications() {

    const church = this.onlineChurch;

    const uid = this.authService.getCurrentUser()?.uid;

    if (
      !church ||
      !uid ||
      !this.authService.isLoggedIn() ||
      this.publicationsLoading ||
      this.interactionsLoading
    ) {

      return;
    }

    this.publicationsLoading = true;

    this.publicationsReady = false;

    this.publicationsError = '';

    this.onlinePublications = [];

    this.clearInteractions();

    this.cdr.markForCheck();

    try {

      const publications =
        await this.publicationFeed.forChurch(church);

      if (!this.isCurrentSession(uid)) {

        return;
      }

      this.onlinePublications = publications.sort(
        (a, b) => b.sortTime - a.sortTime
      );

      // Charger les likes et les commentaires

      await Promise.all(

        this.onlinePublications.map(async message => {

          await Promise.all([

            this.loadOnlineLikes(message),

            this.loadOnlineComments(message)

          ]);

        })

      );

      if (!this.isCurrentSession(uid)) {

        return;
      }

      this.publicationsReady = true;

      console.log(
        'DAILY FAITH : Publications profil Firebase =',
        this.onlinePublications.length
      );

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur publications profil',
        error
      );

      this.publicationsError =
        'Impossible de charger les publications de cette église.';

    } finally {

      if (!this.isCurrentSession(uid)) {

        this.onlinePublications = [];

        this.publicationsReady = false;

        this.clearInteractions();
      }

      this.publicationsLoading = false;

      this.cdr.markForCheck();
    }
  }

  // Publications locales

  get publications(): Message[] {

    if (!this.localChurch) {

      return [];
    }

    return this.messageService.getChurchMessages(
      this.localChurch.id
    );
  }

  // Nombre de publications

  get publicationsCount(): number | string {

    if (this.online) {

      return this.publicationsReady
        ? this.onlinePublications.length
        : '—';
    }

    return this.publications.length;
  }

  // Vérifier la source de la publication

  isOnlineMessage(
    message: FeedMessage
  ): message is OnlinePublication {

    return 'church' in message;
  }

  // ==========================================
  // EVENEMENTS
  // ==========================================

  get events(): ChurchEvent[] {

    if (!this.localChurch) {

      return [];
    }

    return this.eventService
      .getChurchEvents(this.localChurch.id)
      .sort((a, b) => b.id - a.id);
  }

  // Nombre d'événements

  get eventsCount(): number | string {

    return this.online
      ? '—'
      : this.events.length;
  }

  // Nombre de participants

  getParticipantsCount(event: ChurchEvent): number {

    return this.eventService.getParticipantsCount(event);
  }

  // Vérifier la participation

  isRegistered(event: ChurchEvent): boolean {

    return this.eventService.isRegistered(event);
  }

  // Autorisation de participation

  get canParticipate(): boolean {

    return !this.online &&
      this.authService.isLoggedIn() &&
      !this.authService.isAdmin();
  }

  // Participer à un événement

  participate(event: ChurchEvent) {

    if (!this.canParticipate) {

      return;
    }

    this.eventService.toggleParticipation(event);

    this.cdr.markForCheck();
  }

  // ==========================================
  // ABONNEMENTS
  // ==========================================

  get isFollowing(): boolean {

    const user = this.authService.getCurrentUser();

    if (!user) {

      return false;
    }

    if (this.online) {

      return this.followingOnline;
    }

    if (!this.localChurch) {

      return false;
    }

    return this.churchService.isFollowing(
      this.localChurch.id,
      user.id
    );
  }

  // Vérifier le propriétaire

  get isOwner(): boolean {

    const user = this.authService.getCurrentUser();

    if (!user) {

      return false;
    }

    if (this.online) {

      return this.onlineChurch?.ownerUid === user.uid;
    }

    return this.localChurch?.ownerId === user.id;
  }

  // S'abonner ou se désabonner

  async toggleFollow() {

    const user = this.authService.getCurrentUser();

    if (
      !user ||
      !this.church ||
      !this.authService.isLoggedIn() ||
      this.isOwner ||
      this.followLoading
    ) {

      return;
    }

    // Abonnements Firebase

    if (this.online && this.onlineChurch) {

      this.followLoading = true;

      this.cdr.markForCheck();

      try {

        const churchId = this.onlineChurch.id;

        if (!this.followReady) {

          await this.loadFollowStatus();

          if (!this.followReady) {

            throw new Error(
              'Impossible de vérifier votre abonnement.'
            );
          }

          return;
        }

        if (this.followingOnline) {

          await this.firestoreService.unfollowChurch(
            churchId
          );

          if (!this.isCurrentSession(user.uid)) {

            return;
          }

          this.followingOnline = false;

        } else {

          await this.firestoreService.followChurch(
            churchId
          );

          if (!this.isCurrentSession(user.uid)) {

            return;
          }

          this.followingOnline = true;
        }

      } catch (error) {

        console.error(
          'DAILY FAITH : Erreur abonnement Firebase',
          error
        );

        if (this.isCurrentSession(user.uid)) {

          await this.loadFollowStatus();

          await alert({

            title: 'Abonnement',

            message:
              'Impossible de modifier votre abonnement. Vérifiez votre connexion.',

            okButtonText: 'OK'

          });
        }

      } finally {

        this.followLoading = false;

        this.cdr.markForCheck();
      }

      return;
    }

    // Abonnements locaux

    if (!this.localChurch) {

      return;
    }

    if (this.isFollowing) {

      this.churchService.unfollowChurch(
        this.localChurch.id,
        user.id
      );

    } else {

      this.churchService.followChurch(
        this.localChurch.id,
        user.id
      );
    }

    this.cdr.markForCheck();
  }

  // ==========================================
  // LIKES FIREBASE
  // ==========================================

  private async fetchOnlineLikes(
    message: OnlinePublication
  ) {

    const uid = this.authService.getCurrentUser()?.uid;

    if (!uid || !this.isCurrentSession(uid)) {

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
      'DAILY FAITH : Likes profil Firebase =',
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
        'DAILY FAITH : Erreur chargement likes profil',
        error
      );

      this.onlineLikes.delete(key);

      this.likesErrors.add(key);

    } finally {

      this.likesLoading.delete(key);

      this.cdr.markForCheck();
    }
  }

  // Vérifier le chargement

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

    return !this.loading
      && !this.publicationsLoading
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
        'DAILY FAITH : Erreur modification like profil',
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

    if (!uid || !this.isCurrentSession(uid)) {

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
      'DAILY FAITH : Commentaires profil Firebase =',
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
        'DAILY FAITH : Erreur chargement commentaires profil',
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
      this.publicationsLoading ||
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

  // Afficher ou masquer les commentaires

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
      this.publicationsLoading ||
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
      && !this.loading
      && !this.publicationsLoading
      && !this.isCommentLoading(message)
      && !this.hasCommentError(message)
      && content.length > 0
      && content.length <= 2000;
  }

  // Ajouter un commentaire

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

      if (
        this.getNewComment(message).trim() === content
      ) {

        this.commentInputs.delete(key);
      }

      await this.fetchOnlineComments(message);

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur publication commentaire profil',
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
  // MODERATION DES COMMENTAIRES
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

    // L'auteur peut supprimer son commentaire.
    // Le pasteur propriétaire peut modérer son église.

    return comment.authorUid === user.uid
      || (
        this.authService.isAdmin()
        && message.church.ownerUid === user.uid
      );
  }

  // Supprimer un commentaire Firebase

  async deleteOnlineComment(
    message: FeedMessage,
    comment: OnlineComment
  ) {

    if (
      !this.isOnlineMessage(message) ||
      !this.canDeleteComment(message, comment) ||
      this.isCommentLoading(message) ||
      this.publicationsLoading
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
        'DAILY FAITH : Erreur suppression commentaire profil',
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

  // Afficher les publications

  showPublications() {

    this.activeTab = 'publications';

    this.cdr.markForCheck();
  }

  // Afficher les événements

  showEvents() {

    this.activeTab = 'events';

    this.cdr.markForCheck();
  }

  // Retour à la page précédente

  goBack() {

    if (
      this.followLoading ||
      this.publicationsLoading ||
      this.interactionsLoading
    ) {

      return;
    }

    if (this.router.canGoBack()) {

      this.router.back();

      return;
    }

    const destination = this.authService.isAdmin()
      ? '/manage-churches'
      : '/search';

    this.router.navigate([destination], {

      clearHistory: true

    });
  }
}