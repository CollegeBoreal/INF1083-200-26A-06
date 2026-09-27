# 300160006

### Description du projet NativeScript

Dans le cadre du travail pratique en INF1083, j’ai créé une application mobile avec NativeScript et Angular à partir de mon identifiant étudiant `300160006`. Le projet a été créé avec le modèle **Hello World** et se trouve dans le dossier `B300160006`.

![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/138f3799df3b6358983c5c83c2a2c96e39c079c6/2.NativeScript/300160006/images/Screenshot%202026-09-27%20112941.png)

### 1. Création et lancement du projet

J’ai créé le projet avec NativeScript en choisissant Angular et le modèle Hello World. J’ai ensuite essayé de lancer l’application sur iOS et Android.

Le lancement sur iOS n’a pas fonctionné parce que je travaille sur Windows. La compilation locale d’une application iOS nécessite macOS et Xcode. J’ai donc choisi de continuer avec Android.

![images alt](


### 2. Configuration d’Android

Le premier lancement avec Android a présenté plusieurs erreurs. Le **JDK Java**, le **Android SDK**, les **Build Tools**, `adb` et certaines variables d’environnement comme `ANDROID_HOME` n’étaient pas configurés.

J’ai installé **Java JDK 17**, puis les **Android Command-Line Tools**, le **Android SDK Platform 36**, les **Build Tools**, les **Platform Tools** et `adb`. J’ai ensuite configuré les variables `JAVA_HOME` et `ANDROID_HOME`.

![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/3fe06841063c46cba4b434dad249f05cbb5b7857/2.NativeScript/300160006/images/Screenshot%202026-09-24%20120223.png)


### 3. Création et configuration de l’émulateur

J’ai installé l’émulateur Android ainsi qu’une image système Android 36 et créé un appareil virtuel appelé **Pixel_Android_36**.

Lors du premier démarrage, l’émulateur ne fonctionnait pas parce que l’accélération matérielle n’était pas disponible. J’ai installé le **Android Emulator Hypervisor Driver**, puis redémarré l’ordinateur.

Après le redémarrage, l’émulateur fonctionnait correctement. Avec la commande `adb devices`, j’ai vérifié qu’il était bien reconnu :

```text
emulator-5554    device
```

![images alt](


### 4. Lancement de l'application

Une fois l'environnement Android configuré, je me suis placée dans le dossier du projet et j’ai utilisé :

```powershell
ns run android
```

L’application s’est finalement affichée correctement dans l’émulateur Android.

![images alt](


### 5. Personnalisation de l'application

L'application affichait au départ une liste de **Computer Scientists**. J’ai recherché les fichiers responsables de l'affichage et j’ai trouvé le titre dans `person.component.html`.

J’ai remplacé :

```html
<ActionBar title="Computer Scientists" iosLargeTitle="true">
```

par :

```html
<ActionBar title="Personnalités sénégalaises" iosLargeTitle="true">
```

Les noms des personnes étaient enregistrés dans le service `PersonService`. J’ai donc remplacé la liste originale des informaticiens par des **personnalités sénégalaises**, avec **Ousmane Sonko en première position**.

Chaque personnalité possède un nom, une nationalité et quelques réalisations ou informations importantes.

### 6. Problèmes rencontrés après le redémarrage

Après avoir redémarré l’ordinateur, l’émulateur était fermé. J’ai dû le redémarrer et vérifier à nouveau sa connexion avec `adb devices` avant de relancer l’application.

J’ai également eu quelques difficultés avec les boutons de navigation de l’émulateur, notamment pour revenir à l’écran d’accueil et fermer l’émulateur.

![images alt](


### Conclusion

La principale difficulté du projet a été la configuration de l'environnement Android sur Windows. Il a fallu installer et configurer plusieurs outils avant de pouvoir exécuter l'application.

Une fois la configuration terminée, j’ai réussi à lancer l’application NativeScript sur Android et à la personnaliser en remplaçant les informaticiens par des personnalités sénégalaises.
