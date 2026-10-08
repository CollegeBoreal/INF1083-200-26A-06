import { EventData, Frame, Page } from '@nativescript/core'
import { HelloWorldModel } from './main-view-model'

export function navigatingTo(args: EventData) {
  const page = <Page>args.object
  page.bindingContext = new HelloWorldModel()
}

export function onItemTap(args: any) {
  const page = args.object.page as Page
  const viewModel = page.bindingContext as HelloWorldModel
  const contact = viewModel.contacts[args.index]

  Frame.topmost().navigate({
    moduleName: 'details-page',
    context: contact
  })
}