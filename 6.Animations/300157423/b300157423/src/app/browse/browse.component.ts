import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application, View, Color } from '@nativescript/core';

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html'
})
export class BrowseComponent implements OnInit {

  @ViewChild('cible', { static: false })
  cible!: ElementRef<View>;

  ngOnInit(): void {}

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer;
    sideDrawer.showDrawer();
  }

  async animate(): Promise<void> {
    const view = this.cible.nativeElement;
    const duration = 300;

    try {
      await view.animate({ opacity: 0, duration });
      await view.animate({ opacity: 1, duration });

      await view.animate({
        translate: { x: 80, y: 80 },
        duration
      });

      await view.animate({
        translate: { x: 0, y: 0 },
        duration
      });

      await view.animate({
        scale: { x: 1.5, y: 1.5 },
        duration
      });

      await view.animate({
        scale: { x: 1, y: 1 },
        duration
      });

      await view.animate({ rotate: 180, duration });
      await view.animate({ rotate: 0, duration });

      await view.animate({
        backgroundColor: new Color('#FF0000'),
        duration
      });

      await view.animate({
        backgroundColor: new Color('#00FF00'),
        duration
      });

      console.log('Animation finished');

    } catch (e) {
      console.log(e);
    }
  }
}