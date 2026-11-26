
import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
    selector: 'Browse',
    standalone: false,
    templateUrl: './browse.component.html'
})
export class BrowseComponent {

    constructor(
        private routerExtensions: RouterExtensions
    ) {}

    ouvrirPays(): void {
        this.routerExtensions.navigate(['/home'], {
            clearHistory: true,
            transition: {
                name: 'fade',
                duration: 200
            }
        });
    }

    onDrawerButtonTap(): void {
        const drawer =
            <RadSideDrawer>Application.getRootView();

        drawer.showDrawer();
    }
}
