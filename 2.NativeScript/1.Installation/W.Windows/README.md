# 📱 Installation de NativeScript

## 🎯 Objectif

À la fin de ce laboratoire, vous serez capable de :

- Installer Node.js
- Installer la CLI NativeScript
- Vérifier votre environnement de développement
- Créer votre première application NativeScript
- Exécuter une application Android

---

# 📋 Prérequis

## Windows

- Windows 10 ou Windows 11
- Chocolatey
- Node.js (version LTS)
- Android Studio
- Android SDK
- Android Emulator ou téléphone Android

## macOS

- macOS récent
- Homebrew
- Node.js (version LTS)
- Android Studio
- Android SDK
- Xcode (pour le développement iOS)
- Simulateur iPhone ou appareil iOS

---

# 🪟 Installation sous Windows

## Étape 1 – Installer Chocolatey

Ouvrir PowerShell en tant qu'administrateur.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
```

```powershell
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
```

```powershell
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Vérifier l'installation :

```powershell
choco --version
```

---

## Étape 2 – Installer Node.js

```powershell
choco install nodejs-lts -y
```

Vérification :

```powershell
node --version
```

```powershell
npm --version
```

---

## Étape 3 – Installer NativeScript

```powershell
npm install -g nativescript
```

Vérification :

```powershell
ns --version
```

ou

```powershell
ns doctor
```

---

# 🍎 Installation sous macOS

## Étape 1 – Installer Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Vérification :

```bash
brew --version
```

---

## Étape 2 – Installer Node.js

```bash
brew install node
```

Vérification :

```bash
node --version
```

```bash
npm --version
```

---

## Étape 3 – Installer NativeScript

```bash
npm install -g nativescript
```

Vérification :

```bash
ns --version
```

ou

```bash
ns doctor
```

---

# 🤖 Installation d'Android Studio

Télécharger Android Studio :

https://developer.android.com/studio

Lors de l'installation, s'assurer que les composants suivants sont installés :

✅ Android SDK

✅ Android SDK Platform Tools

✅ Android Emulator

✅ Android Virtual Device (AVD)

---

## Vérifier ADB

```bash
adb devices
```

---

# 📱 Téléphone Android réel (optionnel)

Activer le mode développeur :

```text
Paramètres
→ À propos du téléphone
→ Numéro de build (7 clics)
```

Puis :

```text
Options pour les développeurs
→ Débogage USB
```

Connecter ensuite l'appareil via USB.

---

# 🍏 Développement iOS (macOS uniquement)

## Installer Xcode

Installer Xcode depuis l'App Store.

Vérifier l'installation :

```bash
xcodebuild -version
```

---

## Ouvrir le simulateur iPhone

```bash
open -a Simulator
```

