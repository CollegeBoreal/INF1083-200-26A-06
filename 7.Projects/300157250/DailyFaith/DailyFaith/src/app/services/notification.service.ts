
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

export interface ChurchNotification {
  id: number;
  title: string;
  content: string;
  date: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private storageKey = 'dailyfaith_notifications';
  private nextId = 4;

  notifications: ChurchNotification[] = [
    {
      id: 1,
      title: 'Nouveau message biblique',
      content: 'Le pasteur a publié un nouveau message.',
      date: 'Aujourd’hui à 7 h 00',
      read: false
    },
    {
      id: 2,
      title: 'Culte du dimanche',
      content: 'N’oubliez pas notre prochain culte à 10 h.',
      date: 'Aujourd’hui à 8 h 30',
      read: false
    },
    {
      id: 3,
      title: 'Bienvenue sur Daily Faith',
      content: 'Merci de rejoindre notre communauté chrétienne.',
      date: 'Hier',
      read: false
    }
  ];

  constructor() {
    this.loadNotifications();
  }

  // Charger les notifications sauvegardées
  private loadNotifications() {

    const savedNotifications = ApplicationSettings.getString(
      this.storageKey,
      ''
    );

    if (savedNotifications) {
      try {

        const data = JSON.parse(savedNotifications);

        this.notifications = data.notifications;
        this.nextId = data.nextId;

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

    const data = {
      notifications: this.notifications,
      nextId: this.nextId
    };

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify(data)
    );
  }

  getNotifications(): ChurchNotification[] {
    return this.notifications;
  }

  // Créer et sauvegarder une notification
  addNotification(title: string, content: string) {

    this.notifications.unshift({
      id: this.nextId++,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleString('fr-CA'),
      read: false
    });

    this.saveNotifications();
  }

  // Marquer une notification comme lue
  markAsRead(notification: ChurchNotification) {

    notification.read = true;

    this.saveNotifications();
  }

  // Marquer toutes les notifications comme lues
  markAllAsRead() {

    this.notifications.forEach(notification => {
      notification.read = true;
    });

    this.saveNotifications();
  }

  // Compter les notifications non lues
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}
