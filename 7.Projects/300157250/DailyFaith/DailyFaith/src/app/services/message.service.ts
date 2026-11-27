
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

export interface Comment {
  author: string;
  content: string;
  date: string;
}

export interface Message {
  id: number;
  title: string;
  author: string;
  verse: string;
  content: string;
  date: string;
  likes: number;
  liked: boolean;
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
      comments: [],
      newComment: '',
      showComments: false
    }
  ];

  constructor() {
    this.loadMessages();
  }

  // Charger les messages sauvegardés
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
        console.error('Erreur de chargement des messages', error);
      }
    }
  }

  // Sauvegarder les messages
  saveMessages() {

    const data = {
      messages: this.messages.map(message => ({
        ...message,
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

  getMessages(): Message[] {
    return this.messages;
  }

  // Publier un message
  addMessage(
    title: string,
    verse: string,
    content: string
  ) {

    this.messages.unshift({
      id: this.nextId++,
      title: title.trim(),
      author: 'Pasteur',
      verse: verse.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('fr-CA'),
      likes: 0,
      liked: false,
      comments: [],
      newComment: '',
      showComments: false
    });

    this.saveMessages();
  }

  // Modifier un message
  updateMessage(
    id: number,
    title: string,
    verse: string,
    content: string
  ) {

    const message = this.messages.find(m => m.id === id);

    if (message) {

      message.title = title.trim();
      message.verse = verse.trim();
      message.content = content.trim();

      this.saveMessages();
    }
  }

  // Supprimer un message
  deleteMessage(id: number) {

    const index = this.messages.findIndex(m => m.id === id);

    if (index !== -1) {

      this.messages.splice(index, 1);

      this.saveMessages();
    }
  }

  // Aimer un message
  toggleLike(message: Message) {

    message.liked = !message.liked;
    message.likes += message.liked ? 1 : -1;

    this.saveMessages();
  }

  // Ajouter un commentaire
  addComment(message: Message, content: string) {

    if (!content.trim()) {
      return;
    }

    message.comments.push({
      author: 'Membre Daily Faith',
      content: content.trim(),
      date: new Date().toLocaleString('fr-CA')
    });

    message.newComment = '';

    this.saveMessages();
  }

  // Compter les messages
  getTotalMessages(): number {
    return this.messages.length;
  }
}
