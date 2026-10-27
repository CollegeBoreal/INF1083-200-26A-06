# 300159672

### Description du projet NativeScript

Dans le cadre du travail pratique en INF1083, j'ai créé une application mobile avec NativeScript et Angular à partir de mon identifiant étudiant `300159672`. Le projet a été créé avec le modèle **Hello World** et se trouve dans le dossier `B300159672`. Comme je travaille sur un MacBook Pro, je l'ai lancé sur le simulateur **iOS**, puis je l'ai personnalisé en remplaçant la liste des informaticiens par une liste de **personnalités influentes**.

![Application personnalisée](images/08-app-personnalisee.png)

### 1. Création du projet

J'ai d'abord créé mon dossier `300159672` dans `2.NativeScript`, avec un fichier `README.md` et un dossier `images`. Node.js était déjà installé (v20.20.2), mais pas NativeScript. Je l'ai donc installé avec `npm install -g nativescript`, puis j'ai vérifié la version avec `ns --version`.

J'ai ensuite créé le projet depuis mon dossier :

```bash
ns create B300159672
```

J'ai choisi **Angular** comme style de projet, puis le modèle **Hello World**. Le message `Project B300159672 was successfully created.` confirme que le projet a bien été créé.

![Création du projet](images/04-creation-projet.png)

### 2. Vérification de l'environnement iOS

Avant de lancer l'application, j'ai vérifié que mon environnement était prêt pour iOS :

```bash
cd B300159672
ns doctor ios
```

Le résultat indique `No issues were detected`. Xcode, CocoaPods et les composants NativeScript (`nativescript` 9.1.2, `@nativescript/core` 9.1.3 et `@nativescript/ios` 9.1.0) sont installés et à jour. Contrairement à Windows, où la compilation iOS n'est pas possible, mon Mac n'a demandé aucune configuration supplémentaire.

![Vérification iOS](images/03-verification-ios.png)

### 3. Lancement de l'application

J'ai ouvert le simulateur, puis lancé l'application :

```bash
open -a Simulator
ns run ios
```

Le premier lancement prend du temps, car NativeScript prépare le projet avec webpack, résout les dépendances Swift et compile avec Xcode. Le terminal affiche ensuite `Successfully synced application org.nativescript.B300159672`, et l'application s'affiche dans le simulateur iPhone 17 avec la liste d'origine, **Computer Scientists**. Grâce à `HMR Enabled`, chaque fichier enregistré met à jour l'application automatiquement, sans relancer la commande.

![Application d'origine](images/06-app-originale.png)

### 4. Personnalisation de l'application

J'ai cherché les fichiers responsables de l'affichage dans `src/app/people/`. Le titre se trouve dans `person.component.html`. J'ai remplacé :

```html
<ActionBar title="Computer Scientists" iosLargeTitle="true"> </ActionBar>
```

par :

```html
<ActionBar title="Personnalités influentes" iosLargeTitle="true"> </ActionBar>
```

Dans ce fichier, la `ListView` affiche les éléments de `personService.items()` : pour chaque personne, un `Label` montre son nom, et un `nsRouterLink` ouvre la page de détail. Les données viennent du service `PersonService` (`person.service.ts`), déclaré avec le décorateur `@Injectable({providedIn: 'root'})`, ce qui permet à Angular d'en créer une seule instance pour toute l'application. La liste est stockée dans un `signal<Person[]>`, une valeur réactive qui met l'interface à jour quand elle change.

J'ai donc remplacé la liste originale par 10 **personnalités influentes**, en gardant la même structure de données (`id`, `name`, `nationality` et `notableAchievements`), avec **Nelson Mandela en première position**. Voici un extrait :

```typescript
{ id: 1, name: "Nelson Mandela", nationality: "Sud-africaine", notableAchievements: ["Leader de la lutte contre l'apartheid", "Premier président noir d'Afrique du Sud", "Prix Nobel de la paix en 1993"] },
```

Les autres personnalités sont Marie Curie, Albert Einstein, Martin Luther King Jr., Malala Yousafzai, Wangari Maathai, Tim Berners-Lee, Mahatma Gandhi, Rosa Parks et Ada Lovelace. Chacune possède un nom, une nationalité et quelques réalisations importantes.

![Code modifié](images/07-code-modifie.png)

### 5. Problèmes rencontrés

**Erreur pendant `ns create`.** Après le choix du modèle, l'installation des dépendances s'est arrêtée avec cette erreur :

```text
npm error Cannot read properties of null (reading 'edgesOut')
Command npm failed with exit code 1
```

Le projet n'était pas créé. J'ai d'abord vérifié le cache de npm avec `npm cache verify`, sans effet, ce qui m'a permis d'éliminer cette piste. Le problème venait de la version de npm installée (10.8.2). Je l'ai donc mise à jour :

```bash
npm install -g npm@11
```

Avec npm 11.21.1, la commande `ns create B300159672` s'est terminée correctement.

**Avertissements après l'installation.** Le terminal affiche des avertissements `EBADENGINE` (certains paquets Angular préfèrent Node 22, et j'ai Node 20) et des vulnérabilités signalées par npm. Ce ne sont pas des erreurs : le projet compile et fonctionne. Je n'ai pas lancé `npm audit fix --force`, comme demandé par le professeur.

**Mauvais dossier.** J'avais deux dossiers `300159672` sur mon ordinateur, et la commande `cd B300159672` échouait dans le mauvais. J'ai résolu le problème en utilisant le chemin complet : `~/Developer/INF1083-200-26A-06/2.NativeScript/300159672/B300159672`.

### Conclusion

La principale difficulté du projet a été l'erreur d'installation liée à la version de npm, que j'ai résolue en la mettant à jour. Sur Mac, l'environnement iOS était déjà prêt, et `ns doctor ios` me l'a confirmé. J'ai réussi à lancer l'application NativeScript sur iOS et à la personnaliser en remplaçant les informaticiens par des personnalités influentes. Ce travail m'a aussi permis de comprendre comment un service Angular fournit les données à un composant NativeScript.
