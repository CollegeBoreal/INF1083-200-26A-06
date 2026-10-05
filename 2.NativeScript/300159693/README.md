**Première application NativeScript**
**Nom :** Mekaouche Mazigh  
**Numéro étudiant :** 300159693  
**Projet :** B300159693
1-Création du projet
La création du projet NativeScript se termine avec succès. Le projet est nommé B300159693.
<img width="923" height="411" alt="Capture d&#39;écran 2026-10-01 114953" src="https://github.com/user-attachments/assets/ef1828d8-0d1c-471c-88f3-ab6ad04926c5" />
  2 -Vérification de la structure du projet
  La commande Get-ChildItem affiche les dossiers et fichiers du projet, notamment src, App_Resources, hooks, node_modules et package.json.
<img width="902" height="467" alt="Capture d&#39;écran 2026-10-01 115101" src="https://github.com/user-attachments/assets/12a05d09-2f4b-4f66-9006-51412e811c70" />
3 – Installation et versions des outils
La capture présente les versions de Node.js et npm ainsi que l’installation de NativeScript. Un avertissement npm sur les scripts d’installation est visible.
<img width="959" height="470" alt="Capture d&#39;écran 2026-10-01 115215" src="https://github.com/user-attachments/assets/017157ca-c8e8-4d18-ba07-b6f859c765c2" />
4 – Diagnostic de l’environnement
La commande ns doctor vérifie Android_HOME, ADB, le SDK Android et Java/JDK. Le diagnostic indique qu’aucun problème n’a été détecté dans les vérifications affichées.
<img width="464" height="443" alt="Capture d&#39;écran 2026-10-01 131419" src="https://github.com/user-attachments/assets/9d23cb5f-970f-41a1-8228-b62505dacd68" />
5 – Détection de l’émulateur et lancement
La commande adb devices détecte emulator-5554. Ensuite, ns run android prépare le projet et démarre la compilation.
<img width="458" height="458" alt="Capture d&#39;écran 2026-10-01 131519" src="https://github.com/user-attachments/assets/cc805e86-32d5-47e6-b3d9-28afb3929db7" />
6 – Installation des composants Android
Gradle installe Android SDK Build-Tools 35.0.1. La progression montre que la préparation des composants Android est en cours.
<img width="470" height="474" alt="Capture d&#39;écran 2026-10-01 134433" src="https://github.com/user-attachments/assets/d831a7dd-63ca-4d5b-94a0-4286a25120c4" />
7 – Préparation et compilation Android
Le projet est indiqué comme préparé avec succès pour Android. La compilation Gradle se poursuit avec la configuration personnalisée.
<img width="460" height="483" alt="Capture d&#39;écran 2026-10-01 135135" src="https://github.com/user-attachments/assets/4d79d8a7-0c44-4895-8e58-3e38e5a2923c" />
8 – Compilation et installation réussies
Le message Project successfully built confirme la compilation. Le fichier APK est généré, puis installé et synchronisé sur emulator-5554.
<img width="464" height="470" alt="Capture d&#39;écran 2026-10-01 135308" src="https://github.com/user-attachments/assets/79584452-7d50-4223-b86f-56941519ad50" /
9 – Affichage de l’émulateur Android et vérification de l’installation
Cette capture montre l’écran d’accueil de l’émulateur Android Pixel_10. On voit l’icône NativeScript en bas à droite de l’écran, ce qui confirme que l’application a été installée sur le téléphone virtuel. L’émulateur est prêt pour tester l’application.
<img width="341" height="517" alt="Capture d&#39;écran 2026-10-01 140022" src="https://github.com/user-attachments/assets/1042407b-2d49-4c74-8d60-f1007199a7a0" />
10-Test de lancement de l’application et vérification de l’émulateur Android
Cette capture montre l’utilisation de la commande adb shell monkey -p org.nativescript.B300159693 1 pour envoyer un événement de lancement à l’application NativeScript. Ensuite, la commande emulator -avd Pixel_10 permet de démarrer l’émulateur Android Pixel_10. Les informations affichées dans le terminal confirment le démarrage de l’environnement virtuel Android
<img width="959" height="476" alt="Capture d&#39;écran 2026-10-03 185152" src="https://github.com/user-attachments/assets/778ae309-1233-4447-9d25-9f14558eb65c" />


