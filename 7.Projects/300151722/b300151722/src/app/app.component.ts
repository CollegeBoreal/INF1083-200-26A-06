
import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Application } from '@nativescript/core';

import {
    RadSideDrawer,
    SlideInOnTopTransition
} from 'nativescript-ui-sidedrawer';

@Component({
    selector: 'ns-app',
    standalone: false,
    templateUrl: './app.component.html'
})
export class AppComponent {

    sideDrawerTransition = new SlideInOnTopTransition();

    constructor(
        private routerExtensions: RouterExtensions
    ) {}

    onNavItemTap(route: string): void {

        const drawer =
            <RadSideDrawer>Application.getRootView();

        if (drawer) {
            drawer.closeDrawer();
        }

        this.routerExtensions.navigate([route], {
            clearHistory: true,
            transition: {
                name: 'fade',
                duration: 200
            }
        });
    }
}
