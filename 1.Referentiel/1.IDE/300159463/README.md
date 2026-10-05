1. Présentation du Travail
Ce rapport présente les différentes étapes réalisées pour la mise en place de l&#39;environnement de
développement, la création de la structure de répertoires personnelle sous mon id 300159463, la
gestion du suivi de version avec Git ainsi que la résolution des conflits de synchronisation (rebase/push)
avec le dépôt GitHub du cours.


2. Étapes d&#39;Exécution 


Étape 1 : Exploration et navigation dans l&#39;arborescence du projet
Navigation initiale dans le projet cloné INF1083-200-26A-06. Inspection des répertoires du cours (.github,
.scripts, 0.PlanDeCours, 1.Referentiel, 2.NativeScript) avec la commande PowerShell `dir`.

<img width="1117" height="621" alt="1a" src="https://github.com/user-attachments/assets/7b5426a0-2054-49e6-a8dc-beeacca51c5c" />



Étape 2 : Création du répertoire personnel et inspection des répertoires
Navigation dans `1.Referentiel\1.IDE` et création du répertoire personnel `B300159463` avec la commande
`mkdir`. Visualisation de la liste des répertoires étudiants existants.




<img width="1108" height="615" alt="2b" src="https://github.com/user-attachments/assets/6d0e4dd6-17ae-4be5-a037-5e20a0a1fcf3" />



Étape 3 : Édition du fichier README.md et gestion des outils
Tentative d&#39;utilisation de `nano` suivie de l&#39;utilisation de `notepad` pour éditer le fichier `README.md`.
Vérification de l&#39;état Git (`git status`) montrant les fichiers suivis et non suivis.


<img width="1108" height="620" alt="5e" src="https://github.com/user-attachments/assets/ba085825-ad02-4fe7-a2e5-1e5cb4c0e382" />
<img width="1108" height="625" alt="3c" src="https://github.com/user-attachments/assets/c7ac9d54-38a7-445e-bc35-aacc0d72cb03" />




Étape 4 : Vérification de l&#39;indexation Git et copie des fichiers
Contrôle des fichiers indexés via `git ls-files`, lecture du contenu de `README.md` avec `Get-Content`, et
synchronisation des dossiers de travail sous l&#39;identifiant 300159463.




Étape 5 : Synchronisation finale, résolution de rejet et Push sur GitHub
Résolution de l&#39;erreur de rejet au premier `git push` grâce à `git pull --rebase origin main`, puis publication
réussie des commits vers le dépôt distant GitHub.



<img width="1108" height="620" alt="5e" src="https://github.com/user-attachments/assets/e97a2d11-33fc-4e09-859d-405413f817cb" />



3. Conclusion
L&#39;ensemble des objectifs du TP a été atteint avec succès. Le répertoire personnel 300159463 est
correctement configuré, le fichier README.md est renseigné et toutes les modifications ont été
envoyées sur le dépôt distant Collège Boréal.

<img width="1363" height="580" alt="Capture d’écran 2026-10-05 101503" src="https://github.com/user-attachments/assets/225cf032-4d6a-4552-8165-54e2417eb9f2" />
