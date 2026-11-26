
import { Component } from '@angular/core';
import { Application } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
    selector: 'Settings',
    standalone: false,
    templateUrl: './settings.component.html'
})
export class SettingsComponent {

    nombrePays = 195;
    nombreRecettes = 7;

    constructor(
        private router: RouterExtensions
    ) {}

    allerAuxRecettes(): void {
        this.router.navigate(['/featured'], {
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
