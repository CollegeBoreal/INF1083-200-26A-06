import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { EventsComponent } from './events/events.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { MyChurchesComponent } from './my-churches/my-churches.component';

import { AdminComponent } from './admin/admin.component';
import { PublishMessageComponent } from './admin/publish-message/publish-message.component';
import { ManageMessagesComponent } from './admin/manage-messages/manage-messages.component';
import { CreateEventComponent } from './admin/create-event/create-event.component';
import { ManageEventsComponent } from './admin/manage-events/manage-events.component';
import { SendNotificationComponent } from './admin/send-notification/send-notification.component';

import { CreateChurchComponent } from './admin/create-church/create-church.component';
import { ManageChurchesComponent } from './admin/manage-churches/manage-churches.component';
import { EditChurchComponent } from './admin/edit-church/edit-church.component';
import { ChurchProfileComponent } from './church-profile/church-profile.component';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { churchProfileGuard } from './guards/church-profile.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  // Recherche des églises
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [authGuard]
  },

  // Mes abonnements
  {
    path: 'my-churches',
    component: MyChurchesComponent,
    canActivate: [authGuard]
  },

  // Profil public
  {
    path: 'church-profile/:id',
    component: ChurchProfileComponent,
    canActivate: [churchProfileGuard]
  },

  // Espace membre
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

  // Espace pasteur
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },

  {
    path: 'create-church',
    component: CreateChurchComponent,
    canActivate: [adminGuard]
  },

  {
    path: 'manage-churches',
    component: ManageChurchesComponent,
    canActivate: [adminGuard]
  },

  {
    path: 'edit-church/:id',
    component: EditChurchComponent,
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

  {
    path: '**',
    redirectTo: 'login'
  }

];