# Rapport de Configuration de l'Environnement de Développement local & Git/GitHub

**Auteur :** RIADH SAHRAOUI  
**Étudiant ID :** 300159203  
**Établissement :** Collège Boréal  

---

## 1. Création du dossier de développement `Developer`

Pour démarrer ce travail pratique, la première étape consiste à préparer l'arborescence locale dans le répertoire de développement personnel **Developer**, puis à cloner le dépôt collectif du cours fourni par le Collège Boréal.

J'ai créé le dossier `300159203` ainsi qu'un fichier de documentation `README.md`.

![Création du répertoire et du fichier README](https://github.com/user-attachments/assets/0912fda1-e4db-4f33-b428-a427c4cfe3ce)

---

## 2. Configuration Globale de Git

Afin d'associer correctement chaque modification à mon identité sur GitHub, la configuration globale de Git a été mise à jour avec mon éditeur de texte, mon nom et mon adresse courriel.

![Configuration globale Git](https://github.com/user-attachments/assets/9254a737-2517-44c1-82bc-1655d879459a)

---

## 3. Génération et Configuration des Clés SSH

Pour sécuriser les communications avec le serveur distant sans saisir de mot de passe à chaque opération, une clé d'authentification SSH de type **Ed25519** a été générée. 

Les fichiers par défaut ont ensuite été personnalisés et référencés dans le fichier de configuration SSH local (`~/.ssh/config`).

![Configuration des clés SSH](https://github.com/user-attachments/assets/796d437f-aa9f-4708-9f01-e533e14186cb)

---

## 4. Synchronisation avec le Dépôt Distant

Une fois le canal SSH opérationnel, les modifications locales comprenant le dossier `300159203` ont été transmises au serveur distant.

Confirmation du transfert réussi des objets vers le serveur distant :

![Confirmation du push Git](https://github.com/user-attachments/assets/396e4c19-7ace-4bbe-b96f-4565859e0b2d)

---

## 5. Bilan des Acquises et Compétences Validation

Les étapes réalisées ont permis de :

- **Maîtriser le workflow Git :** Initialisation, gestion de répertoires d'étudiant, staging, commits et synchronisation avec un dépôt collectif.
- **Sécuriser les accès avec SSH :** Génération de clés cryptographiques Ed25519, personnalisation de la configuration SSH et authentification sur GitHub.
- **Exploiter un IDE moderne :** Intégration de Visual Studio Code pour la gestion et l'édition efficace des projets informatiques.

L'environnement local est désormais totalement opérationnel pour la suite des modules et travaux pratiques à venir au Collège Boréal.
