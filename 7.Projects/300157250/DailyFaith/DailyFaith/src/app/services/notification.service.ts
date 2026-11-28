import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

import { AuthService } from './auth.service';
import { ChurchService } from './church.service';

export type NotificationType =
  'message' | 'event' | 'announcement';

export interface ChurchNotification {

  id: number;
  churchId: number;
  title: string;
  content: string;
  date: string;
  type: NotificationType;

  recipientIds: number[];
  readBy: number[];
  read: boolean;

}

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  private storageKey = 'dailyfaith_notifications_v2';

  private preferencesKey = 'dailyfaith_notification_preferences';

  private nextId = 1;

  private notifications: ChurchNotification[] = [];

  private preferences: Record<string, boolean> = {};

  constructor(
    private authService: AuthService,
    private churchService: ChurchService
  ) {

    this.loadNotifications();
    this.loadPreferences();

  }

  // Charger les notifications

  private loadNotifications() {

    const saved = ApplicationSettings.getString(
      this.storageKey,
      ''
    );

    if (saved) {

      try {

        const data = JSON.parse(saved);

        this.notifications = data.notifications || [];
        this.nextId = data.nextId || 1;

      } catch (error) {

        console.error(
          'Erreur de chargement des notifications',
          error
        );

      }

    }

  }

  // Sauvegarder les notifications

  saveNotifications() {

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify({
        notifications: this.notifications,
        nextId: this.nextId
      })
    );

  }

  // Charger les préférences

  private loadPreferences() {

    const saved = ApplicationSettings.getString(
      this.preferencesKey,
      ''
    );

    if (saved) {

      try {

        this.preferences = JSON.parse(saved);

      } catch (error) {

        console.error(
          'Erreur de chargement des préférences',
          error
        );

      }

    }

  }

  // Vérifier si les notifications sont activées

  areNotificationsEnabled(
    churchId: number,
    userId: number
  ): boolean {

    const key = `${userId}_${churchId}`;

    return this.preferences[key] !== false;

  }

  // Activer ou désactiver les notifications

  toggleChurchNotifications(churchId: number) {

    const user = this.authService.getCurrentUser();

    if (
      !user ||
      !this.churchService.isFollowing(churchId, user.id)
    ) {
      return;
    }

    const key = `${user.id}_${churchId}`;

    this.preferences[key] =
      !this.areNotificationsEnabled(churchId, user.id);

    ApplicationSettings.setString(
      this.preferencesKey,
      JSON.stringify(this.preferences)
    );

  }

  // Créer une notification

  addNotification(
    title: string,
    content: string,
    churchId?: number,
    type: NotificationType = 'announcement'
  ): boolean {

    const user = this.authService.getCurrentUser();

    if (
      !user ||
      !this.authService.isAdmin() ||
      churchId === undefined ||
      !title.trim() ||
      !content.trim()
    ) {
      return false;
    }

    const church = this.churchService.getChurchById(
      churchId
    );

    if (!church || church.ownerId !== user.id) {
      return false;
    }

    const recipientIds = church.followers.filter(
      userId => this.areNotificationsEnabled(
        church.id,
        userId
      )
    );

    this.notifications.unshift({

      id: this.nextId++,
      churchId: church.id,

      title: title.trim(),
      content: content.trim(),

      date: new Date().toLocaleString('fr-CA'),

      type,

      recipientIds: [...new Set(recipientIds)],
      readBy: [],
      read: false

    });

    this.saveNotifications();

    return true;

  }

  // Notifications du membre connecté

  getNotifications(): ChurchNotification[] {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return [];
    }

    return this.notifications

      .filter(notification =>

        notification.recipientIds.includes(user.id) &&

        this.churchService.isFollowing(
          notification.churchId,
          user.id
        )

      )

      .map(notification => ({

        ...notification,

        read: notification.readBy.includes(user.id)

      }));

  }

  // Marquer une notification comme lue

  markAsRead(notification: ChurchNotification) {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    const item = this.notifications.find(
      n => n.id === notification.id
    );

    if (
      !item ||
      !item.recipientIds.includes(user.id) ||
      !this.churchService.isFollowing(
        item.churchId,
        user.id
      )
    ) {
      return;
    }

    if (!item.readBy.includes(user.id)) {

      item.readBy.push(user.id);

      this.saveNotifications();

    }

  }

  // Marquer toutes les notifications comme lues

  markAllAsRead() {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    const ids = this.getNotifications().map(
      notification => notification.id
    );

    this.notifications.forEach(notification => {

      if (
        ids.includes(notification.id) &&
        !notification.readBy.includes(user.id)
      ) {

        notification.readBy.push(user.id);

      }

    });

    this.saveNotifications();

  }

  // Compteur individuel

  getUnreadCount(): number {

    return this.getNotifications().filter(
      notification => !notification.read
    ).length;

  }

}