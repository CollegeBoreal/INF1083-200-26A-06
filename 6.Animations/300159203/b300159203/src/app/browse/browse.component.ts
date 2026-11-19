
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, View } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  animate(view: View): void {
    console.log('ANIMATION STARTED')

    view.animate({
      opacity: 0.2,
      duration: 500,
    })
    .then(() => view.animate({
      opacity: 1,
      duration: 500,
    }))
    .then(() => view.animate({
      scale: { x: 2, y: 2 },
      duration: 500,
    }))
    .then(() => view.animate({
      scale: { x: 1, y: 1 },
      duration: 500,
    }))
    .then(() => view.animate({
      rotate: 360,
      duration: 700,
    }))
    .then(() => view.animate({
      rotate: 0,
      duration: 300,
    }))
    .catch((error) => {
      console.log('Animation error:', error)
    })
  }
}
