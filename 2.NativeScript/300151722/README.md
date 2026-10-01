# Première application NativeScript

**Nom :** Oustani Islam  
**Numéro étudiant :** B300151722  
**Projet :** B300151722  
**Plateforme utilisée :** Windows / Android  

---

## 1. Création du dossier de travail

J'ai commencé par créer mon dossier étudiant dans le répertoire `Documents`.

J'ai créé le dossier `B300151722`, le fichier `README.md` ainsi que le dossier `images`.

powershell
cd $HOME\Documents
mkdir B300151722
cd B300151722
New-Item README.md -ItemType File
mkdir images

J'ai ensuite vérifié la structure avec :

<img width="943" height="471" alt="1" src="https://github.com/user-attachments/assets/7efa9639-b201-46d4-9faf-8fa085e9b637" />


## 2. Installation de NativeScript 
Avant de créer le projet, j'ai installé les outils nécessaires
Installation de Node.js et Installation de NativeScript

<img width="795" height="397" alt="2" src="https://github.com/user-attachments/assets/c8b51ac4-a71e-40a3-ba27-9596ce15add7" />


## 3. Création du projet NativeScript

Après l'installation de NativeScript, j'ai créé mon projet avec la commande suivante :

```powershell
ns create B300151722
```

J'ai choisi **Plain TypeScript** et **Hello World** pour créer l'application.

---

## 4. Configuration Android

Pour pouvoir exécuter l'application sur Android, j'ai installé Java JDK et Android Studio.

```powershell
choco install -y temurin21
choco install androidstudio -y
```

J'ai ensuite installé le SDK Android et créé un émulateur **Pixel 7a avec Android 16 / API 36**.

Pour vérifier que la configuration Android était correcte, j'ai utilisé :

```powershell
ns doctor android
```

Après la configuration, NativeScript a affiché :

```text
No issues were detected
```

---

## 5. Exécution de l'application

Après avoir démarré l'émulateur Android, j'ai lancé mon application avec la commande :

```powershell
ns run android
```

Le projet a été compilé et installé correctement sur l'émulateur.

```text
Project successfully built.
Successfully installed on device with identifier 'emulator-5554'.
Successfully synced application org.nativescript.B300151722
```

---

## 6. Génération de l'APK

J'ai également généré le fichier APK de l'application avec la commande :

```powershell
ns build android
```

Le fichier APK généré est :

```text
app-debug.apk
```

---

## Résultat final

L'application NativeScript fonctionne correctement sur l'émulateur Android.

<img width="1535" height="1065" alt="4" src="https://github.com/user-attachments/assets/9b0c327a-f041-4e33-94bb-7f2f84d7b324" />

