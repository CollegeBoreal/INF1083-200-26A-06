import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { ChurchService } from './church.service';
import { AuthService } from './auth.service';

export interface Comment {
  authorId?: number;
  author: string;
  content: string;
  date: string;
}

export interface Message {

  id: number;
  churchId?: number;
  authorId?: number;

  title: string;
  author: string;
  verse: string;
  content: string;
  date: string;

  likes: number;
  liked: boolean;
  likedBy?: number[];

  comments: Comment[];
  newComment: string;
  showComments: boolean;

}

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private storageKey = 'dailyfaith_messages';

  private nextId = 4;

  messages: Message[] = [

    {
      id: 1,
      title: 'Gardez la foi',
      author: 'Pasteur',
      verse: 'Philippiens 4:13',
      content: 'Faites confiance à Dieu, même dans les moments difficiles.',
      date: '27 novembre 2026',
      likes: 0,
      liked: false,
      likedBy: [],
      comments: [],
      newComment: '',
      showComments: false
    },

    {
      id: 2,
      title: 'La puissance de la prière',
      author: 'Pasteur',
      verse: '1 Thessaloniciens 5:17',
      content: 'Prenez chaque jour un moment pour parler avec Dieu.',
      date: '27 novembre 2026',
      likes: 0,
      liked: false,
      likedBy: [],
      comments: [],
      newComment: '',
      showComments: false
    },

    {
      id: 3,
      title: 'Marcher dans l’amour',
      author: 'Pasteur',
      verse: 'Jean 13:34',
      content: 'Aimons notre prochain comme Jésus nous a aimés.',
      date: '27 novembre 2026',
      likes: 0,
      liked: false,
      likedBy: [],
      comments: [],
      newComment: '',
      showComments: false
    }

  ];

  private interactionUserId: number | null = null;

  constructor(
    private churchService: ChurchService,
    private authService: AuthService
  ) {

    this.loadMessages();

  }

  // Charger les publications

  private loadMessages() {

    const savedMessages = ApplicationSettings.getString(
      this.storageKey,
      ''
    );

    if (savedMessages) {

      try {

        const data = JSON.parse(savedMessages);

        this.messages = data.messages;
        this.nextId = data.nextId;

      } catch (error) {

        console.error(
          'Erreur de chargement des messages',
          error
        );

      }

    }

    // Compatibilité avec les anciennes publications

    this.messages.forEach(message => {

      message.likedBy = Array.isArray(message.likedBy)
        ? [...new Set(message.likedBy)]
        : [];

      message.likes = message.likedBy.length;

      message.liked = false;
      message.newComment = '';
      message.showComments = false;

      message.comments = message.comments || [];

    });

    this.saveMessages();

  }

  // Actualiser les interactions du membre connecté

  private refreshInteractions() {

    const userId =
      this.authService.getCurrentUser()?.id ?? null;

    const userChanged = this.interactionUserId !== userId;

    this.messages.forEach(message => {

      message.likedBy = message.likedBy || [];

      message.likes = message.likedBy.length;

      message.liked =
        userId !== null &&
        message.likedBy.includes(userId);

      if (userChanged) {

        message.newComment = '';
        message.showComments = false;

      }

    });

    this.interactionUserId = userId;

  }

  // Sauvegarder les publications

  saveMessages() {

    const data = {

      messages: this.messages.map(message => ({

        ...message,

        likes: message.likedBy?.length ?? 0,

        liked: false,

        newComment: '',

        showComments: false

      })),

      nextId: this.nextId

    };

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify(data)
    );

  }

  // Toutes les publications

  getMessages(): Message[] {

    this.refreshInteractions();

    return this.messages;

  }

  // Publications d'une église

  getChurchMessages(churchId: number): Message[] {

    return this.getMessages().filter(
      message => message.churchId === churchId
    );

  }

  // Publications d'un pasteur

  getPastorMessages(pastorId: number): Message[] {

    return this.getMessages().filter(
      message => message.authorId === pastorId
    );

  }

  // Publications des églises suivies

  getFollowedChurchMessages(userId: number): Message[] {

    const churchIds = this.churchService
      .getFollowedChurches(userId)
      .map(church => church.id);

    return this.getMessages().filter(
      message =>
        message.churchId !== undefined &&
        churchIds.includes(message.churchId)
    );

  }

  // Publier un message

  addMessage(
    title: string,
    verse: string,
    content: string,
    churchId?: number
  ): boolean {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return false;
    }

    if (
      !title.trim() ||
      !verse.trim() ||
      !content.trim()
    ) {
      return false;
    }

    const church = churchId !== undefined
      ? this.churchService.getChurchById(churchId)
      : undefined;

    if (!church || church.ownerId !== user.id) {
      return false;
    }

    this.messages.unshift({

      id: this.nextId++,

      churchId: church.id,
      authorId: user.id,

      title: title.trim(),
      author: church.pastor,
      verse: verse.trim(),
      content: content.trim(),

      date: new Date().toLocaleDateString('fr-CA'),

      likes: 0,
      liked: false,
      likedBy: [],

      comments: [],
      newComment: '',
      showComments: false

    });

    this.saveMessages();

    return true;

  }

  // Modifier une publication

  updateMessage(
    id: number,
    title: string,
    verse: string,
    content: string
  ) {

    const user = this.authService.getCurrentUser();

    const message = this.messages.find(
      item => item.id === id
    );

    if (
      !user ||
      !this.authService.isAdmin() ||
      !message ||
      message.authorId !== user.id ||
      !title.trim() ||
      !verse.trim() ||
      !content.trim()
    ) {
      return;
    }

    message.title = title.trim();
    message.verse = verse.trim();
    message.content = content.trim();

    this.saveMessages();

  }

  // Supprimer une publication

  deleteMessage(id: number) {

    const user = this.authService.getCurrentUser();

    const index = this.messages.findIndex(
      message => message.id === id
    );

    if (
      !user ||
      !this.authService.isAdmin() ||
      index === -1 ||
      this.messages[index].authorId !== user.id
    ) {
      return;
    }

    this.messages.splice(index, 1);

    this.saveMessages();

  }

  // Vérifier si le membre a aimé la publication

  isLikedByCurrentUser(message: Message): boolean {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return false;
    }

    return message.likedBy?.includes(user.id) ?? false;

  }

  // Aimer ou retirer son propre like

  toggleLike(message: Message) {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    const publication = this.messages.find(
      item => item.id === message.id
    );

    if (!publication) {
      return;
    }

    publication.likedBy = publication.likedBy || [];

    if (publication.likedBy.includes(user.id)) {

      publication.likedBy = publication.likedBy.filter(
        id => id !== user.id
      );

    } else {

      publication.likedBy.push(user.id);

    }

    publication.likes = publication.likedBy.length;

    publication.liked = publication.likedBy.includes(
      user.id
    );

    this.saveMessages();

  }

  // Ajouter un commentaire

  addComment(message: Message, content: string) {

    const user = this.authService.getCurrentUser();

    if (!user || !content.trim()) {
      return;
    }

    const publication = this.messages.find(
      item => item.id === message.id
    );

    if (!publication) {
      return;
    }

    publication.comments.push({

      authorId: user.id,

      author: user.name,

      content: content.trim(),

      date: new Date().toLocaleString('fr-CA')

    });

    publication.newComment = '';

    this.saveMessages();

  }

  // Compter les publications

  getTotalMessages(): number {

    return this.messages.length;

  }

  getChurchMessagesCount(churchId: number): number {

    return this.getChurchMessages(churchId).length;

  }

}