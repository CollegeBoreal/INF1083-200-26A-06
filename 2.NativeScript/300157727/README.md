La première étape montre l'installation globale du package nativescript via Node.js (npm install -g nativescript). Le texte rouge correspond à un avertissement standard de PowerShell concernant l'exécution de scripts d'installation (npm warn install-scripts).
<img width="699" height="645" alt="Capture d&#39;écran 2026-10-03 010223" src="https://github.com/user-attachments/assets/7c38659f-0aff-4240-a813-530a6e3c5205" />
La commande adb devices confirme que l'émulateur Android (emulator-5554) est en cours d'exécution et bien détecté par le système.
<img width="711" height="220" alt="Capture d&#39;écran 2026-10-03 013417" src="https://github.com/user-attachments/assets/70a39ca9-ccc1-4b6e-8432-3e3e1d92d2e7" />
L'outil ns doctor android vérifie les prérequis du projet. Le bloc de texte rouge signale un avertissement de dépréciation Node.js (DeprecationWarning), mais le diagnostic confirme que toutes les dépendances (Android SDK, JDK, adb) sont parfaitement configurées (No issues were detected)
<img width="716" height="625" alt="Capture d&#39;écran 2026-10-03 021249" src="https://github.com/user-attachments/assets/64048d03-de1d-44b2-bac4-c0427e5e2a5f" />
L'ouverture du projet MONPREMIERAPP dans Visual Studio Code avec la suggestion d'installer l'extension officielle NativeScript.
<img width="1077" height="480" alt="Capture d&#39;écran 2026-10-03 022220" src="https://github.com/user-attachments/assets/a5a48795-3af7-4b47-a467-c01fbfda1284" />
<img width="1361" height="702" alt="Capture d&#39;écran 2026-10-03 022238" src="https://github.com/user-attachments/assets/f77c5022-6b15-42e7-b147-a9a0d93549f8" />
L'application est compilée et lancée (ns run android). L'émulateur Android affiche l'interface utilisateur (une liste de pionniers de l'informatique) correspondant directement au code XML (main-page.xml) ouvert dans l'éditeur.
<img width="1039" height="667" alt="Capture d&#39;écran 2026-10-03 023441" src="https://github.com/user-attachments/assets/33b1c1e2-bd32-4a84-b6e0-47cf34ab7e42" />
Personnalisation de l'application avec les personnalités algériennes
<img width="424" height="689" alt="Capture d&#39;écran 2026-11-26 103924" src="https://github.com/user-attachments/assets/5f91c573-691a-47c6-9241-923f3f4d38bf" />
Description : Cette capture montre la liste des 15 personnalités algériennes affichées dans l'application NativeScript sur l'émulateur Android.
<img width="396" height="694" alt="Capture d&#39;écran 2026-11-26 104627" src="https://github.com/user-attachments/assets/b07f75ed-f196-4654-bb31-bfd16c922712" />
Cette capture montre la fiche d'une personnalité après avoir sélectionné son nom. Elle présente sa nationalité, sa date de naissance, sa profession et quelques informations biographiques.







