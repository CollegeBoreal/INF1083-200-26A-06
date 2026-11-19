
import { Component, OnInit } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
    selector: 'Home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    appName = 'DZIS TV Player';
    welcomeMessage = 'Bienvenue sur DZIS TV Player';

    constructor() {}

    ngOnInit(): void {}

    onDrawerButtonTap(): void {
        const sideDrawer =
            <RadSideDrawer>Application.getRootView();

        sideDrawer.showDrawer();
    }
}
