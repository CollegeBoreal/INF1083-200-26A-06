import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

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

import { AuthService } from '../services/auth.service';
import { ChurchImageService } from '../services/church-image.service';

@Component({
  selector: 'ns-home',
  standalone: true,
  imports: [NativeScriptCommonModule, NavigationComponent],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(
    private router: RouterExtensions,
    private messageService: MessageService,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService
  ) {}

  // Nom du membre connecté

  get memberName(): string {

    return this.authService.getCurrentUser()?.name || 'Membre';

  }

  // Églises suivies

  get churches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return [];
    }

    return this.churchService.getFollowedChurches(user.id);

  }

  // Fil d'actualité personnalisé

  get messages(): Message[] {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return [];
    }

    return this.messageService
      .getFollowedChurchMessages(user.id)
      .sort((a, b) => b.id - a.id);

  }

  // Dernière publication

  get latestMessage(): Message | undefined {

    return this.messages[0];

  }

  // Informations sur les églises

  getChurchName(message: Message): string {

    if (message.churchId === undefined) {
      return 'Église inconnue';
    }

    return this.churchService
      .getChurchById(message.churchId)?.name
      || 'Église inconnue';

  }

  getLogoPath(church: Church): string {

    return this.imageService.getImagePath(church.logo || '');

  }

  getMessageLogo(message: Message): string {

    if (message.churchId === undefined) {
      return '';
    }

    const church = this.churchService.getChurchById(
      message.churchId
    );

    return church?.logo
      ? this.getLogoPath(church)
      : '';

  }

  // Ouvrir le profil d'une église

  viewChurch(church: Church) {

    this.router.navigate(['/church-profile', church.id]);

  }

  viewMessageChurch(message: Message) {

    if (message.churchId === undefined) {
      return;
    }

    this.router.navigate([
      '/church-profile',
      message.churchId
    ]);

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

  // Navigation

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

  logout() {

    this.authService.logout();

    this.router.navigate(['/login'], {
      clearHistory: true
    });

  }

}