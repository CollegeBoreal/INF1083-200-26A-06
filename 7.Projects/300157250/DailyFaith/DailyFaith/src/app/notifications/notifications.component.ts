
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NavigationComponent } from '../navigation/navigation.component';
import {
  ChurchNotification,
  NotificationService
} from '../services/notification.service';

@Component({
  selector: 'ns-notifications',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NavigationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {

  constructor(
    private notificationService: NotificationService
  ) {}

  get notifications(): ChurchNotification[] {
    return this.notificationService.getNotifications();
  }

  get unreadCount(): number {
    return this.notificationService.getUnreadCount();
  }

  markAsRead(notification: ChurchNotification) {
    this.notificationService.markAsRead(notification);
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }
}
