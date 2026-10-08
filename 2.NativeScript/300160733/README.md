# 📱 Projet NativeScript – B300160733

## Présentation du projet

Dans ce travail, j’ai créé et exécuté une application mobile avec **NativeScript et Angular** sur un émulateur Android.

L’objectif était de vérifier l’environnement de développement, lancer l’application sur Android, puis personnaliser la liste des personnes affichées dans l’application.

---

## 1. Vérification de l’environnement NativeScript

J’ai commencé par vérifier la version de NativeScript installée avec la commande :

```powershell
ns --version
```

Ensuite, j’ai utilisé la commande suivante afin de vérifier que les outils nécessaires au développement Android étaient correctement installés :

```powershell
ns doctor
```

Le résultat indique que **Android SDK, Java JDK et NativeScript Android sont correctement configurés** et qu’aucun problème majeur n’a été détecté.



<img width="967" height="1077" alt="image" src="https://github.com/user-attachments/assets/5946ddec-e883-4753-a97e-cec67e7f24d4" />


---

## 2. Vérification de la connexion Android

J’ai ensuite essayé de vérifier les appareils Android disponibles avec :

```powershell
adb devices
```

PowerShell ne reconnaissait pas directement la commande `adb`. J’ai donc vérifié la configuration du SDK Android afin d’utiliser correctement les outils Android.



<img width="991" height="1075" alt="image" src="https://github.com/user-attachments/assets/6b815be8-82c1-4b1d-8f97-f7ac8b30d393" />


---

## 3. Démarrage de l’émulateur Android

Après la configuration, j’ai démarré un émulateur Android **Pixel 8**.

NativeScript a détecté l’émulateur et a commencé la préparation et la compilation du projet.



<img width="1917" height="1077" alt="image" src="https://github.com/user-attachments/assets/7b0db871-05e7-44ee-9f11-19617ada708d" />


---

## 4. Exécution de l’application NativeScript

J’ai lancé le projet avec la commande :

```powershell
ns run android
```

L’application a été compilée avec succès et exécutée sur l’émulateur Android.

La première version de l’application affichait une liste de scientifiques en informatique comme **Alan Turing, Grace Hopper, Ada Lovelace et Linus Torvalds**.



<img width="1912" height="1056" alt="image" src="https://github.com/user-attachments/assets/803eec26-e15f-44dc-9ce5-b754de9a13cd" />


---

## 5. Personnalisation de l’application

J’ai ensuite modifié les données de l’application dans le projet NativeScript.

J’ai remplacé la liste originale par une nouvelle liste contenant différentes personnes.

Pour chaque personne, les informations suivantes ont été ajoutées :

- Nom et prénom
- Nationalité
- Travail
- Ville

Quelques exemples utilisés dans l’application :

- Yanis Belhadi
- Amine Benali
- Sarah Martin
- Adam Wilson
- Lina Haddad
- Karim Bensalem
- Emma Johnson
- Mohamed Amari
- Sofia Rossi
- Lucas Tremblay

Après l’enregistrement des modifications, NativeScript a automatiquement recompilé et synchronisé l’application avec l’émulateur Android.



<img width="1892" height="1077" alt="image" src="https://github.com/user-attachments/assets/2603a328-61c3-465b-a967-2f011d07e089" />


---

## ✅ Résultat final

L’application fonctionne correctement sur l’émulateur Android.

J’ai réussi à :

- vérifier l’installation de NativeScript ;
- vérifier la configuration Android ;
- démarrer un émulateur Pixel 8 ;
- compiler et exécuter l’application ;
- modifier les données de l’application ;
- afficher ma nouvelle liste de personnes.

Le projet est maintenant fonctionnel et personnalisé.
