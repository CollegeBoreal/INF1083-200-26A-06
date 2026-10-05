<<<<<<< HEAD
\# INF1083 - IDE et SSH
Nom : Mekaouche Mazigh
Identifiant étudiant : 300159693
\## Objectif
Installation et configuration de Git, GitHub, SSH et Visual Studio Code.s
=======
>>>>>>> 0bb3b05054539b47389d285afaf6d52eb18fc49c
Cette capture montre la configuration de Git (nom et adresse e-mail), la création du premier commit et la vérification de l'état du dépôt. Le commit est enregistré localement sur la branche main et il reste à effectuer un git push pour envoyer les modifications sur GitHub.
<img width="892" height="218" alt="Capture d&#39;écran 2026-10-01 100945" src="https://github.com/user-attachments/assets/b3d39930-bef2-4f08-a19e-4fba154750bc" />
Cette capture montre le renommage des clés SSH en ma_cle.pk et ma_cle.pub, puis la vérification du dossier .ssh pour confirmer que les deux clés ont bien été créées et enregistrées.
<img width="834" height="251" alt="Capture d&#39;écran 2026-10-01 101418" src="https://github.com/user-attachments/assets/d707f48a-6b59-4dbd-8f5c-54c553ca1f77" />
Cette capture montre la création et la configuration du fichier SSH pour GitHub, suivie d'un test de connexion avec la commande ssh -T git@github.com. Le message confirme que l'authentification SSH avec GitHub a réussi.
<img width="946" height="470" alt="Capture d&#39;écran 2026-10-01 101545" src="https://github.com/user-attachments/assets/b9c62f6a-1252-4b3f-822e-0099ca7ae6ca" />
Cette capture montre que la connexion SSH avec GitHub est réussie et que l'authentification fonctionne. La commande git status confirme que la branche main possède deux commits en attente d'envoi vers GitHub avec la commande git push.
<img width="800" height="426" alt="Capture d&#39;écran 2026-10-01 101813" src="https://github.com/user-attachments/assets/0727a1a2-caae-4dec-bac9-4ce1b7e4ceb3" />
Cette capture montre la configuration du dépôt GitHub et l'exécution de la commande `git pull --no-edit` pour récupérer les dernières modifications. Un conflit de fusion (Merge Conflict) est détecté dans le fichier `README.md`, ce qui nécessite une résolution manuelle avant de terminer la synchronisation.
<img width="943" height="326" alt="Capture d&#39;écran 2026-10-01 101949" src="https://github.com/user-attachments/assets/f941a683-afc1-4ca9-8e5f-d6a79759b0ab" />
Cette capture montre l'historique des commits Git avec la commande `git log --oneline --graph --decorate -10`. Elle permet de visualiser les différentes modifications, les branches et les fusions effectuées. Le résultat confirme que la fusion a été réalisée et que la branche `main` est à jour avec le commit de fusion.
<img width="679" height="229" alt="Capture d&#39;écran 2026-10-01 104125" src="https://github.com/user-attachments/assets/51e76fa5-1049-431b-a272-acc0a8a0aa77" />
Cette capture montre l'envoi réussi des modifications vers GitHub avec la commande `git push`. Les 6 commits locaux ont été synchronisés avec le dépôt distant sur la branche `main`. Le transfert s'est terminé avec succès.
Synchronisation GitHub réussie
<img width="508" height="265" alt="Capture d&#39;écran 2026-10-01 104647" src="https://github.com/user-attachments/assets/424d78c6-e226-4ba7-9c2f-5766d61ecfcb" />
Cette capture montre la vérification finale du dépôt Git avec les commandes `git status` et `git log --oneline -10`. Le résultat confirme que la branche `main` est parfaitement synchronisée avec GitHub, que tous les commits sont enregistrés et qu'il n'y a aucune modification en attente.
Dépôt GitHub à jour
<img width="855" height="309" alt="Capture d&#39;écran 2026-10-01 104816" src="https://github.com/user-attachments/assets/76a7c057-4bff-4e8c-ae50-4b2a5014b386" />
Cette capture montre le fichier `README.md` ouvert dans Visual Studio Code. Il présente les informations de l'étudiant, la description du projet NativeScript et le dossier `images` destiné à contenir les captures d'écran du projet.
<img width="936" height="472" alt="Capture d&#39;écran 2026-10-01 104957" src="https://github.com/user-attachments/assets/4bf7fbff-84f3-47b1-b30c-01c5dc7ecb6d" />



