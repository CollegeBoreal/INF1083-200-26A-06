TP – Animations NativeScript

Nom : Youcef Laziz

Numéro étudiant : 300160424

Cours : INF1083 – Développement d’applications

Projet : b300160424

1. Objectif
   
Dans ce travail, j’ai créé une application NativeScript avec Angular pour tester deux types d’animations : une animation CSS dans Home et une animation dans le code dans Browse.

2. Animation CSS – Home
   
J’ai ajouté un bouton {N} et un fichier home.component.scss. Le bouton change de couleur du rouge au vert en 2 secondes.

 <img width="488" height="651" alt="image" src="https://github.com/user-attachments/assets/614f63d7-9015-4059-ba32-762477b55a74" />

Capture 1 – Animation Home (bouton vert)

3. Animation impérative – Browse

J’ai ajouté un bouton Animate. Quand je clique dessus, le carré rouge avec la lettre N disparaît, revient, se déplace, grandit et tourne. Chaque étape dure 300 ms. J’ai utilisé un Label à la place de l’image pour rendre l’animation visible.

 <img width="503" height="663" alt="image" src="https://github.com/user-attachments/assets/eb2f008e-4c66-4cdf-bd64-027cf43f1636" />

Capture 2 – Page Browse avec le carré rouge et le bouton Animate

4. Code et vérification
   
La méthode animate(view: View) utilise plusieurs appels view.animate() enchaînés. J’ai testé l’application sur l’émulateur Android. Le message « Animation finished » apparaît à la fin.

 <img width="713" height="618" alt="image" src="https://github.com/user-attachments/assets/51d78624-9926-4cee-9034-fd22121b3ed9" />

Capture 3 – Code de l’animation dans browse.component.ts

Conclusion

Ce TP m’a permis de comprendre la différence entre une animation CSS et une animation exécutée dans le code TypeScript. Les deux animations ont été testées dans l’émulateur Android.
