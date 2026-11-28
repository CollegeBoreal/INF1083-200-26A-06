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

import { alert } from '@nativescript/core';

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

import { AuthService } from '../services/auth.service';

import { ChurchImageService } from '../services/church-image.service';

type FeedMessage = Message | OnlinePublication;

type FeedChurch = Church | FirestoreChurch;

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

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private publicationFeed: PublicationFeedService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    await this.loadFeed();
  }

  // Charger les publications Firebase

  async loadFeed() {

    if (this.loading) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {
      this.onlineChurches = [];
      this.onlineMessages = [];
      return;
    }

    this.loading = true;

    this.errorMessage = '';

    this.onlineChurches = [];

    this.onlineMessages = [];

    this.cdr.markForCheck();

    try {

      const result =
        await this.publicationFeed.followed();

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      this.onlineChurches = result.churches;

      this.onlineMessages = result.publications;

      if (result.partial) {

        this.errorMessage =
          'Certaines publications sont indisponibles.';
      }

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

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {

        this.onlineChurches = [];

        this.onlineMessages = [];
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

  // Likes locaux

  isLiked(message: FeedMessage): boolean {

    return this.isOnlineMessage(message)
      ? false
      : message.liked;
  }

  getLikes(message: FeedMessage): number | string {

    return this.isOnlineMessage(message)
      ? '—'
      : message.likes;
  }

  toggleLike(message: FeedMessage) {

    if (this.isOnlineMessage(message)) {
      return;
    }

    this.messageService.toggleLike(message);

    this.cdr.markForCheck();
  }

  // Commentaires locaux

  getComments(message: FeedMessage) {

    return this.isOnlineMessage(message)
      ? []
      : message.comments;
  }

  getCommentsCount(
    message: FeedMessage
  ): number | string {

    return this.isOnlineMessage(message)
      ? '—'
      : message.comments.length;
  }

  showComments(message: FeedMessage): boolean {

    return this.isOnlineMessage(message)
      ? false
      : message.showComments;
  }

  getNewComment(message: FeedMessage): string {

    return this.isOnlineMessage(message)
      ? ''
      : message.newComment;
  }

  toggleComments(message: FeedMessage) {

    if (this.isOnlineMessage(message)) {
      return;
    }

    message.showComments = !message.showComments;

    this.cdr.markForCheck();
  }

  onCommentChange(
    args: any,
    message: FeedMessage
  ) {

    if (this.isOnlineMessage(message)) {
      return;
    }

    message.newComment = args.object.text || '';
  }

  addComment(message: FeedMessage) {

    if (this.isOnlineMessage(message)) {
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

    this.cdr.markForCheck();
  }

  // Navigation vers la recherche

  discoverChurches() {

    this.router.navigate(['/search'], {
      clearHistory: true
    });
  }

  // Navigation vers mes églises

  goToMyChurches() {

    this.router.navigate(['/my-churches'], {
      clearHistory: true
    });
  }

  // Navigation vers les notifications

  goToNotifications() {

    this.router.navigate(['/notifications'], {
      clearHistory: true
    });
  }

  // Navigation vers les événements

  goToEvents() {

    this.router.navigate(['/events'], {
      clearHistory: true
    });
  }

  // Navigation vers les messages bibliques

  goToMessages() {

    this.router.navigate(['/messages']);
  }

  // Déconnexion

  async logout() {

    try {

      await this.authService.logout();

      this.onlineChurches = [];

      this.onlineMessages = [];

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