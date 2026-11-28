import { Injectable } from '@angular/core';

import { firebase } from '@nativescript/firebase-core';

import { FieldValue } from '@nativescript/firebase-firestore';

import { AuthService } from './auth.service';

import {
  ChurchFirestoreService
} from './church-firestore.service';

export interface FirestoreMessage {

  id: string;
  churchId: string;
  authorUid: string;

  title: string;
  verse: string;
  content: string;

  createdAt: any;
  updatedAt: any;
}

export interface MessageInput {

  title: string;
  verse: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageFirestoreService {

  constructor(
    private authService: AuthService,
    private churchService: ChurchFirestoreService
  ) {}

  // Collection des publications d'une église

  private collection(churchId: string) {

    return firebase()
      .firestore()
      .collection('churches')
      .doc(churchId)
      .collection('publications');
  }

  // Vérifier les informations

  private normalizeInput(
    input: MessageInput
  ): MessageInput {

    const data = {
      title: input.title.trim(),
      verse: input.verse.trim(),
      content: input.content.trim()
    };

    if (
      !data.title ||
      !data.verse ||
      !data.content
    ) {
      throw new Error(
        'Veuillez remplir tous les champs.'
      );
    }

    if (
      data.title.length > 200 ||
      data.verse.length > 300 ||
      data.content.length > 20000
    ) {
      throw new Error(
        'La publication dépasse la longueur autorisée.'
      );
    }

    return data;
  }

  // Vérifier le propriétaire de l'église

  private async requireOwner(churchId: string) {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {

      throw new Error(
        'Accès réservé aux pasteurs.'
      );
    }

    const church =
      await this.churchService.getChurchById(churchId);

    if (!church || church.ownerUid !== user.uid) {

      throw new Error(
        'Cette église ne vous appartient pas.'
      );
    }

    if (
      this.authService.getCurrentUser()?.uid !== user.uid
    ) {
      throw new Error('La session a changé.');
    }

    return user;
  }

  // Publier un message biblique

  async createMessage(
    churchId: string,
    input: MessageInput
  ): Promise<string> {

    const user = await this.requireOwner(churchId);

    const data = this.normalizeInput(input);

    const reference = await this.collection(churchId)
      .add({

        ...data,

        authorUid: user.uid,

        createdAt: FieldValue.serverTimestamp(),

        updatedAt: FieldValue.serverTimestamp()

      });

    console.log(
      'DAILY FAITH : Publication Firebase créée.',
      reference.id
    );

    return reference.id;
  }

  // Récupérer les publications d'une église

  async getChurchMessages(
    churchId: string
  ): Promise<FirestoreMessage[]> {

    if (!this.authService.isLoggedIn()) {
      return [];
    }

    const snapshot = await this.collection(churchId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({

      ...doc.data(),

      id: doc.id,

      churchId

    } as FirestoreMessage));
  }

  // Modifier une publication

  async updateMessage(
    churchId: string,
    messageId: string,
    input: MessageInput
  ): Promise<void> {

    await this.requireOwner(churchId);

    const data = this.normalizeInput(input);

    await this.collection(churchId)
      .doc(messageId)
      .update({

        ...data,

        updatedAt: FieldValue.serverTimestamp()

      });

    console.log(
      'DAILY FAITH : Publication Firebase modifiée.',
      messageId
    );
  }

  // Supprimer une publication

  async deleteMessage(
    churchId: string,
    messageId: string
  ): Promise<void> {

    await this.requireOwner(churchId);

    await this.collection(churchId)
      .doc(messageId)
      .delete();

    console.log(
      'DAILY FAITH : Publication Firebase supprimée.',
      messageId
    );
  }
}