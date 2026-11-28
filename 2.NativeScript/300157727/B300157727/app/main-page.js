
import { createViewModel } from './main-view-model'
import { Dialogs } from '@nativescript/core'

export function onNavigatingTo(args) {
    const page = args.object
    page.bindingContext = createViewModel()
}

export function onPersonTap(args) {
    const page = args.object.page
    const person = page.bindingContext.people.getItem(args.index)

    Dialogs.alert({
        title: person.name,
        message:
            'Nationalité : ' + person.nationality + '\n\n' +
            'Date de naissance : ' + person.birth + '\n\n' +
            'Profession : ' + person.profession + '\n\n' +
            'Informations : ' + person.information,
        okButtonText: 'Fermer'
    })
}
