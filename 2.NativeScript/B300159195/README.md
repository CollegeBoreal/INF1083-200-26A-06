<img width="945" height="2048" alt="image" src="https://github.com/user-attachments/assets/c2a40862-2986-42fa-87e5-59753b804425" />

# B300159195 — Application NativeScript Angular sur Android

**Étudiant :** Islem Touadjni  
**Projet :** B300159195  
**Environnement :** Windows, VS Code, NativeScript avec Angular, Android Studio et téléphone Samsung connecté en USB.

## Objectif

Créer une application Android NativeScript, remplacer la liste d’exemple par quinze personnes aux noms arabes transcrits en français, associer à chaque personne un pays africain et une profession ou une ville, puis vérifier le résultat sur le téléphone. Ce journal présente les captures dans l’ordre du travail ; le texte placé sous chaque image décrit exactement l’étape correspondante.

## Réalisation et résolution des problèmes

### 01. Installation de Node.js

<img width="1536" height="1152" alt="01-01-1000052746" src="https://github.com/user-attachments/assets/c912b35f-174c-4e3a-beb0-c5969621b766" />

Installation de Node.js LTS avec Chocolatey sous Windows. Le terminal confirme que le paquet `nodejs-lts` a été installé. Après cette installation, une nouvelle session de terminal permet de prendre en compte les changements du `PATH`.

### 02. Installation de la CLI NativeScript

<img width="1536" height="1152" alt="02-02-1000052747" src="https://github.com/user-attachments/assets/ea8c630c-d7ad-4640-9617-ef0528531028" />

La commande `npm install -g nativescript` installe l’outil de création et d’exécution des projets NativeScript. Le message concernant les scripts npm est un avertissement ; l’installation des paquets s’est terminée.

```powershell
npm --version
npm install -g nativescript
```

### 03. Vérification et diagnostic

<img width="1536" height="1152" alt="03-03-1000052748" src="https://github.com/user-attachments/assets/e7c0adb6-1053-4d10-9790-90cec93dc6bb" />

`ns --version` affiche la version 9.1.1. `ns doctor` lance ensuite le contrôle des prérequis ; il demande si l’on accepte l’envoi de statistiques anonymes.

```powershell
ns --version
ns doctor
```

### 04. Premier diagnostic : prérequis manquants

<img width="1536" height="1152" alt="04-04-1000052749" src="https://github.com/user-attachments/assets/09827d15-dd77-40a9-a29e-98f3bddc645d" />

Le diagnostic indique qu’`ANDROID_HOME` ne pointe pas encore vers un SDK utilisable, que `adb`, les plateformes et les Build-Tools Android manquent, et que la commande `javac` ne fonctionne pas. Le projet ne peut donc pas encore être compilé pour Android.

### 05. Téléchargement d’Android Studio

<img width="1536" height="1152" alt="05-10-1000052755" src="https://github.com/user-attachments/assets/8086f6a9-d994-4279-88d7-a6d5413d73ba" />

Ouverture du site de téléchargement d’Android Studio pour installer les outils Android nécessaires au projet : SDK, plateformes et outils de compilation.

### 06. Création du projet Angular

<img width="1536" height="1152" alt="06-08-1000052753" src="https://github.com/user-attachments/assets/81cd19c3-7f3e-4217-873b-4606403551a8" />

Depuis le dossier de travail sur le Bureau, la commande `ns create B300159195` lance la création du projet. Le modèle **Angular** a été choisi dans le menu interactif.

```cmd
ns create B300159195
```

### 07. Confirmation de la création

<img width="1536" height="1152" alt="07-09-1000052754" src="https://github.com/user-attachments/assets/77a2bb3b-ef31-416e-a07d-6cb681e724aa" />

Le terminal affiche « Project B300159195 was successfully created ». Il propose ensuite `ns run android` pour Android. Ce message confirme seulement la création des fichiers, pas encore le fonctionnement sur un appareil.

### 08. Accès au projet

<img width="1536" height="1152" alt="08-10-1000052755" src="https://github.com/user-attachments/assets/b1547930-36cc-431a-9919-c7db0ff186fc" />

Une fois le projet créé, on entre dans son répertoire avant de lancer les commandes NativeScript.

```cmd
cd B300159195
```

### 09. Obstacle : émulateur incompatible

<img width="1536" height="1152" alt="09-02-1000052768" src="https://github.com/user-attachments/assets/427b1544-4341-4617-ae3f-127574b84b3d" />

