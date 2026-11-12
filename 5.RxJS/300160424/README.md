TP RxJS – INF1083

Étudiant : Youcef Laziz

Matricule : 300160424

1. Objectif

Dans ce travail, j’ai créé une application NativeScript avec Angular et RxJS. Elle permet de saisir une capitale et d’afficher le pays correspondant.

2. Création du projet
   
J’ai créé mon dossier 300160424 avec un fichier README.md et un dossier images. J’ai ensuite créé le projet b300160424 avec la commande :
ns create b300160424 --template @nativescript/template-tab-navigation-ng
J’ai ouvert le projet dans Visual Studio Code.

<img width="705" height="654" alt="image" src="https://github.com/user-attachments/assets/fa7c28bf-8438-4e09-a804-d980819d0eb5" />

Capture 1 – Projet NativeScript ouvert dans VS Code

3. Fichiers réalisés

J’ai créé country.ts avec les informations id, name et capital. J’ai ajouté apicall.service.ts pour récupérer les données avec HttpClient et RxJS.
J’ai ensuite modifié app.module.ts, search.component.ts, search.component.html et search.module.ts pour activer HttpClient, le formulaire et l’affichage des résultats.

 <img width="855" height="577" alt="image" src="https://github.com/user-attachments/assets/0f50b06e-a97d-4deb-bf8a-bbe4be180c92" />

Capture 2 – Service apicall.service.ts

4. Test de l’application
   
J’ai lancé le projet avec la commande ns run android. Dans l’onglet Search, j’ai écrit Paris puis j’ai appuyé sur le bouton Search. L’application a affiché France et Paris.

<img width="855" height="577" alt="image" src="https://github.com/user-attachments/assets/7d2897f8-c207-4710-8f9d-3c1661b42152" />

Capture 3 – Résultat : France et Pari
5. Conclusion

Dans ce travail, j’ai appris à utiliser RxJS avec Angular et NativeScript pour rechercher un pays à partir de sa capitale. J’ai créé les fichiers nécessaires et testé mon application sur l’émulateur Android. La recherche de Paris a bien affiché France. Ce travail m’a permis de mieux comprendre l’utilisation des observables et la récupération des données avec une API.

