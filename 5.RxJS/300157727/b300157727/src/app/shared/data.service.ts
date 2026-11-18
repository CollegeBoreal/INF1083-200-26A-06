
import { Injectable } from '@angular/core'

export class DataItem {
  id: number
  name: string
  description: string

  constructor(id: number, name: string, description: string) {
    this.id = id
    this.name = name
    this.description = description
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items = [
    new DataItem(1, 'First item', 'Description of the first item'),
    new DataItem(2, 'Second item', 'Description of the second item'),
    new DataItem(3, 'Third item', 'Description of the third item')
  ]

  getItems(): DataItem[] {
    return this.items
  }

  getItem(id: number): DataItem {
    return this.items.find(item => item.id === id)
  }
}