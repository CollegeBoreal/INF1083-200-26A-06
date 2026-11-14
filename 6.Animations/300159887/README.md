Hammiche Billal  |  Matricule : 300159887

Cours : INF1083-200 — Développement d’applications

Collège Boréal  |  Novembre 2026

1. Objectif du travail

Réaliser et tester deux types d’animations dans une application NativeScript Angular : une animation déclarative avec CSS dans Home et une animation impérative déclenchée par un bouton dans Browse. Publier le projet dans le dépôt GitHub du cours.

2. Environnement et structure

Projet : b300159887. Technologies : NativeScript, Angular, TypeScript, SCSS, Visual Studio Code et émulateur Android. Dossier de remise : 6.Animations/300159887/.


<img width="280" height="505" alt="image" src="https://github.com/user-attachments/assets/980e1ce3-0399-4379-9f30-d1d28c4271a7" />

Figure 1 — Structure du projet dans Visual Studio Code.

3. Animation déclarative — Home

Le fichier home.component.html contient un bouton de classe background. Le fichier home.component.scss définit @keyframes bgAnimation, qui fait passer la couleur de fond du rouge au vert en 2 secondes, avec animation-fill-mode: forwards. Le composant charge cette feuille de style au moyen de styleUrls.

<img width="217" height="471" alt="image" src="https://github.com/user-attachments/assets/f2921c1e-6a22-43dd-afe7-b45d5eedc9c8" />


Figure 2 — Résultat sur Android : bouton vert après animation.

4. Animation impérative — Browse

Le composant Browse contient un élément visuel #cible et un bouton Animate. La méthode animate() enchaîne les changements d’opacité, les déplacements, les changements d’échelle et les rotations (durée de 300 ms par étape). Une étoile a été utilisée pour remplacer temporairement la ressource image res://icon, absente du projet.

<img width="220" height="463" alt="image" src="https://github.com/user-attachments/assets/c41d0332-9ad2-42a6-9082-b1fbfde08341" />


Figure 3 — Écran Browse : étoile bleue et bouton Animate.





. Conclusion

Les deux approches d’animation ont été mises en œuvre et testées sur Android. L’animation CSS fonctionne dans Home et l’animation impérative est exécutée dans Browse. Le projet est publié sur GitHub. Pour finaliser la remise selon la consigne initiale
