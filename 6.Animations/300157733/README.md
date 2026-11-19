

Rapport de laboratoire - Animations NativeScript

Cours : INF1083
 Laboratoire : Animations
 Étudiant : Mouhamad Al Bachir Konate
 Numéro étudiant : 300157733

Objectif

L'objectif de ce laboratoire était de découvrir les animations dans NativeScript en utilisant deux approches :

Animation déclarative (CSS)
Animation impérative (programmée en TypeScript)
Partie A : Animation déclarative
Modifications réalisées

Dans le composant Home, le contenu original a été remplacé par un bouton :

HTML
<Button text="N" class="background"></Button>

Un fichier de style nommé home.component.scss a été créé afin de définir une animation CSS.

Animation utilisée
SCSS
@keyframes bgAnimation {
from {
background-color: red;
}
 
to {
background-color: green;
}
}
 
.background {
animation-name: bgAnimation;
animation-duration: 2s;
animation-fill-mode: forwards;
}
Résultat obtenu

Au chargement de la page Home, le bouton « N » change progressivement de couleur en passant du rouge au vert pendant deux secondes.

Partie B : Animation impérative
Modifications réalisées

Dans le composant Browse, un objet animé a été ajouté à l'intérieur d'un AbsoluteLayout ainsi qu'un bouton permettant de lancer l'animation.

Animation programmée

La méthode animate() a été ajoutée dans le fichier browse.component.ts.

Séquence d'animations

L'objet effectue les transformations suivantes :

Disparition (opacity = 0)
Réapparition (opacity = 1)
Déplacement vers une nouvelle position
Retour à la position originale
Agrandissement
Retour à la taille normale
Rotation de 180 degrés
Retour à la rotation initiale
Résultat obtenu

Lors d'un clic sur le bouton Animate, l'objet exécute toute la séquence d'animations avec succès. Le terminal affiche également :

Plain Text
Animation finished

confirmant la fin de l'exécution.

Difficultés rencontrées
Certains avertissements Sass apparaissaient lors de la compilation.
Une erreur de ressource était générée avec :
Plain Text
res://icon

Cette ressource a été remplacée par un composant texte contenant la lettre N afin de rendre l'animation visible dans l'émulateur.

Un avertissement de typage Angular concernant View a nécessité l'utilisation d'un paramètre plus flexible pour l'animation.
Conclusion

Ce laboratoire a permis de mettre en pratique les animations CSS et les animations programmées dans NativeScript. Les deux types d'animations ont été réalisés avec succès et testés dans l'émulateur Android. Les résultats obtenus correspondent aux objectifs du laboratoire.

<img width="1152" height="2048" alt="image" src="https://github.com/user-attachments/assets/4fded3ed-8c5d-46d4-8c8f-3ef92e4c62f1" />
<img width="1512" height="847" alt="image" src="https://github.com/user-attachments/assets/c01db41f-4277-44ce-8106-467de456be10" />

<img width="1152" height="2048" alt="image" src="https://github.com/user-attachments/assets/4805fcda-334e-4387-94d6-da4363c33fec" />
<img width="1152" height="2048" alt="image" src="https://github.com/user-attachments/assets/e339ffe8-3793-4026-9e22-911a612c7e91" />
