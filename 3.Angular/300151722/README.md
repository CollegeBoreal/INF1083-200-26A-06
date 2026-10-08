# Première application Angular

**Nom :** Oustani Islam  
**Numéro étudiant :** B300151722  
**Projet :** B300151722  
**Plateforme utilisée :** Windows  

---

## 1. Installation de Angular CLI

J'ai commencé par vérifier si Angular CLI était installé avec la commande :

```powershell
ng version
```

Angular CLI n'était pas encore installé. J'ai donc utilisé la commande :

```powershell
npm install -g @angular/cli
```

Après l'installation, j'ai vérifié de nouveau avec :

```powershell
ng version
```

Angular CLI a été installé correctement.

<img width="960" height="1055" alt="2 1" src="https://github.com/user-attachments/assets/bd44c355-8679-4df3-9894-2bd628dc4139" />


---

## 2. Création du projet Angular

J'ai créé mon dossier étudiant puis mon projet Angular avec les commandes suivantes :

```powershell
mkdir .\3.Angular\B300151722
cd .\3.Angular\B300151722
ng new B300151722
```

J'ai choisi **CSS** comme système de styles et je n'ai pas activé SSR/SSG.

Ensuite, je suis entré dans le projet et j'ai lancé l'application :

```powershell
cd .\B300151722
ng serve
```

Le serveur Angular a démarré sur :

```text
http://localhost:4200
```

<img width="995" height="1048" alt="3 2" src="https://github.com/user-attachments/assets/3d4ea546-953b-47fa-aeb3-664495694bb6" />


---

## 3. Première exécution

Après avoir lancé `ng serve`, j'ai ouvert l'application dans le navigateur avec l'adresse :

```text
http://localhost:4200
```

La page Angular par défaut s'est affichée correctement.

<img width="1600" height="887" alt="3 3" src="https://github.com/user-attachments/assets/2b785eb5-d07d-45d9-87e3-a84ea1267efd" />


---

## 4. Création du composant Accueil

J'ai créé un nouveau composant Angular avec la commande :

```powershell
ng generate component accueil
```

J'ai ensuite modifié le composant pour afficher un message de bienvenue avec mon numéro étudiant.

<img width="557" height="502" alt="3 3 1" src="https://github.com/user-attachments/assets/5c1ed2ad-c169-4091-8ae7-aac227a4a698" />

---

## 5. Liste des étudiants et bouton

J'ai créé une liste d'étudiants en TypeScript :

```typescript
etudiants = [
  'Alice',
  'Bob',
  'Charlie'
];
```

J'ai affiché cette liste avec Angular en utilisant `*ngFor`.

J'ai également ajouté un bouton **Ajouter** dans le cadre de l'exercice 4.

Le résultat final affiche :

- Alice
- Bob
- Charlie
- un bouton Ajouter

<img width="592" height="1007" alt="3-1" src="https://github.com/user-attachments/assets/0418a57b-05ef-40a0-992b-46e3d6093f82" />

---

## Résultat final

L'application Angular fonctionne correctement sur `localhost:4200`.  
J'ai appris à installer Angular CLI, créer un projet Angular, lancer un serveur avec `ng serve`, créer un composant, afficher une liste avec `*ngFor` et ajouter un bouton avec un événement Angular.

L'application Angular fonctionne correctement sur `localhost:4200`.  
J'ai appris à installer Angular CLI, créer un projet Angular, lancer un serveur avec `ng serve`, créer un composant, afficher une liste avec `*ngFor` et ajouter un bouton avec un événement Angular.
