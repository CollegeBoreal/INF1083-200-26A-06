
# 🚀 Travail 6 — Animations NativeScript

### INF1083 — Développement d'applications

**Étudiant :** 300151722  
**Projet :** b300151722  
**Technologies :** NativeScript, Angular, TypeScript, SCSS  
**Plateforme de test :** Android Emulator

---

## 📱 Présentation du projet

Ce travail consiste à développer une application mobile avec **NativeScript Angular** afin de découvrir deux techniques d'animation :

- **Animation déclarative (CSS)** : réalisée avec des règles SCSS.
- **Animation impérative (TypeScript)** : réalisée à l'aide de la méthode `animate()`.

L'application utilise un menu latéral pour naviguer entre les différentes pages.

## 🎨 1. Animation déclarative — Home

La page **Home** présente un bouton `{N}` qui change progressivement de couleur, du rouge au vert, pendant deux secondes.

Cette animation est définie dans `home.component.scss` à l'aide de `@keyframes`.

```scss
@keyframes bgAnimation {
    from {
        background-color: red;
    }
    to {
        background-color: green;
    }
}

.background {
    animation-name: bgAnimation;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}
```

<img width="525" height="897" alt="1" src="https://github.com/user-attachments/assets/a7e34c1c-d88b-4728-bde9-ef76b8789577" />

## 🧭 2. Navigation — Drawer

L'application utilise le modèle **Drawer Navigation** de NativeScript.

Le menu latéral permet d'accéder aux pages suivantes :

- Home
- Browse
- Search
- Featured
- Settings

Les animations demandées dans ce travail se trouvent dans **Home** et **Browse**.

### 📸 Résultat — Menu latéral

<img width="431" height="885" alt="2" src="https://github.com/user-attachments/assets/fb68576b-b52e-464c-9c49-8450d407a0d6" />

## 🚀 3. Animation impérative — Browse

La page **Browse** présente une fusée 🚀 dans un carré bleu.

En cliquant sur **Animate**, une série d'animations est exécutée avec TypeScript :

1. Disparition de la fusée.
2. Réapparition de la fusée.
3. Déplacement vers une nouvelle position.
4. Retour à la position initiale.
5. Agrandissement puis réduction.
6. Rotation à 180° puis retour à 0°.

Les animations sont exécutées successivement grâce à la méthode `view.animate()` et aux promesses JavaScript.

### 📸 Résultat — Animation TypeScript

<img width="434" height="875" alt="3" src="https://github.com/user-attachments/assets/7090e663-f924-448a-8b69-3d84819ad2bf" />


## 🛠️ 4. Structure du projet

```text
6.Animations/
└── 300151722/
    ├── b300151722/
    │   ├── src/
    │   │   ├── app/
    │   │   │   ├── home/
    │   │   │   │   ├── home.component.html
    │   │   │   │   ├── home.component.scss
    │   │   │   │   └── home.component.ts
    │   │   │   └── browse/
    │   │   │       ├── browse.component.html
    │   │   │       └── browse.component.ts
    │   │   └── main.ts
    │   └── package.json
    ├── images/
    │   ├── 1.png
    │   ├── 2.png
    │   └── 3.png
    └── README.md
```

## ▶️ 5. Exécution de l'application

Pour démarrer l'application avec un émulateur Android :

```powershell
cd b300151722
ns run android
```

## ✅ 6. Résultats et conclusion

Les deux types d'animations ont été réalisés et testés avec succès sur un émulateur Android.

Ce travail m'a permis de comprendre comment utiliser les animations CSS et TypeScript dans une application NativeScript Angular, ainsi que la navigation entre les pages avec un menu latéral.

---

**Travail réalisé dans le cadre du cours INF1083 — Développement d'applications.**
