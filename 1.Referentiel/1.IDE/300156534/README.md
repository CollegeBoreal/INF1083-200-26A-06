1. Objectif du travail

L’objectif de cette activité était de prendre en main Git et GitHub, de créer un répertoire personnel dans le référentiel du cours INF1083, de créer un fichier README.md, de réaliser un commit et de configurer une clé SSH afin de pouvoir envoyer le travail vers GitHub.

2. Environnement utilisé

Système : Windows avec Windows PowerShell

Git : version 2.52.0.windows.1

Référentiel : INF1083-200-26A-06

Répertoire personnel : B300159887

Compte GitHub utilisé pour l’authentification SSH : salhiwalid540-hue

3. Déroulement du travail

3.1 Vérification de Git et accès au référentiel

Git a été vérifié avec la commande « git --version ». Le dossier Developer existait déjà. Le référentiel du cours existait également déjà sur l’ordinateur; il a donc été ouvert directement, puis le dossier 1.Referentiel/1.IDE a été atteint.

Capture d’écran – étape correspondante



3.2 Création du répertoire étudiant

Un premier dossier nommé TON_ID a été créé par erreur. Il a ensuite été supprimé et remplacé par le bon identifiant B300159887. Le dossier a été ouvert et son emplacement a été vérifié avec pwd.

Capture d’écran – étape correspondante



3.3 Création du fichier README.md

Dans le répertoire B300159887, le fichier README.md a été créé avec le Bloc-notes. La présence du fichier a ensuite été vérifiée avec Get-ChildItem.

Capture d’écran – étape correspondante



3.4 Ajout du travail et vérification

Le dossier B300159887 a été ajouté à l’index Git avec git add. La commande git status a confirmé que B300159887/README.md était prêt à être validé.

Capture d’écran – étape correspondante



3.5 Mise à jour du référentiel

La commande git pull --no-edit a permis de mettre à jour le référentiel local avec les changements présents sur le serveur.

Capture d’écran – étape correspondante



3.6 Création et configuration de la clé SSH

Une clé SSH ED25519 a été générée. Comme une ancienne clé ma_cle.pk existait déjà, les nouvelles clés ont été renommées ma_cle_INF1083.pk et ma_cle_INF1083.pub afin de ne pas écraser les anciennes clés.

Capture d’écran – étape correspondante



3.7 Authentification auprès de GitHub

La clé publique a été ajoutée au compte GitHub. Après une première tentative refusée, le test ssh -T git@github.com a finalement confirmé l’authentification avec succès.

Capture d’écran – étape correspondante



3.8 Configuration du dépôt et envoi du travail

L’URL distante a été configurée en SSH avec git remote set-url. La commande git remote --verbose a confirmé que fetch et push utilisent git@github.com. Le git push final a réussi et le travail a été envoyé sur la branche main.

Capture d’écran – étape correspondante




INF1083 – Git, GitHub et SSH | B300159887

4. Captures d’écran complètes

Les captures suivantes montrent les principales étapes réalisées pendant le laboratoire.

Capture 1

<img width="684" height="725" alt="Screenshot 01 2026-10-07 190518" src="https://github.com/user-attachments/assets/53857d86-dcd6-49b8-992d-b5a0e18fcfe6" />



INF1083 – Git, GitHub et SSH | B300159887

Capture 2
<img width="681" height="729" alt="Screenshot 2 2026-10-07 190641" src="https://github.com/user-attachments/assets/08f17d8b-fcaa-475f-9c36-301568c28e5f" />




INF1083 – Git, GitHub et SSH | B300159887

Capture 3
<img width="683" height="724" alt="Screenshot 4 2026-10-07 191125" src="https://github.com/user-attachments/assets/d45cdf5e-d071-42b3-8296-4883ec690348" />
<img width="679" height="713" alt="Screenshot 3 2026-10-07 190851" src="https://github.com/user-attachments/assets/4ad6ba32-5deb-4ba5-921b-ba3af704465c" />




INF1083 – Git, GitHub et SSH | B300159887

Capture 4
<img width="683" height="724" alt="Screenshot 4 2026-10-07 191125" src="https://github.com/user-attachments/assets/1837f898-cc6f-4b9c-9b94-e4b73c2c89ce" />




INF1083 – Git, GitHub et SSH | B300159887

Capture 5
<img width="682" height="723" alt="Screenshot 5 2026-10-07 191358" src="https://github.com/user-attachments/assets/396b24e7-0856-44d2-87a6-7bfc641c9db6" />




INF1083 – Git, GitHub et SSH | B300159887

Capture 6
<img width="682" height="724" alt="Screenshot 6 2026-10-07 191856" src="https://github.com/user-attachments/assets/7120ae63-40f6-48c8-bb35-c263e63ecd44" />




INF1083 – Git, GitHub et SSH | B300159887

Capture 7
<img width="679" height="715" alt="Screenshot 7 2026-10-07 192913" src="https://github.com/user-attachments/assets/9db80bd5-6360-4b58-87c0-55b57f15c2ba" />




INF1083 – Git, GitHub et SSH | B300159887

Capture 8
<img width="681" height="719" alt="Screenshot 8 2026-10-07 193210" src="https://github.com/user-attachments/assets/d3649148-022b-49d2-a1ae-6c5e257095bb" />




INF1083 – Git, GitHub et SSH | B300159887

5. Conclusion

L’activité a permis de réaliser les principales opérations demandées avec Git et GitHub : création du répertoire personnel, création et validation du README.md, mise à jour du dépôt, configuration d’une clé SSH, authentification auprès de GitHub et envoi du travail avec git push. Le test SSH a confirmé que l’authentification fonctionnait et le push final a été effectué avec succès.
