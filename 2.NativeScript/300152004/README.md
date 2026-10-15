# Créer ma première application NativeScript
# 300152004

Étape 1 – Vérifier Node.js / npm
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/2.NativeScript/300152004/images/01-erreur-installation-cli.png?raw=true" />
On vérifie les versions installées (`node -v` → v26.10.0, `npm -v` → 11.19.1), puis on tente d'installer la CLI avec :
npm install -g @nativescript/cli

Étape 2 – Installation correcte de NativeScript
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/2.NativeScript/300152004/images/02-installation-nativescript.png?raw=true" />

npm install -g nativescript
ns --version

Étape 3 – Préparer le répertoire de travail et lancer `ns create`
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/2.NativeScript/300152004/images/03-ns-create-statistiques.png?raw=true" />

Le dépôt du cours `INF1083-200-26A-06` est cloné dans `C:\Users\hp\Developer`. On s'y déplace, on liste le contenu, puis on entre dans le dossier `2.NativeScript` :
cd .\INF1083-200-26A-06\
ls
cd .\2.NativeScript\
ns create B300152004

Étape 4 – Assistant de création du projet
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/2.NativeScript/300152004/images/04-assistant-creation.png?raw=true" />

Après avoir répondu yes, l'assistant « Let's create a NativeScript app! » démarre. Il pose deux questions :
1. Le style de projet → Angular
2. Le modèle de départ → Hello World

Étape 5 – Projet créé et premier `ns run android`
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/2.NativeScript/300152004/images/05-projet-cree-ns-run-android.png?raw=true" />

Message de succès : `Project B300152004 was successfully created.` La CLI propose les commandes `ns run ios|android` et `ns debug ios|android`.
On se déplace dans le projet puis on lance sur Android :
cd B300152004
ns run android

Étape 6 – Compilation avec webpack
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/2.NativeScript/300152004/images/06-compilation-webpack.png?raw=true" />

on relance depuis le dossier du projet :
cd .\Developer\INF1083-200-26A-06\2.NativeScript\B300152004\
ns run android

Étape 7 – Application déployée sur l'émulateur
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/2.NativeScript/300152004/images/07-app-sur-emulateur.png?raw=true" />

Webpack termine avec `compiled successfully`. Les fichiers sont transférés sur l'appareil `emulator-5554` et l'application `org.nativescript.B300152004` est synchronisée. Le mode hot reload (HMR) est actif : `Angular is running in development mode`.

Étape 8 – Résultat : liste « Computer Scientists »
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/2.NativeScript/300152004/images/08-resultat-computer-scientists.png?raw=true" />

Dans VS Code, le fichier `person.service.ts` définit un `signal<Person[]>` contenant la liste des personnes (id, name, nationality, notableAchievements…). L'application affichée sur l'émulateur présente cette liste sous le titre Computer Scientists (Gianluigi Donnarumma, Achraf Hakimi, Marquinhos, etc.).
