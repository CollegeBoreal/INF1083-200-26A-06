
import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { EventsComponent } from './events/events.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { PublishMessageComponent } from './admin/publish-message/publish-message.component';
import { ManageMessagesComponent } from './admin/manage-messages/manage-messages.component';
import { CreateEventComponent } from './admin/create-event/create-event.component';
import { ManageEventsComponent } from './admin/manage-events/manage-events.component';
import { SendNotificationComponent } from './admin/send-notification/send-notification.component';

// Importation des Guards
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [

  // Page par défaut
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Pages publiques
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  // Pages réservées aux membres
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },

  // Pages réservées aux pasteurs
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'publish-message',
    component: PublishMessageComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'manage-messages',
    component: ManageMessagesComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'create-event',
    component: CreateEventComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'manage-events',
    component: ManageEventsComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'send-notification',
    component: SendNotificationComponent,
    canActivate: [adminGuard]
  },

  // Redirection si la page n'existe pas
  {
    path: '**',
    redirectTo: 'login'
  }
];
