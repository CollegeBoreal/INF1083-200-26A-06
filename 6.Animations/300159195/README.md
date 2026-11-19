# INF1083 — Animations NativeScript

## Présentation

Cette application NativeScript avec Angular présente deux types d’animations :

- *Home* : animation déclarative de la couleur de fond.
- *Browse* : animation déclenchée par un bouton sur le drapeau de l’Algérie.

L’application a été exécutée et vérifiée sur un téléphone Android.

## 1. Animation déclarative — Home

La page Home contient une animation CSS définie avec @keyframes. La couleur de fond du bouton passe du rouge au vert pendant deux secondes. La propriété animation-fill-mode: forwards conserve la couleur finale après l’animation.

Le texte du bouton est affiché en blanc pour rester lisible sur le fond coloré.

![alt text](<WhatsApp Image 2026-11-19 at 10.51.58 AM-2.jpeg>) 

## 2. Animation impérative — Browse

La page Browse affiche le drapeau de l’Algérie dans un cadre bleu. Un appui sur le bouton *Animate* lance une suite d’animations sur la vue : changement d’opacité, déplacement, changement d’échelle et rotation. Les étapes sont exécutées successivement avec la méthode animate() et des promesses.

![alt text](<WhatsApp Image 2026-11-19 at 10.51.58 AM (1).jpeg>) 

## 3. Navigation et lisibilité

Le menu latéral permet d’accéder aux pages Home et Browse. Les textes et les icônes du menu utilisent des couleurs claires afin d’être lisibles sur le thème sombre. L’icône du menu en haut des pages est également visible.

## Vérification

- L’application s’ouvre sur Android.
- L’animation de couleur de Home se termine sur le vert.
- Le bouton *Animate* de Browse lance l’animation du drapeau.
- La navigation par le menu latéral fonctionne.