Dans Android Studio, la création d’un appareil virtuel affiche « Your CPU does not support required features (VT-x or SVM) ». Nous avons donc utilisé un téléphone Android physique pour les essais. Ce message seul ne démontre pas que la virtualisation est désactivée dans Windows.

### 10. Installation et vérification des outils Android

<img width="1536" height="1152" alt="10-01-1000052767" src="https://github.com/user-attachments/assets/9bd5bfe4-1447-4267-96e9-e1799c747cf1" />

`sdkmanager` télécharge et décompresse l’émulateur. Le contrôle `Test-Path` renvoie `True` : le fichier existe, même si l’appareil virtuel demeure inutilisable sur cette machine. La mention « deprecated » de `sdkmanager` est un avertissement.

```powershell
Test-Path "$env:ANDROID_HOME\emulator\emulator.exe"
```

### 11. Activation du débogage USB sur le téléphone

<img width="709" height="1536" alt="11-03-1000052769" src="https://github.com/user-attachments/assets/30ac06c7-7bf7-41ea-9e62-a15c8fa82766" />

Dans les options développeur du téléphone Samsung, **Débogage USB** est activé afin que l’ordinateur puisse communiquer avec lui via ADB. Le téléphone est relié au PC par câble USB et l’autorisation de débogage est accordée sur le téléphone.

### 12. Vérification de la connexion ADB

<img width="1536" height="1152" alt="12-04-1000052770" src="https://github.com/user-attachments/assets/9044e412-88ed-4d76-a789-49f28288a8c1" />

La commande ADB affiche un appareil avec l’état `device` (`R3CX20FAHRB`) : le téléphone est prêt à recevoir l’application. Ici `&` est l’opérateur d’exécution de PowerShell pour lancer un programme dont le chemin est entre guillemets.

```powershell
& "$env:ANDROID_HOME\platform-tools\adb.exe" devices
```

### 13. Premier échec de compilation avec Java

<img width="1536" height="1152" alt="13-01-image-1790263663785" src="https://github.com/user-attachments/assets/a20699c7-cd9b-40b2-8afd-dd5a9e1f43ad" />

Le premier lancement Android échoue pendant la compilation Gradle. Le journal mentionne « Unsupported class file major version 69 » : la version de Java alors sélectionnée n’est pas compatible avec cette chaîne de compilation.

```powershell
ns run android
```

### 14. Correction : installation du JDK 21

<img width="1152" height="1536" alt="14-05-1000052771" src="https://github.com/user-attachments/assets/d2234c03-2107-4e14-8f68-044a0f25d0ee" />

Installation de **Microsoft Build of OpenJDK 21**, version ARM64 adaptée à la machine. Il faut ensuite faire pointer `JAVA_HOME` vers ce JDK et placer son dossier `bin` dans le `PATH` du terminal. Le chemin exact dépend de l’installation Windows.

### 15. Contrôle de Java et nouvelle exécution

<img width="1536" height="1152" alt="15-09-1000052775" src="https://github.com/user-attachments/assets/4de17244-2805-4421-8bed-b8afb96e0c1e" />

`java -version` confirme Java 21. Une nouvelle commande `ns run android` démarre la recherche du téléphone et prépare le projet. Si PowerShell conserve l’ancienne version, ouvrir un nouveau terminal après avoir configuré `JAVA_HOME`.

```powershell
java -version
ns run android
```

### 16. Dialogue du pare-feu Windows

<img width="1152" height="1536" alt="16-07-1000052773" src="https://github.com/user-attachments/assets/7265cc17-0087-414b-972e-6bf10fbdc696" />

Au lancement du serveur de développement, Windows affiche une demande d’accès réseau pour Node.js. Cette boîte de dialogue appartient au pare-feu Windows ; elle apparaît pendant l’exécution du projet. La capture ne permet pas de déterminer quel choix a finalement été validé.

### 17. Installation des composants Android et compilation

<img width="1152" height="1536" alt="17-06-1000052772" src="https://github.com/user-attachments/assets/a0e2c932-3a3c-4bd6-9012-3cf16a9e6c7c" />

Webpack compile les fichiers Angular et NativeScript surveille les changements. La console installe automatiquement les Build-Tools 35.0.1 ainsi que les plateformes Android nécessaires ; Gradle construit ensuite l’application.

### 18. Succès : application installée sur le téléphone

<img width="1536" height="1152" alt="18-08-1000052774" src="https://github.com/user-attachments/assets/e313ec80-ac2a-4bde-be35-533f8a441485" />

Le terminal affiche « Project successfully built », puis installe l’APK sur `R3CX20FAHRB` et synchronise `org.nativescript.B300159195`. C’est la preuve de la compilation et de l’exécution sur un vrai appareil.

