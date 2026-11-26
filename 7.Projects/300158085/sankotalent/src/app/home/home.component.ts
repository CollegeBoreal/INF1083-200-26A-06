import { Component, OnInit } from '@angular/core'
import { Page } from '@nativescript/core'
import { DataService, DataItem } from '../shared/data.service'
import { LangueService } from '../shared/langue.service'
import { apparaitre, pulser } from '../shared/animations'

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  items: Array<DataItem>
  apparaitre = apparaitre

  constructor(private _itemService: DataService, public l: LangueService, page: Page) {
    page.actionBarHidden = true
  }

  ngOnInit(): void {
    this.items = this._itemService.getItems()
  }

  initiales(nom: string): string {
    return nom
      .split(' ')
      .map((mot) => mot.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  changerLangue(args: any): void {
    pulser(args.object)
    this.l.basculer()
  }
}
