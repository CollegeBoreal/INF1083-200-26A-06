import { Frame } from '@nativescript/core';

export function onNavigatingTo(args) {
    const page = args.object;
}

export function retourAccueil() {
    Frame.topmost().goBack();
}