### 19. État initial de l’application

<img width="709" height="1536" alt="19-01-1000052716" src="https://github.com/user-attachments/assets/33826932-79bf-4d3c-9572-32d559bc90af" />

L’application NativeScript créée avec le modèle Angular affiche la liste initiale « Computer Scientists » : Alan Turing, Grace Hopper, etc. Cette capture sert de référence avant notre modification.

### 20. Fichier contenant les données affichées

<img width="1536" height="1152" alt="20-01-image-1790265708043" src="https://github.com/user-attachments/assets/d779ea5b-80ff-45bd-bb1a-e6a9e23f2726" />

Dans VS Code, le fichier `src/app/people/person.service.ts` contient `items = signal<Person[]>(...)`, la liste des objets `Person`, ainsi que `getPerson(id)`. Les champs sont `id`, `name`, `nationality` et `notableAchievements`. La vue de l’application affiche les valeurs de `name`.

### 21. Première modification : noms en caractères arabes

<img width="709" height="1536" alt="21-01-1000052731" src="https://github.com/user-attachments/assets/9599150e-1da3-4619-888f-31e53a2fc2f6" />

Les quinze personnes de la liste sont remplacées par des personnes et lieux africains ; les métiers sont renseignés dans `notableAchievements`. La première version utilise l’écriture arabe pour plusieurs noms. Le modèle garde le titre « Computer Scientists ».

### 22. Correction de l’écriture des noms

<img width="709" height="1536" alt="22-01-1000052733" src="https://github.com/user-attachments/assets/e807af2d-7a94-45fd-a6a4-309261ddaf4e" />

Les noms sont ensuite écrits en caractères latins selon l’usage français, comme **Islem Touadjni**, **Amina Ben Salah** et **Youssef El Mansouri**. Les quinze entrées restent dans `person.service.ts`. L’enregistrement dans VS Code déclenche la synchronisation du projet déjà lancé : les changements apparaissent sur le téléphone sans ressaisir une commande à chaque modification. Il faut faire défiler la liste pour voir les personnes qui ne tiennent pas sur un seul écran.

### 23. Préparation du dépôt GitHub

<img width="1152" height="1536" alt="23-01-image-1790270259663" src="https://github.com/user-attachments/assets/293db900-86ad-43d1-8e32-446a2ffd35db" />

Dans `2.NativeScript`, la fonction **Add file → Create new file** permet de créer le dossier `B300159195` en saisissant `B300159195/README.md` comme chemin du nouveau fichier. Les captures doivent être placées sous `B300159195/captures/` pour que les liens relatifs de ce document fonctionnent sur GitHub.

### 24. Vérification du rendu publié

<img width="1152" height="1536" alt="24-01-image-1790270743739" src="https://github.com/user-attachments/assets/d82f1a9a-8fc4-45f3-9ec1-f0db5b752496" />

Le navigateur affiche le dossier personnel `2.NativeScript/B300159195` et la capture de l’application modifiée. Après dépôt du présent README et du dossier `captures`, vérifier que chaque photo s’affiche juste avant le paragraphe qui l’explique.

## Bilan des commandes utilisées

Les commandes `ns create B300159195` et `cd B300159195` ont été exécutées dans le terminal Windows (cmd dans les captures). Les commandes `ns doctor`, `ns run android`, `java -version`, `Test-Path` et `adb devices` ont également été utilisées durant le diagnostic et les essais ; la syntaxe avec `$env:` et `&` est propre à PowerShell. `npm install -g nativescript` installe la CLI. Les lignes « ns run ios », « ns debug android » et les commandes Ruby visibles sur la documentation d’autres étudiants ne sont pas des commandes exécutées pour ce projet Android.

## Résultat final

L’application est compilée et installée sur le téléphone Samsung. La liste initiale de scientifiques a été remplacée par quinze personnes aux noms transcrits en caractères latins. Les valeurs de pays et de profession sont dans le service ; l’écran de liste présente principalement les noms. Le titre « Computer Scientists » provient toujours du modèle initial.

## Conclusion

Ce travail a permis de créer un projet NativeScript Angular, de configurer les outils Android sur Windows, de contourner l’impossibilité d’utiliser l’émulateur en testant sur un téléphone réel, puis de résoudre une incompatibilité Java grâce au JDK 21. Après modification de `person.service.ts` et enregistrement dans VS Code, la nouvelle liste est apparue sur le téléphone. La compilation, l’installation sur l’appareil et la capture du résultat constituent les preuves de l’exécution réussie.
