
export function onNavigatingTo(args) {
    const page = args.object
}

export function answerCorrect(args) {
    const page = args.object.page
    page.getViewById('result1').text = 'Bonne réponse ! Bravo.'
    page.getViewById('result1').color = '#16845B'
}

export function answerWrong(args) {
    const page = args.object.page
    page.getViewById('result1').text = 'Mauvaise réponse. Essayez encore !'
    page.getViewById('result1').color = '#DC2626'
}

export function answerCorrect2(args) {
    const page = args.object.page
    page.getViewById('result2').text = 'Bonne réponse ! Bravo.'
    page.getViewById('result2').color = '#16845B'
}

export function answerWrong2(args) {
    const page = args.object.page
    page.getViewById('result2').text = 'Mauvaise réponse. Essayez encore !'
    page.getViewById('result2').color = '#DC2626'
}
export function retourAccueil() {
    const { Frame } = require('@nativescript/core')
    Frame.topmost().goBack()
}