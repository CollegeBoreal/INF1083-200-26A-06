
import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application, CoreTypes, View } from '@nativescript/core';

@Component({
    standalone: false,
    selector: 'Browse',
    templateUrl: './browse.component.html'
})
export class BrowseComponent implements OnInit {

    private isAnimating = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    async animate(view: View): Promise<void> {
        if (this.isAnimating) {
            return;
        }

        this.isAnimating = true;

        const duration = 300;
        const curve = CoreTypes.AnimationCurve.easeInOut;

        try {
            // Disparition
            await view.animate({
                opacity: 0,
                duration,
                curve
            });

            // Réapparition
            await view.animate({
                opacity: 1,
                duration,
                curve
            });

            // Déplacement
            await view.animate({
                translate: { x: 200, y: 200 },
                duration,
                curve
            });

            // Retour au centre
            await view.animate({
                translate: { x: 0, y: 0 },
                duration,
                curve
            });

            // Agrandissement
            await view.animate({
                scale: { x: 5, y: 5 },
                duration,
                curve
            });

            // Retour à la taille initiale
            await view.animate({
                scale: { x: 1, y: 1 },
                duration,
                curve
            });

            // Rotation
            await view.animate({
                rotate: 180,
                duration,
                curve
            });

            // Retour à l'orientation initiale
            await view.animate({
                rotate: 0,
                duration,
                curve
            });

            console.log('Animation finished');

        } catch (error) {
            console.error('Animation error:', error);

        } finally {
            view.opacity = 1;
            view.translateX = 0;
            view.translateY = 0;
            view.scaleX = 1;
            view.scaleY = 1;
            view.rotate = 0;

            this.isAnimating = false;
        }
    }
}
