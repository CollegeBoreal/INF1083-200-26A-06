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

import { alert } from '@nativescript/core';

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
    private publicationFeed: PublicationFeedService
  ) {}

  // Initialisation du profil

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

        if (
          this.authService.getCurrentUser()?.uid !== user.uid
        ) {
          return;
        }

        this.onlineChurch = church;

        this.church = church;

        if (church) {

          await this.loadFollowStatus();

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

      this.loading = false;

      this.cdr.markForCheck();
    }
  }

  // Charger l'état de l'abonnement

  async loadFollowStatus() {

    if (!this.onlineChurch) {
      return;
    }

    this.followReady = false;

    try {

      if (this.isOwner) {

        this.onlineFollowersCount =
          await this.firestoreService.getFollowersCount(
            this.onlineChurch.id
          );

      } else {

        this.followingOnline =
          await this.firestoreService.isFollowing(
            this.onlineChurch.id
          );
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
      this.publicationsLoading
    ) {
      return;
    }

    this.publicationsLoading = true;

    this.publicationsReady = false;

    this.publicationsError = '';

    this.onlinePublications = [];

    this.cdr.markForCheck();

    try {

      const publications =
        await this.publicationFeed.forChurch(church);

      if (
        this.authService.getCurrentUser()?.uid !== uid ||
        !this.authService.isLoggedIn()
      ) {
        return;
      }

      this.onlinePublications = publications.sort(
        (a, b) => b.sortTime - a.sortTime
      );

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

  // ==========================================
  // ÉVÉNEMENTS
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
  }

  // ==========================================
  // ABONNEMENTS
  // ==========================================

  // Vérifier l'abonnement

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

  // Vérifier le propriétaire de l'église

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

          this.followingOnline = false;

        } else {

          await this.firestoreService.followChurch(
            churchId
          );

          this.followingOnline = true;
        }

      } catch (error) {

        console.error(
          'DAILY FAITH : Erreur abonnement Firebase',
          error
        );

        await this.loadFollowStatus();

        await alert({
          title: 'Abonnement',
          message: 'Impossible de modifier votre abonnement. Vérifiez votre connexion.',
          okButtonText: 'OK'
        });

      } finally {

        this.followLoading = false;

        this.cdr.markForCheck();
      }

      return;
    }

    // Abonnements des anciennes églises locales

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
  // LIKES ET COMMENTAIRES LOCAUX
  // ==========================================

  // Aimer une publication

  toggleLike(message: Message) {

    if (this.online) {
      return;
    }

    this.messageService.toggleLike(message);
  }

  // Afficher ou masquer les commentaires

  toggleComments(message: Message) {

    message.showComments = !message.showComments;
  }

  // Récupérer le texte du commentaire

  onCommentChange(args: any, message: Message) {

    message.newComment = args.object.text || '';
  }

  // Ajouter un commentaire

  addComment(message: Message) {

    if (this.online) {
      return;
    }

    if (!message.newComment.trim()) {

      alert('Veuillez écrire un commentaire.');

      return;
    }

    this.messageService.addComment(
      message,
      message.newComment
    );
  }

  // ==========================================
  // NAVIGATION
  // ==========================================

  // Afficher les publications

  showPublications() {

    this.activeTab = 'publications';
  }

  // Afficher les événements

  showEvents() {

    this.activeTab = 'events';
  }

  // Retour à la page précédente

  goBack() {

    if (this.followLoading) {
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