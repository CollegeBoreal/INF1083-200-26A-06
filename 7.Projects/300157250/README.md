
# ✝️ Daily Faith

> Grow in Faith. Live in Grace.

![Version](https://img.shields.io/badge/Version-2.0-green)
![NativeScript](https://img.shields.io/badge/NativeScript-Mobile-blue)
![Angular](https://img.shields.io/badge/Angular-Framework-red)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![Platform](https://img.shields.io/badge/Platform-iOS-lightgrey)

## 👨‍💻 Informations du projet

- **Étudiant :** 300157250
- **Cours :** INF1083 – Développement d'applications
- **Session :** Automne 2026
- **Nom de l'application :** Daily Faith
- **Framework :** NativeScript avec Angular
- **Version actuelle :** 2.0

## 📖 Description du projet

Daily Faith est une application mobile chrétienne conçue pour renforcer la communication entre les pasteurs, les églises et les membres des communautés chrétiennes.

L'application propose un réseau communautaire chrétien permettant à chaque pasteur de créer et de gérer une page pour son église.

Les membres peuvent rechercher des églises, s'abonner à leurs communautés, consulter des enseignements bibliques, aimer les publications, commenter, participer aux événements et recevoir des notifications personnalisées.

## 🎯 Objectifs

- Encourager la méditation quotidienne de la Bible.
- Renforcer la communication entre les pasteurs et les membres.
- Faciliter le partage des enseignements bibliques.
- Permettre aux membres de découvrir différentes églises.
- Centraliser les publications et les événements.
- Personnaliser le fil d'actualité selon les abonnements.
- Développer un réseau communautaire chrétien.

## 📊 Évolution du projet

| Version | Description | Statut |
|---|---|---|
| V1.0 | Application chrétienne avec espace membre et pasteur | Terminée |
| V2.0 | Réseau communautaire et gestion de plusieurs églises | Implémentée |
| V3.0 | Intégration de Firebase et synchronisation distante | À venir |

## 🛠️ Technologies utilisées

| Technologie | Rôle |
|---|---|
| NativeScript | Développement mobile natif |
| Angular | Framework applicatif |
| TypeScript | Langage de programmation |
| XML / HTML | Interfaces NativeScript |
| CSS | Personnalisation du design |
| Node.js | Environnement de développement |
| Font Awesome | Icônes |
| ApplicationSettings | Stockage local |
| Image Picker | Sélection des images |
| Git et GitHub | Gestion des versions |
| Xcode | Simulation iOS |
| Android Studio | Environnement Android |

## 🧩 Plugins et modules

- `@nativescript/core`
- `@nativescript/angular`
- `@nativescript/tailwind`
- `@nativescript/imagepicker`
- `@fortawesome/fontawesome-free`
- `@angular/router`

## 🏗️ Architecture de l'application

L'application utilise une architecture modulaire basée sur les composants Angular autonomes (standalone).

### Patrons de conception

- Architecture basée sur les composants.
- Injection de dépendances.
- Services partagés.
- Navigation par routes.
- Guards pour le contrôle d'accès.
- Séparation de la présentation et de la logique métier.
- Gestion des rôles utilisateurs.
- Persistance locale des données.

### Principaux services

| Service | Responsabilité |
|---|---|
| AuthService | Authentification et comptes utilisateurs |
| ChurchService | Gestion des églises et abonnements |
| ChurchImageService | Gestion des logos et couvertures |
| MessageService | Publications, likes et commentaires |
| EventService | Événements et participations |
| NotificationService | Notifications et préférences |

## 🎨 Design de l'application

Daily Faith possède une interface moderne, élégante et inspirée de l'univers chrétien.

| Couleur | Code |
|---|---|
| Vert forêt | `#183B32` |
| Doré | `#C5A66A` / `#A88A50` |
| Crème | `#F7F4EC` |
| Blanc | `#FFFFFF` |

---

# 📱 VERSION 1.0 — Application chrétienne

La première version présente les fonctionnalités fondamentales de Daily Faith.

## Espace membre

### 1. Connexion

Connexion avec une adresse email et un mot de passe.

<img src="images/login.png" width="350">

### 2. Inscription

Création d'un compte membre avec validation des informations.

<img src="images/register.png" width="350">

### 3. Accueil

Présentation des messages bibliques et des activités de l'église.

<img src="images/home.png" width="350">

### 4. Messages bibliques

Consultation des enseignements publiés par le pasteur.

<img src="images/messages.png" width="350">

### 5. Likes et commentaires

Interaction avec les publications bibliques.

<img src="images/comments.png" width="350">

### 6. Événements

Consultation des activités et participation aux événements.

<img src="images/events.png" width="350">

### 7. Notifications

Consultation des notifications internes.

<img src="images/notifications.png" width="350">

### 8. Profil utilisateur

Consultation des informations personnelles et déconnexion.

<img src="images/profile.png" width="350">

## Espace pasteur

### 9. Tableau de bord

Espace réservé à l'administration.

<img src="images/admin.png" width="350">

### 10. Publication d'un message biblique

Création d'un enseignement biblique.

<img src="images/publish-message.png" width="350">

### 11. Gestion des messages

Modification et suppression des publications.

<img src="images/manage-messages.png" width="350">

### 12. Création d'un événement

Publication des activités de l'église.

<img src="images/create-event.png" width="350">

### 13. Gestion des événements

Modification et suppression des événements.

<img src="images/manage-events.png" width="350">

### 14. Envoi d'une notification

Envoi d'une annonce interne aux membres.

<img src="images/send-notification.png" width="350">

---

# 🌍 VERSION 2.0 — Réseau communautaire chrétien

La deuxième version transforme Daily Faith en une application permettant de gérer plusieurs communautés chrétiennes.

Chaque église possède sa propre page, ses abonnés, ses publications, ses événements et ses notifications.

## 🆕 Nouvelles fonctionnalités

- Création de plusieurs pages d'église.
- Recherche des communautés chrétiennes.
- Abonnement et désabonnement aux églises.
- Personnalisation du logo et de la couverture.
- Fil d'actualité personnalisé.
- Publications associées à une église.
- Likes individualisés par utilisateur.
- Commentaires associés aux comptes.
- Participation aux événements par utilisateur.
- Gestion des publications par pasteur.
- Gestion des événements par église.
- Notifications destinées aux abonnés.
- Préférences de notification par communauté.
- Indicateur des notifications non lues.

## 👤 Espace membre — V2

### 1. Accueil personnalisé

Le membre retrouve les communautés auxquelles il est abonné ainsi que leurs publications bibliques.

<img src="images/v2-accueil.png" width="450">

### 2. Recherche des églises

Le membre peut rechercher une église par son nom, son identifiant, son pasteur, sa ville ou son pays.

<img src="images/v2-recherche.png" width="450">

### 3. Profil public d'une église

Chaque église dispose d'une page personnalisée comprenant :

- Un logo.
- Une image de couverture.
- Le nom de l'église.
- Le nom du pasteur.
- La localisation.
- Une description.
- Le nombre d'abonnés.
- Les publications.
- Les événements.
- Un bouton d'abonnement.

<img src="images/v2-profil-eglise.png" width="450">

### 4. Mes églises

Le membre peut consulter et gérer les communautés auxquelles il est abonné.

<img src="images/v2-mes-eglises.png" width="450">

### 5. Publications et interactions

Les membres peuvent aimer les publications et ajouter des commentaires associés à leur compte.

<img src="images/v2-publication.png" width="450">

### 6. Événements et participation

Les membres peuvent consulter les événements de leurs communautés et confirmer leur participation.

<img src="images/v2-participation.png" width="450">

### 7. Notifications personnalisées

Les membres reçoivent les notifications internes des églises auxquelles ils sont abonnés, selon leurs préférences.

<img src="images/v2-notifications.png" width="450">

### 8. Préférences de notification

Chaque membre peut activer ou désactiver les futures notifications d'une communauté.

<img src="images/v2-preferences.png" width="450">

### 9. Profil du membre

Le membre peut consulter les informations de son compte et fermer sa session.

<img src="images/v2-profil-membre.png" width="450">

## ⛪ Espace pasteur — V2

### 1. Tableau de bord administrateur

Le pasteur dispose d'un tableau de bord pour accéder aux fonctionnalités de gestion.

<img src="images/v2-admin.png" width="450">

### 2. Création d'une église

Le pasteur peut créer une page pour sa communauté en renseignant :

- Le nom de l'église.
- Un identifiant unique.
- Le nom du pasteur.
- Le pays.
- La ville.
- L'adresse.
- La description.

<img src="images/v2-creer-eglise.png" width="450">

### 3. Gestion des églises

Le pasteur peut consulter et gérer les communautés dont il est propriétaire.

<img src="images/v2-gerer-eglises.png" width="450">

### 4. Personnalisation du profil

Le pasteur peut modifier les informations de son église, son logo et son image de couverture.

<img src="images/v2-modifier-eglise.png" width="450">

### 5. Publication d'un message biblique

Le pasteur sélectionne son église et publie un enseignement comprenant un titre, une référence biblique et un contenu.

Une notification interne est générée pour les abonnés concernés.

<img src="images/v2-publier-message.png" width="450">

### 6. Gestion des publications

Le pasteur peut consulter, modifier et supprimer ses publications.

<img src="images/v2-gerer-messages.png" width="450">

### 7. Création d'un événement

Le pasteur peut créer un événement associé à son église.

<img src="images/v2-creer-evenement.png" width="450">

### 8. Gestion des événements

Le pasteur peut consulter les événements, les modifier, les supprimer et consulter le nombre de participants.

<img src="images/v2-gerer-evenements.png" width="450">

### 9. Envoi d'une annonce

Le pasteur peut envoyer une annonce aux abonnés de son église ayant activé les notifications.

<img src="images/v2-envoyer-annonce.png" width="450">

---

## 🔐 Gestion des rôles

| Fonctionnalité | Membre | Pasteur |
|---|---|---|
| Connexion | Oui | Oui |
| Recherche d'églises | Oui | — |
| Abonnement aux églises | Oui | — |
| Consultation des publications | Oui | Oui |
| Likes et commentaires | Oui | — |
| Participation aux événements | Oui | — |
| Préférences de notification | Oui | — |
| Création d'une église | Non | Oui |
| Gestion de ses églises | Non | Oui |
| Publication de messages | Non | Oui |
| Gestion des événements | Non | Oui |
| Envoi d'annonces | Non | Oui |

Les Guards Angular et les vérifications dans les services permettent de contrôler les accès dans le prototype local.

## 🔑 Comptes de démonstration

### Compte membre

- Email : `test@dailyfaith.com`
- Mot de passe : `123456`

### Compte pasteur

- Email : `admin@dailyfaith.com`
- Mot de passe : `Admin123`

Ces identifiants sont fictifs et réservés à la démonstration du prototype.

## 💾 Persistance des données

Daily Faith utilise ApplicationSettings pour conserver localement :

- Les comptes utilisateurs.
- Les églises.
- Les abonnements.
- Les publications bibliques.
- Les likes.
- Les commentaires.
- Les événements.
- Les participations.
- Les notifications.
- Les préférences de notification.

Les logos et les images de couverture sont enregistrés dans le stockage local de l'application.

Les données restent disponibles après le redémarrage de l'application sur le même appareil.

## 🚀 Installation et exécution

### Prérequis

- Node.js
- npm
- NativeScript CLI
- Xcode pour iOS
- Android Studio pour Android
- Git

### Installer NativeScript CLI

```bash
npm install -g nativescript
```

### Accéder au projet depuis la racine du dépôt

```bash
cd 7.Projects/300157250/DailyFaith/DailyFaith
```

### Installer les dépendances

```bash
npm install
```

### Vérifier l'environnement

```bash
ns doctor
```

### Vérifier la compilation Angular

```bash
npx ngc --noEmit
```

### Afficher les appareils disponibles

```bash
ns devices
```

### Lancer sur le simulateur iOS

```bash
ns run ios --emulator
```

### Lancer sur un simulateur précis

```bash
ns run ios --device D48BC510-73FA-4E8F-A765-E200FB806266
```

Cet identifiant correspond au simulateur utilisé pendant le développement. Il doit être adapté selon l'environnement.

### Lancer sur Android

```bash
ns run android
```

### Nettoyer le projet si nécessaire

```bash
ns clean
```

## 🧪 Tests réalisés

### Version 1.0

| Test | Résultat |
|---|---|
| Connexion membre | Réussi |
| Connexion pasteur | Réussi |
| Création de compte | Réussi |
| Déconnexion | Réussi |
| Publication de messages | Réussi |
| Modification de messages | Réussi |
| Suppression de messages | Réussi |
| Likes et commentaires | Réussi |
| Création d'événements | Réussi |
| Modification d'événements | Réussi |
| Suppression d'événements | Réussi |
| Envoi de notifications internes | Réussi |
| Persistance des données | Réussi |

### Version 2.0

| Fonctionnalité | État |
|---|---|
| Compilation iOS | Réussie |
| Création d'une église | Testée |
| Personnalisation du logo | Testée |
| Personnalisation de la couverture | Testée |
| Recherche d'églises | Implémentée |
| Abonnement aux églises | Testé |
| Profil public d'une église | Testé |
| Fil d'actualité personnalisé | Implémenté |
| Likes individualisés | Implémentés |
| Commentaires par utilisateur | Implémentés |
| Gestion des publications | Testée |
| Création d'événements par église | Testée |
| Participation individualisée | Implémentée |
| Envoi d'une annonce | Testé |
| Réception d'une annonce | Testée |
| Notifications automatiques | Implémentées |
| Préférences de notification | Implémentées |
| Isolation des notifications entre comptes | À approfondir |
| Exécution Android | À vérifier |

### Environnement de test

- MacBook Air.
- Xcode.
- Simulateur iPad Air 11 pouces (M3).
- NativeScript CLI.
- Angular et TypeScript.

## 📂 Gestion des versions avec Git

### Version 1.0

Développement des fonctionnalités fondamentales de l'application.

### Version 2.0

Développement du réseau communautaire dans une branche dédiée.

```bash
git switch -c dailyfaith-v2
```

Publication de la branche :

```bash
git push -u origin dailyfaith-v2
```

La version 2.0 a été intégrée à la branche principale à travers la Pull Request suivante :

[Pull Request #44 — Daily Faith V2](https://github.com/CollegeBoreal/INF1083-200-26A-06/pull/44)

### Synchronisation de la branche principale

```bash
git switch main
git pull --ff-only origin main
git status
```

## ⚠️ Limites actuelles

Daily Faith est actuellement un prototype scolaire.

- Les données sont stockées localement.
- Les mots de passe de démonstration sont stockés en clair.
- Les sessions sont conservées en mémoire.
- Les notifications sont internes et non des notifications push.
- Les données ne sont pas synchronisées entre plusieurs appareils.
- Les images sont conservées localement.
- Certaines dates ne sont pas encore affichées correctement en français.
- Les statistiques générales du tableau de bord doivent être affinées.
- Les restrictions d'accès nécessitent des tests complémentaires.
- L'exécution sur Android reste à vérifier.

---

# ☁️ VERSION 3.0 — Firebase

La troisième version aura pour objectif de transformer le prototype local en une application connectée à une infrastructure distante.

## Fonctionnalités prévues

| Technologie | Objectif | Statut |
|---|---|---|
| Firebase Authentication | Authentification sécurisée | À venir |
| Cloud Firestore | Base de données distante | À venir |
| Firebase Storage | Stockage des images | À venir |
| Firebase Cloud Messaging | Notifications push | À venir |
| Firebase Security Rules | Protection des données | À venir |

## Objectifs de la V3

- Authentification sécurisée des membres et pasteurs.
- Synchronisation entre plusieurs appareils.
- Gestion distante des comptes utilisateurs.
- Stockage distant des églises.
- Publication des messages en ligne.
- Synchronisation des likes et commentaires.
- Gestion des abonnements en ligne.
- Stockage des logos et couvertures.
- Notifications push.
- Protection des données et contrôle des permissions.
- Gestion de plusieurs pasteurs par communauté.

## 📌 Conclusion

Daily Faith est une application mobile chrétienne développée dans le cadre du cours INF1083.

La première version a permis de mettre en place les fonctionnalités fondamentales.

La deuxième version introduit un réseau communautaire chrétien permettant aux pasteurs de gérer leurs églises et aux membres de suivre différentes communautés.

La troisième version permettra de poursuivre le développement avec une infrastructure distante et une authentification sécurisée.

---

**Daily Faith — Grow in Faith. Live in Grace. ✝️**
