Rapport – Premiers pas avec Git et SSH

Nom : Billal Hammiche
ID étudiant : 300159887
Cours : INF1083

1. Objectif

L’objectif de ce travail était de se familiariser avec Git, GitHub et SSH, de créer un répertoire personnel dans le dépôt du cours et d’envoyer son travail sur GitHub.
<img width="644" height="603" alt="Capture d’écran 2026-09-28 233504" src="https://github.com/user-attachments/assets/76b9fa7c-29d0-4617-a65f-78f311a47745" />

2. Création du répertoire

J’ai créé le répertoire Developer et cloné le dépôt du cours avec :

git clone https://github.com/CollegeBoreal/INF1083-200-26A-06.git

Ensuite, j’ai créé mon répertoire étudiant :

300159887

et le fichier :

README.md
3. Utilisation de Git

J’ai ajouté mon fichier avec :

git add 300159887

Puis j’ai créé un commit :

git commit --message ":star: Mon premier commentaire"

J’ai également utilisé :

git pull --no-edit

pour récupérer les modifications du dépôt distant.

4. Configuration de SSH
<img width="665" height="630" alt="Capture d’écran 2026-09-28 235837" src="https://github.com/user-attachments/assets/3dc059ac-d434-4a2f-97a0-3c50436a64a6" />

J’ai créé une clé SSH avec :
<img width="657" height="604" alt="Capture d’écran 2026-09-29 000105" src="https://github.com/user-attachments/assets/0d30f98d-1563-4ead-a5bf-09301a4c2614" />

ssh-keygen -t ed25519 -C "billal.hammiche@monboreal.ca"

J’ai ensuite ajouté ma clé publique à mon compte GitHub et configuré le fichier SSH config.

La connexion a été testée avec :

ssh -T git@github.com

Le message suivant a confirmé que l’authentification fonctionnait :

Hi hammichebillal06-dot! You've successfully authenticated,
but GitHub does not provide shell access.
5. Envoi du travail

J’ai changé l’adresse du dépôt pour utiliser SSH :

git remote set-url origin git@github.com:CollegeBoreal/INF1083-200-26A-06.git

Finalement, j’ai envoyé mon travail avec :

git push

Le résultat était :
<img width="626" height="244" alt="Capture d’écran 2026-09-29 002626" src="https://github.com/user-attachments/assets/53e7b6de-642d-489e-9461-910d75f07bf7" />


Everything up-to-date
Conclusion

Ce travail m’a permis d’apprendre à utiliser Git et GitHub, à créer des commits, à synchroniser un dépôt et à configurer une clé SSH pour communiquer avec GitHub de manière sécurisée.
