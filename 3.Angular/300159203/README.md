# Compte Rendu de Laboratoire : INF1083 – Angular

**Matricule étudiant :** 300159203  
**Cours :** INF1083 – Développement Web (Session A26 SECTION 6)  
**Projet :** B300159203  

---

## 1. Description du Projet et Objectifs

L'objectif de ce laboratoire était d'installer l'environnement de développement modernisé pour Angular, d'initialiser une application à base de composants autonomes (*Standalone Components*) et d'implémenter :

* **L'interpolation de données dynamiques** (*String Interpolation*).
* **La gestion des événements utilisateur** (*Event Binding*).
* **La liaison bidirectionnelle** (*Two-Way Data Binding*) pour la gestion dynamique d'une liste.
* **L'intégration et la consommation d'une API REST externe** via des requêtes HTTP.

---

## 2. Étapes de Réalisation

### Étape 1 : Préparation du répertoire et suivi Git
* **Création du dossier de travail :** Un répertoire nommé `300159203` a été créé sous `3.Angular`.
* **Initialisation du dépôt :** Ajout du fichier d'ancrage `images/.gitkeep`, validation du commit (`"Ajout de images"`) et synchronisation sur le dépôt GitHub distant (`CollegeBoreal/INF1083-200-26A-06`).

![Initialisation du dossier et README](images/Screenshot%202026-10-04%20121721.png)

![Creation gitkeep et git push](images/Screenshot%202026-10-04%20121753.png)

---

### Étape 2 : Vérification de l'environnement et installation de l'Angular CLI
* **Vérification des versions :**
  * Node.js : `v24.21.0`
  * npm : `11.19.0`

![Verification des versions Node et npm](images/Screenshot%202026-10-04%20121926.png)

* **Installation CLI :** Installation globale du package `@angular/cli` et confirmation de la version **22.2.1**.

![Installation Angular CLI](images/Screenshot%202026-10-04%20121855.png)

---

### Étape 3 : Génération et premier lancement de l'application
* **Création du projet :** Exécution de `ng new B300159203 --routing --style=css` pour générer la structure initiale.

![Generation du projet Angular](images/Screenshot%202026-10-04%20122210.png)

* **Vérification du serveur local :** Exécution de `ng serve`.

![Lancement du serveur ng serve](images/Screenshot%202026-10-04%20122525.png)

* **Validation du rendu initial :** Affichage sur `http://localhost:4200` confirmant *"Hello, B300159203"*.

![Rendu initial sur localhost](images/Screenshot%202026-10-04%20122555.png)

* **Sauvegarde Git :** Commit et push des fichiers générés (`"Ajout du projet Angular B300159203"`).

![Git add commit push du projet](images/Screenshot%202026-10-04%20122939.png)

---

### Étape 4 : Développements des fonctionnalités
* **Composant autonome :** Création du composant `Bienvenue` et configuration de son script dans `src/app/bienvenue/bienvenue.ts`.
* **Variables d'état :**
  * Title/Header : `"Bienvenue dans INF1083 session A26 SECTION 6"`.
  * Liste d'étudiants initiale : `["Riadh", "Bilel", "Hichem", "Oualid", "Rayan"]`.

![Code de bienvenue.ts dans VS Code](images/Screenshot%202026-10-04%20125301.png)

---

## 3. Résultats et Validation

L'application a été compilée et exécutée avec succès via `ng serve`. L'interface sur `http://localhost:4200` confirme le bon fonctionnement de tous les blocs :

1. **Entête dynamique :** Le titre personnalisé s'affiche correctement en haut de page.
2. **Interactivité :** Le bouton d'événement réagit aux clics.
3. **Gestion d'état (Liste) :** La liste d'étudiants s'affiche correctement avec la possibilité d'ajouter de nouveaux noms (ex: *youcef*) ou d'en supprimer.
4. **Intégration API REST :** Les données des 10 utilisateurs de test (ex: *Leanne Graham*, *Ervin Howell*, etc.) sont récupérées depuis le serveur distant et rendues dynamiquement dans le DOM.

![Resultat final dans le navigateur sur localhost:4200](images/Screenshot%202026-10-04%20124842.png)

Afin d'améliorer l'expérience utilisateur et l'esthétique générale de l'application, une refonte visuelle a été effectuée à l'aide de styles CSS personnalisés. Les éléments de l'interface (boutons, champs de saisie, listes et typographies) ont été modernisés avec un alignement propre, une palette de couleurs harmonieuse et des effets d'interaction au survol, rendant la navigation plus claire et professionnelle.

<img width="639" height="647" alt="image" src="https://github.com/user-attachments/assets/0f51c7d7-f134-45d9-a3ae-518a1c43b5e7" />  

j ai encore modifier et le site final a cette forme  
<img width="644" height="657" alt="image" src="https://github.com/user-attachments/assets/150fa525-65b3-44ba-a990-e3e3cbae55f8" />












