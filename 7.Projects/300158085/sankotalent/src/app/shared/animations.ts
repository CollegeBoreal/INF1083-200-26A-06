import { CoreTypes, View } from '@nativescript/core'

// Apparition : la vue monte de 24 points avec un fondu.
// "rang" décale chaque élément d'une liste pour un effet en cascade.
export function apparaitre(args: any, rang = 0): void {
  const vue = args?.object as View
  if (!vue) return
  vue.opacity = 0
  vue.translateY = 24
  vue
    .animate({
      opacity: 1,
      translate: { x: 0, y: 0 },
      duration: 450,
      delay: 70 * rang,
      curve: CoreTypes.AnimationCurve.easeOut,
    })
    .catch(() => {})
}

// Zoom : la vue grandit de 60 % à 100 % avec un léger rebond.
export function zoomer(args: any, delai = 0): void {
  const vue = args?.object as View
  if (!vue) return
  vue.opacity = 0
  vue.scaleX = 0.6
  vue.scaleY = 0.6
  vue
    .animate({
      opacity: 1,
      scale: { x: 1, y: 1 },
      duration: 550,
      delay: delai,
      curve: CoreTypes.AnimationCurve.spring,
    })
    .catch(() => {})
}

// Pulsation : petit enfoncement puis retour, quand on touche un bouton.
export function pulser(vue: View): void {
  if (!vue) return
  vue
    .animate({ scale: { x: 0.94, y: 0.94 }, duration: 90 })
    .then(() => vue.animate({ scale: { x: 1, y: 1 }, duration: 200, curve: CoreTypes.AnimationCurve.spring }))
    .catch(() => {})
}
