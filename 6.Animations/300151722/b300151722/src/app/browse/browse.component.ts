
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application, View } from '@nativescript/core';

@Component({
    selector: 'Browse',
    standalone: false,
    templateUrl: './browse.component.html'
})
export class BrowseComponent implements OnInit {

    @ViewChild('cible', { static: false })
    cible!: ElementRef<View>;

    constructor() {
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    animate(): void {
        const view = this.cible.nativeElement;
        const duration = 300;

        view.animate({ opacity: 0, duration })
            .then(() => view.animate({ opacity: 1, duration }))
            .then(() => view.animate({
                translate: { x: 200, y: 200 },
                duration
            }))
            .then(() => view.animate({
                translate: { x: 0, y: 0 },
                duration
            }))
            .then(() => view.animate({
                scale: { x: 5, y: 5 },
                duration
            }))
            .then(() => view.animate({
                scale: { x: 1, y: 1 },
                duration
            }))
            .then(() => view.animate({ rotate: 180, duration }))
            .then(() => view.animate({ rotate: 0, duration }))
            .then(() => {
                console.log('Animation finished');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
}
