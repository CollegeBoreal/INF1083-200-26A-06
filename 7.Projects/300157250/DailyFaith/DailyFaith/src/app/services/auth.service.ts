import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';

import '@nativescript/firebase-auth';
import '@nativescript/firebase-firestore';

export interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  private get auth() {
    return firebase().auth();
  }

  private get firestore() {
    return firebase().firestore();
  }

  // Identifiant local temporaire pour les nouveaux comptes
  private getLocalId(uid: string): number {

    const key = 'dailyfaith_firebase_ids';

    const ids: Record<string, number> = JSON.parse(
      ApplicationSettings.getString(key, '{}')
    );

    if (ids[uid] !== undefined) {
      return ids[uid];
    }

    const nextId = Math.min(
      0,
      ...Object.values(ids)
    ) - 1;

    ids[uid] = nextId;

    ApplicationSettings.setString(
      key,
      JSON.stringify(ids)
    );

    return nextId;
  }

  // Connexion Firebase
  async login(
    email: string,
    password: string
  ): Promise<boolean> {

    this.currentUser = null;

    try {

      const result = await this.auth
        .signInWithEmailAndPassword(
          email.trim().toLowerCase(),
          password
        );

      const firebaseUser = result.user;

      if (!firebaseUser) {
        throw new Error('Utilisateur introuvable.');
      }

      const snapshot = await this.firestore
        .collection('users')
        .doc(firebaseUser.uid)
        .get();

      if (!snapshot.exists) {
        throw new Error('Profil Firestore introuvable.');
      }

      const profile = snapshot.data();

      if (
        !profile ||
        typeof profile.name !== 'string' ||
        profile.email !== firebaseUser.email ||
        !['admin', 'member'].includes(profile.role)
      ) {
        throw new Error('Profil utilisateur invalide.');
      }

      this.currentUser = {
        id: Number.isSafeInteger(profile.legacyId)
          && profile.legacyId > 0
          ? profile.legacyId
          : this.getLocalId(firebaseUser.uid),

        uid: firebaseUser.uid,
        name: profile.name,
        email: profile.email,
        role: profile.role
      };

      console.log(
        'DAILY FAITH : Connexion Firebase réussie.'
      );

      console.log(
        'DAILY FAITH : Rôle =',
        this.currentUser.role
      );

      return true;

    } catch (error) {

      this.currentUser = null;

      console.error(
        'DAILY FAITH : Erreur de connexion',
        error
      );

      try {
        await this.auth.signOut();
      } catch (signOutError) {
        console.error(signOutError);
      }

      return false;
    }
  }

  // Inscription Firebase
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {

    this.currentUser = null;

    if (
      !name.trim() ||
      !email.trim() ||
      password.length < 6
    ) {
      return false;
    }

    try {

      const normalizedEmail =
        email.trim().toLowerCase();

      const result = await this.auth
        .createUserWithEmailAndPassword(
          normalizedEmail,
          password
        );

      const firebaseUser = result.user;

      if (!firebaseUser) {
        throw new Error('Création du compte impossible.');
      }

      await this.firestore
        .collection('users')
        .doc(firebaseUser.uid)
        .set({
          name: name.trim(),
          email: normalizedEmail,
          role: 'member'
        });

      await this.logout();

      console.log(
        'DAILY FAITH : Inscription Firebase réussie.'
      );

      return true;

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur inscription',
        error
      );

      try {
        await this.logout();
      } catch (signOutError) {
        console.error(signOutError);
      }

      return false;
    }
  }

  // Récupérer le profil connecté
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Vérifier la connexion
  isLoggedIn(): boolean {

    return this.currentUser !== null &&
      this.auth.currentUser?.uid === this.currentUser.uid;
  }

  // Vérifier le rôle
  isAdmin(): boolean {

    return this.isLoggedIn() &&
      this.currentUser?.role === 'admin';
  }

  // Déconnexion Firebase
  async logout(): Promise<void> {

    this.currentUser = null;

    const success = await this.auth.signOut();

    if (!success) {
      throw new Error('Déconnexion Firebase impossible.');
    }

    console.log(
      'DAILY FAITH : Déconnexion réussie.'
    );
  }
}