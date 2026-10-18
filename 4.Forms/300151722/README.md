# Travail 4 – Forms avec NativeScript Angular

**Nom et prénom :** Islam Oustani  
**Numéro d'étudiant :** 300151722  
**Cours :** INF1083 – Développement d'applications  
**Projet :** B300151722  
**Environnement :** Windows, PowerShell, Visual Studio Code et Android Emulator

---

## 1. Description du projet

Ce travail consiste à développer une application mobile Android avec NativeScript et Angular.

J'ai créé un formulaire d'inscription permettant à un utilisateur de saisir son adresse email, son nom d'utilisateur et son mot de passe.

L'application vérifie les informations saisies et affiche des messages d'erreur ou de confirmation selon les résultats.

## 2. Fonctionnalités

- Saisie et validation de l'adresse email.
- Vérification du nom d'utilisateur (minimum 3 caractères).
- Vérification du mot de passe (minimum 6 caractères).
- Affichage et masquage du mot de passe avec Show/Hide.
- Confirmation du mot de passe.
- Bouton SIGN UP pour valider les informations.
- Bouton RESET pour réinitialiser le formulaire.
- Affichage de l'email et du username dans la console PowerShell.

## 3. Installation et lancement

Pour lancer l'application Android, utiliser les commandes suivantes dans PowerShell :

```powershell
cd ~/Developer/INF1083-PROPRE/4.Forms/300151722/B300151722
npm install
ns run android
```

L'application démarre sur un émulateur Android configuré.

## 4. Captures d'écran

### Capture 1 – Création du projet

Création de l'application NativeScript Angular avec PowerShell.

<img width="972" height="1041" alt="1" src="https://github.com/user-attachments/assets/52b4fd53-21a3-4351-9098-9cd35681051c" />


### Capture 2 – Installation du projet

Installation des dépendances et création des fichiers nécessaires à l'application.

<img width="957" height="1062" alt="2" src="https://github.com/user-attachments/assets/d08e2b4c-dc62-4a6d-9549-0450ad954294" />

### Capture 3 – Inscription réussie

Lorsque les informations saisies sont valides, l'application affiche le message vert « Account created successfully! ».

<img width="511" height="912" alt="3" src="https://github.com/user-attachments/assets/750ede64-bb28-4ef9-9403-95621ff0f696" />


### Capture 4 – Email invalide

Lorsque l'adresse email est incorrecte, l'application affiche un message d'erreur en rouge.

<img width="537" height="945" alt="4" src="https://github.com/user-attachments/assets/8420d692-5bc6-4655-9872-36992e8a6c60" />


### Capture 5 – Username invalide

Lorsque le nom d'utilisateur contient moins de trois caractères, l'application affiche un message d'erreur.

<img width="520" height="951" alt="5" src="https://github.com/user-attachments/assets/ec749d31-d3d5-41a0-8779-d223e5db8e8a" />


### Capture 6 – Confirmation du mot de passe

Lorsque les deux mots de passe sont différents, l'application affiche « Passwords do not match. ».

<img width="527" height="977" alt="6" src="https://github.com/user-attachments/assets/1f76565d-9ff8-408d-b8b2-bb4720239ace" />


### Capture 7 – Réinitialisation du formulaire

Le bouton RESET permet d'effacer tous les champs et de remettre le formulaire dans son état initial.

<img width="567" height="966" alt="7" src="https://github.com/user-attachments/assets/0d159f06-c87b-48e8-afdc-e34814004f60" />


## 5. Résultats

L'application a été testée sur un émulateur Android.

Les fonctionnalités principales ont été vérifiées : validation des champs, affichage des messages, confirmation du mot de passe et réinitialisation du formulaire.

## 6. Conclusion

Ce laboratoire m'a permis de mieux comprendre le développement mobile avec NativeScript et Angular.

J'ai appris à créer un formulaire interactif, à valider les informations saisies et à gérer les événements des boutons avec TypeScript.

Ce travail m'a également permis d'améliorer mes compétences en développement d'applications Android et en utilisation de GitHub.
