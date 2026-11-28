import { Injectable } from '@angular/core';

import { firebase } from '@nativescript/firebase-core';

import { FieldValue } from '@nativescript/firebase-firestore';

import { AuthService } from './auth.service';

export interface OnlineComment {

  id: string;
  authorUid: string;
  authorName: string;
  content: string;
  createdAt: any;
  date: string;
}

export interface PublicationInteractions {

  likes: number;
  liked: boolean;
  commentsCount: number;
  comments: OnlineComment[];
}

@Injectable({
  providedIn: 'root'
})
export class InteractionFirestoreService {

  constructor(
    private authService: AuthService
  ) {}

  // Vérifier la connexion

  private requireUser() {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {

      throw new Error('Vous devez vous connecter.');
    }

    return user;
  }

  // Vérifier la session

  private checkSession(uid: string) {

    if (this.requireUser().uid !== uid) {

      throw new Error('La session a changé.');
    }
  }

  // Référence de la publication

  private publication(
    churchId: string,
    publicationId: string
  ) {

    return firebase()
      .firestore()
      .collection('churches')
      .doc(churchId)
      .collection('publications')
      .doc(publicationId);
  }

  // Collection des likes

  private likesCollection(
    churchId: string,
    publicationId: string
  ) {

    return this.publication(
      churchId,
      publicationId
    ).collection('likes');
  }

  // Collection des commentaires

  private commentsCollection(
    churchId: string,
    publicationId: string
  ) {

    return this.publication(
      churchId,
      publicationId
    ).collection('comments');
  }

  // ==========================================
  // GESTION DES LIKES
  // ==========================================

  // Vérifier si le membre aime la publication

  async isLiked(
    churchId: string,
    publicationId: string
  ): Promise<boolean> {

    const user = this.requireUser();

    const snapshot = await this.likesCollection(
      churchId,
      publicationId
    ).doc(user.uid).get();

    this.checkSession(user.uid);

    return snapshot.exists;
  }

  // Nombre de likes

  async getLikesCount(
    churchId: string,
    publicationId: string
  ): Promise<number> {

    const user = this.requireUser();

    const snapshot = await this.likesCollection(
      churchId,
      publicationId
    ).get();

    this.checkSession(user.uid);

    return snapshot.docs.length;
  }

  // Ajouter ou retirer un like

  async toggleLike(
    churchId: string,
    publicationId: string
  ): Promise<boolean> {

    const user = this.requireUser();

    const reference = this.likesCollection(
      churchId,
      publicationId
    ).doc(user.uid);

    const snapshot = await reference.get();

    this.checkSession(user.uid);

    if (snapshot.exists) {

      await reference.delete();

      console.log(
        'DAILY FAITH : Like Firebase supprimé.',
        publicationId
      );

      return false;
    }

    await reference.set({

      createdAt: FieldValue.serverTimestamp()

    });

    console.log(
      'DAILY FAITH : Like Firebase enregistré.',
      publicationId
    );

    return true;
  }

  // ==========================================
  // GESTION DES COMMENTAIRES
  // ==========================================

  // Formater la date

  private formatDate(value: any): string {

    if (!value) {

      return 'Date indisponible';
    }

    const date =
      typeof value.toDate === 'function'
        ? value.toDate()
        : typeof value.seconds === 'number'
          ? new Date(value.seconds * 1000)
          : new Date(value);

    if (!Number.isFinite(date.getTime())) {

      return 'Date indisponible';
    }

    return date.toLocaleString('fr-CA');
  }

  // Charger les commentaires

  async getComments(
    churchId: string,
    publicationId: string
  ): Promise<OnlineComment[]> {

    const user = this.requireUser();

    const snapshot = await this.commentsCollection(
      churchId,
      publicationId
    )
      .orderBy('createdAt', 'desc')
      .get();

    this.checkSession(user.uid);

    const comments = snapshot.docs.map(doc => {

      const data = doc.data();

      return {

        id: doc.id,

        authorUid: data.authorUid,

        authorName: data.authorName,

        content: data.content,

        createdAt: data.createdAt,

        date: this.formatDate(data.createdAt)

      } as OnlineComment;
    });

    console.log(
      'DAILY FAITH : Commentaires Firebase chargés =',
      comments.length
    );

    return comments;
  }

  // Ajouter un commentaire

  async addComment(
    churchId: string,
    publicationId: string,
    content: string
  ): Promise<string> {

    const user = this.requireUser();

    const message = content.trim();

    if (!message) {

      throw new Error(
        'Veuillez écrire un commentaire.'
      );
    }

    if (message.length > 2000) {

      throw new Error(
        'Le commentaire ne doit pas dépasser 2000 caractères.'
      );
    }

    const profile = await firebase()
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get();

    this.checkSession(user.uid);

    const authorName = profile.data()?.name;

    if (
      !profile.exists ||
      typeof authorName !== 'string' ||
      !authorName.trim()
    ) {

      throw new Error(
        'Impossible de récupérer votre nom.'
      );
    }

    const reference = await this.commentsCollection(
      churchId,
      publicationId
    ).add({

      authorUid: user.uid,

      authorName: authorName,

      content: message,

      createdAt: FieldValue.serverTimestamp()

    });

    console.log(
      'DAILY FAITH : Commentaire Firebase enregistré.',
      reference.id
    );

    return reference.id;
  }

  // Supprimer un commentaire

  async deleteComment(
    churchId: string,
    publicationId: string,
    commentId: string
  ): Promise<void> {

    this.requireUser();

    await this.commentsCollection(
      churchId,
      publicationId
    ).doc(commentId).delete();

    console.log(
      'DAILY FAITH : Commentaire Firebase supprimé.',
      commentId
    );
  }

  // ==========================================
  // CHARGER TOUTES LES INTERACTIONS
  // ==========================================

  async getInteractions(
    churchId: string,
    publicationId: string
  ): Promise<PublicationInteractions> {

    const user = this.requireUser();

    const [likesSnapshot, comments] =
      await Promise.all([

        this.likesCollection(
          churchId,
          publicationId
        ).get(),

        this.getComments(
          churchId,
          publicationId
        )

      ]);

    this.checkSession(user.uid);

    const liked = likesSnapshot.docs.some(
      doc => doc.id === user.uid
    );

    return {

      likes: likesSnapshot.docs.length,

      liked: liked,

      commentsCount: comments.length,

      comments: comments

    };
  }
}