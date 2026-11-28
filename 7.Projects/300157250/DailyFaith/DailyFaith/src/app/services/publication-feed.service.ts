import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

import {
  ChurchFirestoreService,
  FirestoreChurch
} from './church-firestore.service';

import {
  MessageFirestoreService,
  FirestoreMessage
} from './message-firestore.service';

export interface OnlinePublication extends FirestoreMessage {

  church: FirestoreChurch;

  date: string;

  sortTime: number;

  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicationFeedService {

  constructor(
    private auth: AuthService,
    private churches: ChurchFirestoreService,
    private messages: MessageFirestoreService
  ) {}

  // Récupérer les publications d'une église

  async forChurch(
    church: FirestoreChurch
  ): Promise<OnlinePublication[]> {

    const uid = this.auth.getCurrentUser()?.uid;

    if (!uid || !this.auth.isLoggedIn()) {
      throw new Error('Session invalide.');
    }

    const messages =
      await this.messages.getChurchMessages(church.id);

    if (
      this.auth.getCurrentUser()?.uid !== uid ||
      !this.auth.isLoggedIn()
    ) {
      throw new Error('Session modifiée.');
    }

    return messages.map(message => {

      const value = message.createdAt;

      const date = !value
        ? new Date(NaN)
        : typeof value.toDate === 'function'
          ? value.toDate()
          : typeof value.seconds === 'number'
            ? new Date(value.seconds * 1000)
            : new Date(value);

      const time = date.getTime();

      return {

        ...message,

        church,

        key: `${church.id}:${message.id}`,

        sortTime: Number.isFinite(time)
          ? time
          : 0,

        date: Number.isFinite(time)
          ? date.toLocaleDateString('fr-CA')
          : 'Date indisponible'

      };

    });
  }

  // Récupérer les publications des églises suivies

  async followed() {

    const uid = this.auth.getCurrentUser()?.uid;

    if (!uid || !this.auth.isLoggedIn()) {
      throw new Error('Session invalide.');
    }

    const churches =
      await this.churches.getFollowedChurches();

    const results = await Promise.allSettled(

      churches.map(church => this.forChurch(church))

    );

    if (
      this.auth.getCurrentUser()?.uid !== uid ||
      !this.auth.isLoggedIn()
    ) {
      throw new Error('Session modifiée.');
    }

    const publications: OnlinePublication[] = [];

    let partial = false;

    for (const result of results) {

      if (result.status === 'fulfilled') {

        publications.push(...result.value);

      } else {

        partial = true;

        console.error(
          'DAILY FAITH : Erreur publication',
          result.reason
        );
      }
    }

    // Trier les publications de la plus récente
    // à la plus ancienne

    publications.sort(
      (a, b) => b.sortTime - a.sortTime
    );

    console.log(
      'DAILY FAITH : Fil Firebase chargé =',
      publications.length
    );

    return {
      churches,
      publications,
      partial
    };
  }
}