import { Component, ElementRef, ViewChild } from '@angular/core';
import { Application, Image } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent {
  @ViewChild('cible', { read: ElementRef }) private target!: ElementRef<Image>;

  animating = false;

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer;
    sideDrawer.showDrawer();
  }

  async animate(): Promise<void> {
    if (this.animating) {
      return;
    }

    this.animating = true;
    const duration = 300;

    try {
      const view = this.target.nativeElement;
      await view.animate({ opacity: 0, duration });
      await view.animate({ opacity: 1, duration });
      await view.animate({ translate: { x: 200, y: 200 }, duration });
      await view.animate({ translate: { x: 0, y: 0 }, duration });
      await view.animate({ scale: { x: 5, y: 5 }, duration });
      await view.animate({ scale: { x: 1, y: 1 }, duration });
      await view.animate({ rotate: 180, duration });
      await view.animate({ rotate: 0, duration });
      console.log('Animation finished');
    } catch (error) {
      console.error('Animation failed:', error);
    } finally {
      this.animating = false;
    }
  }
}
