import { createViewModel } from './main-view-model';

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = createViewModel()
}
import { Dialogs } from '@nativescript/core';

export function onTap() {
     Dialogs.alert('Bravo ! Mon bouton fonctionne !');
 }  
 export function onPersonnageTap()  {
     alert('Vous avez sélectionné Ahmed Sékou Touré !');
  
  }