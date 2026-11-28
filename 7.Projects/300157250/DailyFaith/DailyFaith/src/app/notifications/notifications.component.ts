import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { NavigationComponent } from '../navigation/navigation.component';

import {
  ChurchNotification,
  NotificationService
} from '../services/notification.service';

import {
  Church,
  ChurchService
} from '../services/church.service';

import { AuthService } from '../services/auth.service';

@Component({

  selector: 'ns-notifications',

  standalone: true,

  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],

  schemas: [NO_ERRORS_SCHEMA],

  templateUrl: './notifications.component.html',

  styleUrls: ['./notifications.component.css']

})

export class NotificationsComponent {

  activeTab: 'notifications' | 'settings' =
    'notifications';

  activeFilter: 'all' | 'unread' = 'all';

  constructor(
    private notificationService: NotificationService,
    private churchService: ChurchService,
    private authService: AuthService,
    private router: RouterExtensions
  ) {}

  get notifications(): ChurchNotification[] {

    const notifications =
      this.notificationService.getNotifications();

    if (this.activeFilter === 'unread') {

      return notifications.filter(n => !n.read);

    }

    return notifications;

  }

  get unreadCount(): number {

    return this.notificationService.getUnreadCount();

  }

  get churches(): Church[] {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return [];
    }

    return this.churchService.getFollowedChurches(
      user.id
    );

  }

  showNotifications() {

    this.activeTab = 'notifications';

  }

  showSettings() {

    this.activeTab = 'settings';

  }

  selectFilter(filter: 'all' | 'unread') {

    this.activeFilter = filter;

  }

  getChurchName(notification: ChurchNotification): string {

    return this.churchService.getChurchById(
      notification.churchId
    )?.name || 'Église inconnue';

  }

  getNotificationIcon(
    notification: ChurchNotification
  ): string {

    switch (notification.type) {

      case 'message':
        return '\uf02d';

      case 'event':
        return '\uf073';

      default:
        return '\uf0a1';

    }

  }

  getNotificationCategory(
    notification: ChurchNotification
  ): string {

    switch (notification.type) {

      case 'message':
        return 'MESSAGE BIBLIQUE';

      case 'event':
        return 'ÉVÉNEMENT';

      default:
        return 'ANNONCE';

    }

  }

  markAsRead(notification: ChurchNotification) {

    this.notificationService.markAsRead(notification);

  }

  markAllAsRead() {

    this.notificationService.markAllAsRead();

  }

  isEnabled(church: Church): boolean {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return false;
    }

    return this.notificationService
      .areNotificationsEnabled(church.id, user.id);

  }

  toggleNotifications(church: Church) {

    this.notificationService.toggleChurchNotifications(
      church.id
    );

  }

  viewChurch(notification: ChurchNotification) {

    this.markAsRead(notification);

    this.router.navigate([
      '/church-profile',
      notification.churchId
    ]);

  }

  discoverChurches() {

    this.router.navigate(['/search'], {
      clearHistory: true
    });

  }

}