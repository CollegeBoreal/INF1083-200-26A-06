

import { Frame } from '@nativescript/core'

export function onNavigatingTo(args) {
    // Page d'accueil
}

export function openPionniers() {
    Frame.topmost().navigate('pionniers')
}

export function openQuiz() {
    Frame.topmost().navigate('quiz')
}
