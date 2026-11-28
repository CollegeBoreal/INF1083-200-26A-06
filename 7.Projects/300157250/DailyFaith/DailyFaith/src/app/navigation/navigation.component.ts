import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'ns-navigation',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {

  tabs = [

    {
      page: 'home',
      icon: '\uf015',
      title: 'Accueil'
    },

    {
      page: 'search',
      icon: '\uf002',
      title: 'Recherche'
    },

    {
      page: 'my-churches',
      icon: '\uf51d',
      title: 'Églises'
    },

    {
      page: 'notifications',
      icon: '\uf0f3',
      title: 'Alertes'
    },

    {
      page: 'profile',
      icon: '\uf007',
      title: 'Profil'
    }

  ];

  constructor(
    private router: RouterExtensions,
    private angularRouter: Router,
    private notificationService: NotificationService
  ) {}

  get unreadCount(): number {

    return this.notificationService.getUnreadCount();

  }

  isActive(page: string): boolean {

    return this.angularRouter.url === '/' + page;

  }

  navigate(page: string) {

    if (this.isActive(page)) {
      return;
    }

    this.router.navigate(['/' + page], {
      clearHistory: true
    });

  }

}