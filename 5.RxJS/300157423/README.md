# Laboratoire RxJS — Drapeaux du monde

**Étudiant :** Gaya Mahroug  
**Matricule :** 300157423  
**Cours :** INF1083  
**Projet :** RxJS

## 1. Objectif

L’objectif de ce laboratoire est d’utiliser HttpClient et RxJS
dans une application NativeScript Angular pour rechercher un pays
et afficher son drapeau en couleurs.

## 2. Création du projet

J’ai créé un projet NativeScript Angular avec une navigation
par onglets.

```powershell
ns create b300157423 --template @nativescript/template-tab-navigation-ng
3. Modèle de données
J’ai créé le modèle Country avec trois propriétés.
- code représente le code du pays.
- name représente le nom du pays.
- flag contient l’adresse de l’image du drapeau.
Capture 1 — Modèle et exécution
<img width="267" height="445" alt="Capture d’écran 2026-11-05 131645" src="https://github.com/user-attachments/assets/c0c52d65-f172-483d-b03c-64684a0808c0" />

4. Récupération des données avec RxJS
J’ai créé le service ApicallService pour récupérer les données
de FlagCDN avec HttpClient.

Le service retourne un Observable contenant une liste de pays.
L’opérateur map transforme les données reçues pour obtenir
le code, le nom et l’adresse du drapeau.
5. Recherche d’un pays
J’ai utilisé ngModel pour récupérer le nom saisi dans le champ.

Lorsque j’appuie sur Rechercher, l’application filtre la liste.
Les résultats sont affichés avec ListView et les drapeaux
sont affichés avec le composant Image.
Capture 2 — Recherche de Madagascar
<img width="959" height="540" alt="Capture d’écran 2026-11-05 131734" src="https://github.com/user-attachments/assets/cf63e83e-e404-4f07-baab-ff733fb7c71e" />

6. Commandes PowerShell
J’ai utilisé PowerShell pour créer des fichiers et adapter
les composants pendant le développement.

Cette capture montre une étape intermédiaire du travail,
avec l’ancien exemple des capitales et les commandes de copie.
Capture 3 — Commandes utilisées
<img width="960" height="540" alt="Capture d’écran 2026-11-05 131814" src="https://github.com/user-attachments/assets/6e7c1524-8eaf-4a9d-afd6-f117e36bc10a" />

7. Exécution de l’application
Dans le dossier b300157423, j’ai lancé cette commande.
ns run android

L’application a été exécutée dans l’émulateur Android.
La recherche de Madagascar affiche son nom et son drapeau.
8. Résultat
Ce laboratoire m’a permis de pratiquer HttpClient, les observables
RxJS et l’opérateur map. J’ai aussi appris à rechercher un pays
et à afficher son drapeau en couleurs dans NativeScript.
9. Sources
- https://flagcdn.com/
- https://flagpedia.net/download/api

🔴 **Dans le dossier `images`, utilise exactement ces noms** — `execution-application.png`, `drapeau-madagascar.png` et `commandes-powershell.png`.










Convertir en PDF
