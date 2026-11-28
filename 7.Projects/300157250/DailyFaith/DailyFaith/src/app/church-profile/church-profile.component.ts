import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA
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

@Component({
  selector: 'ns-church-profile',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './church-profile.component.html',
  styleUrls: ['./church-profile.component.css']
})

export class ChurchProfileComponent implements OnInit {

  church: Church | undefined;

  activeTab: 'publications' | 'events' = 'publications';

  constructor(
    private route: ActivatedRoute,
    private router: RouterExtensions,
    private churchService: ChurchService,
    private authService: AuthService,
    private imageService: ChurchImageService,
    private messageService: MessageService,
    private eventService: EventService
  ) {}

  ngOnInit() {

    const churchId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.church = this.churchService.getChurchById(churchId);

  }

  // Logo

  get logoPath(): string {

    return this.imageService.getImagePath(
      this.church?.logo || ''
    );

  }

  // Couverture

  get coverPath(): string {

    return this.imageService.getImagePath(
      this.church?.cover || ''
    );

  }

  // Abonnés

  get followersCount(): number {

    return this.church?.followers.length ?? 0;

  }

  // Publications

  get publications(): Message[] {

    if (!this.church) {
      return [];
    }

    return this.messageService.getChurchMessages(
      this.church.id
    );

  }

  get publicationsCount(): number {

    return this.publications.length;

  }

  // Événements de cette église

  get events(): ChurchEvent[] {

    if (!this.church) {
      return [];
    }

    return this.eventService
      .getChurchEvents(this.church.id)
      .sort((a, b) => b.id - a.id);

  }

  get eventsCount(): number {

    return this.events.length;

  }

  // Nombre de participants

  getParticipantsCount(event: ChurchEvent): number {

    return this.eventService.getParticipantsCount(event);

  }

  // Vérifier la participation

  isRegistered(event: ChurchEvent): boolean {

    return this.eventService.isRegistered(event);

  }

  get canParticipate(): boolean {

    return this.authService.isLoggedIn() &&
      !this.authService.isAdmin();

  }

  // Confirmer ou annuler la participation

  participate(event: ChurchEvent) {

    if (!this.canParticipate) {
      return;
    }

    this.eventService.toggleParticipation(event);

  }

  // Vérifier l'abonnement

  get isFollowing(): boolean {

    const user = this.authService.getCurrentUser();

    if (!user || !this.church) {
      return false;
    }

    return this.churchService.isFollowing(
      this.church.id,
      user.id
    );

  }

  // Vérifier le propriétaire

  get isOwner(): boolean {

    const user = this.authService.getCurrentUser();

    return !!user && this.church?.ownerId === user.id;

  }

  // S'abonner ou se désabonner

  toggleFollow() {

    const user = this.authService.getCurrentUser();

    if (!user || !this.church || this.isOwner) {
      return;
    }

    if (this.isFollowing) {

      this.churchService.unfollowChurch(
        this.church.id,
        user.id
      );

    } else {

      this.churchService.followChurch(
        this.church.id,
        user.id
      );

    }

  }

  // Likes

  toggleLike(message: Message) {

    this.messageService.toggleLike(message);

  }

  // Commentaires

  toggleComments(message: Message) {

    message.showComments = !message.showComments;

  }

  onCommentChange(args: any, message: Message) {

    message.newComment = args.object.text || '';

  }

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

  // Onglet Publications

  showPublications() {

    this.activeTab = 'publications';

  }

  // Onglet Événements

  showEvents() {

    this.activeTab = 'events';

  }

  // Retour

  goBack() {

    if (this.router.canGoBack()) {

      this.router.back();

      return;

    }

    const destination = this.authService.isAdmin()
      ? '/manage-churches'
      : '/my-churches';

    this.router.navigate([destination], {
      clearHistory: true
    });

  }

}