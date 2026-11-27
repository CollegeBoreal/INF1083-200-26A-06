import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application, View, Color } from '@nativescript/core';

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {}

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer;
    sideDrawer.showDrawer();
  }

  async animateIcon(icon: View): Promise<void> {

    await icon.animate({
      opacity: 0.7,
      translate: { x: 50, y: 30 },
      scale: { x: 1.5, y: 1.5 },
      rotate: 180,
      backgroundColor: new Color('#FF0000'),
      duration: 300
    });

    await icon.animate({
      opacity: 1,
      translate: { x: 0, y: 0 },
      scale: { x: 1, y: 1 },
      rotate: 360,
      backgroundColor: new Color('#00FF00'),
      duration: 300
    });
  }
}