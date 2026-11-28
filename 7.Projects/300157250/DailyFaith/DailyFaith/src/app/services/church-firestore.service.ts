import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import { FieldValue } from '@nativescript/firebase-firestore';
import { AuthService } from './auth.service';

export interface FirestoreChurch {
  id: string;
  ownerUid: string;
  name: string;
  username: string;
  pastor: string;
  country: string;
  city: string;
  address: string;
  description: string;
  logo: string;
  cover: string;
  createdAt: any;
}

export interface ChurchInput {
  name: string;
  username: string;
  pastor: string;
  country: string;
  city: string;
  address: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChurchFirestoreService {

  constructor(
    private authService: AuthService
  ) {}

  private get collection() {
    return firebase()
      .firestore()
      .collection('churches');
  }

  private normalizeInput(input: ChurchInput): ChurchInput {

    const data = {
      name: input.name.trim(),
      username: input.username
        .trim()
        .toLowerCase()
        .replace(/^@/, ''),
      pastor: input.pastor.trim(),
      country: input.country.trim(),
      city: input.city.trim(),
      address: input.address.trim(),
      description: input.description.trim()
    };

    if (
      !data.name ||
      !data.pastor ||
      !data.country ||
      !data.city ||
      !/^[a-z0-9_.]+$/.test(data.username)
    ) {
      throw new Error('Informations invalides.');
    }

    return data;
  }

  private async checkUsername(
    username: string,
    excludedId?: string
  ): Promise<void> {

    const snapshot = await this.collection
      .where('username', '==', username)
      .get();

    const exists = snapshot.docs.some(
      doc => doc.id !== excludedId
    );

    if (exists) {
      throw new Error('Cet identifiant est déjà utilisé.');
    }
  }

  // Créer une église

  async createChurch(
    input: ChurchInput
  ): Promise<string> {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      throw new Error('Accès réservé aux pasteurs.');
    }

    const data = this.normalizeInput(input);

    await this.checkUsername(data.username);

    const reference = await this.collection.add({
      ...data,
      ownerUid: user.uid,
      logo: '',
      cover: '',
      createdAt: FieldValue.serverTimestamp()
    });

    console.log(
      'DAILY FAITH : Église créée dans Firestore.',
      reference.id
    );

    return reference.id;
  }

  // Modifier une église

  async updateChurch(
    churchId: string,
    input: ChurchInput
  ): Promise<boolean> {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      throw new Error('Accès non autorisé.');
    }

    const church = await this.getChurchById(churchId);

    if (!church || church.ownerUid !== user.uid) {
      throw new Error('Cette église ne vous appartient pas.');
    }

    const data = this.normalizeInput(input);

    await this.checkUsername(data.username, churchId);

    await this.collection
      .doc(churchId)
      .update(data);

    console.log(
      'DAILY FAITH : Église modifiée dans Firestore.',
      churchId
    );

    return true;
  }

  // Récupérer toutes les églises

  async getChurches(): Promise<FirestoreChurch[]> {

    const snapshot = await this.collection.get();

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as FirestoreChurch));
  }

  // Récupérer une église

  async getChurchById(
    churchId: string
  ): Promise<FirestoreChurch | undefined> {

    const snapshot = await this.collection
      .doc(churchId)
      .get();

    if (!snapshot.exists) {
      return undefined;
    }

    return {
      ...snapshot.data(),
      id: snapshot.id
    } as FirestoreChurch;
  }

  // Églises du pasteur

  async getPastorChurches(): Promise<FirestoreChurch[]> {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return [];
    }

    const snapshot = await this.collection
      .where('ownerUid', '==', user.uid)
      .get();

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as FirestoreChurch));
  }

  // Rechercher une église

  async searchChurches(
    query: string
  ): Promise<FirestoreChurch[]> {

    const search = query
      .trim()
      .toLowerCase()
      .replace(/^@/, '');

    const churches = await this.getChurches();

    return churches.filter(church =>
      church.name.toLowerCase().includes(search) ||
      church.username.toLowerCase().includes(search) ||
      church.pastor.toLowerCase().includes(search) ||
      church.city.toLowerCase().includes(search) ||
      church.country.toLowerCase().includes(search)
    );
  }

  // Vérifier l'utilisateur connecté

  private requireUser() {

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {
      throw new Error('Vous devez vous connecter.');
    }

    return user;
  }

  // Référence de l'abonnement

  private followerReference(
    churchId: string,
    uid: string
  ) {

    return this.collection
      .doc(churchId)
      .collection('followers')
      .doc(uid);
  }

  // Vérifier si le membre est abonné

  async isFollowing(churchId: string): Promise<boolean> {

    const user = this.requireUser();

    const snapshot = await this.followerReference(
      churchId,
      user.uid
    ).get();

    return snapshot.exists;
  }

  // S'abonner à une église

  async followChurch(churchId: string): Promise<void> {

    const user = this.requireUser();

    const church = await this.getChurchById(churchId);

    if (!church) {
      throw new Error('Église introuvable.');
    }

    if (church.ownerUid === user.uid) {
      throw new Error(
        'Vous ne pouvez pas suivre votre propre église.'
      );
    }

    if (this.requireUser().uid !== user.uid) {
      throw new Error('La session a changé.');
    }

    const reference = this.followerReference(
      churchId,
      user.uid
    );

    const snapshot = await reference.get();

    if (!snapshot.exists) {

      await reference.set({
        followedAt: FieldValue.serverTimestamp()
      });

    }

    console.log(
      'DAILY FAITH : Abonnement Firebase enregistré.',
      churchId
    );
  }

  // Se désabonner

  async unfollowChurch(churchId: string): Promise<void> {

    const user = this.requireUser();

    await this.followerReference(
      churchId,
      user.uid
    ).delete();

    console.log(
      'DAILY FAITH : Abonnement Firebase supprimé.',
      churchId
    );
  }

  // Récupérer les églises suivies

  async getFollowedChurches(
    availableChurches?: FirestoreChurch[]
  ): Promise<FirestoreChurch[]> {

    const user = this.requireUser();

    const churches =
      availableChurches ?? await this.getChurches();

    const followed: FirestoreChurch[] = [];

    for (const church of churches) {

      if (this.requireUser().uid !== user.uid) {
        throw new Error('La session a changé.');
      }

      const snapshot = await this.followerReference(
        church.id,
        user.uid
      ).get();

      if (snapshot.exists) {
        followed.push(church);
      }
    }

    if (this.requireUser().uid !== user.uid) {
      throw new Error('La session a changé.');
    }

    console.log(
      'DAILY FAITH : Abonnements Firebase chargés =',
      followed.length
    );

    return followed;
  }

  // Nombre d'abonnés accessible au propriétaire

  async getFollowersCount(
    churchId: string
  ): Promise<number> {

    const user = this.requireUser();

    const church = await this.getChurchById(churchId);

    if (!church || church.ownerUid !== user.uid) {
      throw new Error('Accès non autorisé.');
    }

    const snapshot = await this.collection
      .doc(churchId)
      .collection('followers')
      .get();

    return snapshot.docs.length;
  }
}