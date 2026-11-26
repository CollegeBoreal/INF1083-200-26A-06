import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Dialogs } from '@nativescript/core'
import { available, compose } from '@nativescript/email'
import { DataItem, DataService } from '../../shared/data.service'
import { LangueService } from '../../shared/langue.service'
import { apparaitre, pulser, zoomer } from '../../shared/animations'

@Component({
  standalone: false,
  selector: 'ItemDetail',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  item: DataItem
  initiales = ''
  apparaitre = apparaitre
  zoomer = zoomer

  constructor(private _data: DataService, private _route: ActivatedRoute, public l: LangueService) {}

  ngOnInit(): void {
    const id = +this._route.snapshot.params['id']
    this.item = this._data.getItem(id)
    this.initiales = this.item.name
      .split(' ')
      .map((mot) => mot.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  async contacter(args: any): Promise<void> {
    pulser(args.object)
    const specialite = this.l.tr(this.item.specialite)
    const peutEnvoyer = await available()
    if (!peutEnvoyer) {
      Dialogs.alert({
        title: this.l.t('courriel.titre'),
        message: `${this.l.t('courriel.absent')} ${this.item.email}`,
        okButtonText: 'OK',
      })
      return
    }
    const corps =
      this.l.langue === 'fr'
        ? `Bonjour ${this.item.name},\n\nJ'ai vu votre profil sur SankoTalent et j'aimerais discuter d'un besoin en ${specialite.toLowerCase()}.\n\nCordialement,`
        : `Hello ${this.item.name},\n\nI saw your profile on SankoTalent and would like to discuss a need in ${specialite.toLowerCase()}.\n\nBest regards,`
    await compose({
      to: [this.item.email],
      subject: `SankoTalent - ${this.l.t('courriel.sujet')} (${specialite})`,
      body: corps,
    })
  }
}
