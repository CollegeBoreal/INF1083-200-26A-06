# TP NativeScript – Première application

**Nom :** Youcef  
**ID :** 300160424  
**Cours :** INF1083 – Développement d'applications  

## 1. Introduction

Dans ce travail, j'ai créé ma première application mobile avec NativeScript et Angular. J'ai utilisé PowerShell et Android Studio pour réaliser le travail.

## 2. Création des dossiers

J'ai créé un dossier avec mon identifiant 300160424. Dans ce dossier, j'ai ajouté un fichier README.md et un dossier images pour enregistrer mes captures d'écran.

## 3. Création du projet NativeScript

J'ai utilisé la commande :

`ns create B300160424`

J'ai choisi Angular et le modèle Hello World.

<img width="488" height="500" alt="Capture d’écran 2026-10-18 192203" src="https://github.com/user-attachments/assets/50e7a7bc-90ed-4646-8e38-73f1145d7a15" />

## 4. Exécution de l'application

J'ai utilisé les commandes suivantes :

`cd B300160424`

`adb devices`

`ns run android`

La compilation et l'installation ont réussi sur mon émulateur Android.

## 5. Résultat

Mon application affiche une liste de scientifiques en informatique sur l'émulateur Android.

![Application NativeScript](images/application.png)

## 6. Personnalisation de l'application

J'ai personnalisé mon application NativeScript en remplaçant la liste des scientifiques en informatique par une liste de personnalités algériennes.

Pour cela, j'ai ouvert mon projet dans Visual Studio Code et modifié deux fichiers :

- **person.component.html** : j'ai remplacé le titre « Computer Scientists » par « Personnalités algériennes ».
- **person.service.ts** : j'ai remplacé les 15 scientifiques par 10 personnalités algériennes, avec leurs nationalités et leurs réalisations.

J'ai ensuite enregistré les modifications et utilisé la commande suivante dans PowerShell :

`ns run android`

L'application s'est lancée sur mon émulateur Android et la nouvelle liste s'affiche correctement.

<img width="841" height="521" alt="Capture d’écran 2026-10-21 233337" src="https://github.com/user-attachments/assets/8c5c2b05-5c20-4368-8ad3-756d8902eb4f" />

## 7. Vérification de la page de détails

Après avoir personnalisé mon application, j'ai testé l'affichage des informations des personnalités.

J'ai cliqué sur le nom de Lounès Matoub dans la liste. Une nouvelle page s'est ouverte avec son nom, sa nationalité et ses réalisations.

J'ai aussi vérifié que le bouton Back permet de revenir à la liste principale.

<img width="482" height="506" alt="Capture d’écran 2026-10-21 233948" src="https://github.com/user-attachments/assets/c02000b9-3f95-4f0e-a565-8d0342f74217" />

## 8. Conclusion

Ce travail m'a permis d'apprendre à créer et à personnaliser une application mobile avec NativeScript et Angular.

J'ai utilisé PowerShell, Visual Studio Code et Android Studio. J'ai modifié le titre de l'application et remplacé les scientifiques par des personnalités algériennes.

J'ai finalement réussi à lancer l'application sur l'émulateur Android et à afficher les détails d'une personnalité.


