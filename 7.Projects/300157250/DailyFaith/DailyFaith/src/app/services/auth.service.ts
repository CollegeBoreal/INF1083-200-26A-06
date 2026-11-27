
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'member' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'dailyfaith_users';

  private currentUser: User | null = null;

  private users: User[] = [
    {
      id: 1,
      name: 'Pasteur',
      email: 'admin@dailyfaith.com',
      password: 'Admin123',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Membre Daily Faith',
      email: 'test@dailyfaith.com',
      password: '123456',
      role: 'member'
    }
  ];

  constructor() {
    this.loadUsers();
  }

  // Charger les comptes enregistrés
  private loadUsers() {

    const savedUsers = ApplicationSettings.getString(
      this.storageKey,
      ''
    );

    if (savedUsers) {
      try {
        this.users = JSON.parse(savedUsers);
      } catch (error) {
        console.error('Erreur de chargement des comptes', error);
      }
    }
  }

  // Sauvegarder les comptes
  private saveUsers() {

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify(this.users)
    );
  }

  // Créer un compte membre
  register(
    name: string,
    email: string,
    password: string
  ): boolean {

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = this.users.find(
      user => user.email === normalizedEmail
    );

    if (
      existingUser ||
      !name.trim() ||
      !normalizedEmail ||
      password.length < 6
    ) {
      return false;
    }

    const nextId = Math.max(
      0,
      ...this.users.map(user => user.id)
    ) + 1;

    this.users.push({
      id: nextId,
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      role: 'member'
    });

    this.saveUsers();

    return true;
  }

  // Connecter un utilisateur
  login(email: string, password: string): boolean {

    const user = this.users.find(
      u =>
        u.email === email.trim().toLowerCase() &&
        u.password === password
    );

    this.currentUser = user || null;

    return !!user;
  }

  // Récupérer l'utilisateur connecté
  getCurrentUser(): Omit<User, 'password'> | null {

    if (!this.currentUser) {
      return null;
    }

    const { password, ...profile } = this.currentUser;

    return profile;
  }

  // Vérifier la connexion
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Vérifier le rôle administrateur
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  // Déconnecter l'utilisateur
  logout() {
    this.currentUser = null;
  }
}
