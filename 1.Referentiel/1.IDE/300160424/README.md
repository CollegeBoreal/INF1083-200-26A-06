\# Youcef 300160424
Mon premier travail avec Git.

Rapport – Premiers pas avec Git et SSH
Nom : Youcef Laziz
 ID étudiant : 300160424 
Cours : INF1083 – Collège Boréal 
1. Objectif du travail
L’objectif de ce travail était :
•	D’apprendre à utiliser Git et GitHub
•	De créer un répertoire personnel dans le dépôt du cours
•	De configurer une clé SSH pour une connexion sécurisée
•	D’envoyer son travail sur GitHub via git push
•	De comprendre les étapes essentielles du workflow Git
Ce rapport présente les étapes réalisées, accompagnées des captures d’écran.
2. Ouverture du terminal
J’ai ouvert l’invite de commande Windows en mode Administrateur pour exécuter les commandes Git.
3. Création du répertoire Developer et clonage du dépôt
J’ai créé mon espace de travail :
Code
mkdir Developer
Cd Developer
Puis j’ai cloné le dépôt du cours :
Code
git clone https://github.com/CollegeBoreal/INF1083-200-26A-06.git
<img width="975" height="984" alt="image" src="https://github.com/user-attachments/assets/5756d5e9-6a52-4647-bf51-0e421840fad1" />

4. Création du dossier étudiant
Je suis allé dans le bon dossier :
Code
Cd INF1083-200-26A-06/1.Referentiel/1.IDE
Puis j’ai créé mon dossier personnel :
Code
mkdir 300160424
Cd 300160424
<img width="975" height="993" alt="image" src="https://github.com/user-attachments/assets/34e28fc1-568b-402f-af07-d28cd6e8f7f3" />

5. Création du fichier README.md
Comme nano n’est pas disponible sur Windows, j’ai utilisé :
Code
notepad README.md
Contenu du fichier :
Code
# Youcef 300160424
Mon premier travail avec Git.
<img width="975" height="1016" alt="image" src="https://github.com/user-attachments/assets/74475fa3-b706-4158-ab97-cc32c0b05363" />

6. Ajout du fichier et commit Git
J’ai ajouté mon dossier :
Code
git add 300160424
Puis j’ai vérifié :
Code
git status
Ensuite j’ai créé mon premier commit :
Code
git commit --message ":star: Mon premier commentaire"
<img width="975" height="984" alt="image" src="https://github.com/user-attachments/assets/8547c1e7-f02d-45e3-92ee-9b8d2b1baf9c" />

7. Synchronisation avec le dépôt distant
J’ai récupéré les mises à jour du dépôt :
Code
git pull --no-edit
<img width="975" height="1026" alt="image" src="https://github.com/user-attachments/assets/91b25310-279f-472e-a65c-7266fc91c711" />
8. Génération de la clé SSH
J’ai généré une clé SSH avec mon email Boréal :
Code
ssh-keygen -t ed25519 -C "300160424@monboreal.ca"
J’ai confirmé l’écrasement de l’ancienne clé (y) et validé sans passphrase.
<img width="975" height="976" alt="image" src="https://github.com/user-attachments/assets/285841bc-db66-4834-a4cc-1da9ee58f1dd" />
9. Renommage des clés SSH
Windows ne reconnaît pas mv, donc j’ai utilisé :
Code
rename id_ed25519 ma_cle.pk
rename id_ed25519.pub ma_cle.pub

10. Configuration du fichier SSH config
J’ai créé le fichier :
Code
notepad config
Avec le contenu :
Code
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/ma_cle.pk
11. Ajout de la clé publique sur GitHub
J’ai affiché ma clé :
Code
type ma_cle.pub
Puis je l’ai ajoutée dans :
GitHub → Settings → SSH and GPG key
12. Passage du dépôt en mode SSH
J’ai modifié l’URL du dépôt :
Code
git remote set-url origin git@github.com:CollegeBoreal/INF1083-200-26A-06.git
Vérification :
Code
git remote --verbose
13. Envoi du travail sur GitHub
J’ai envoyé mon travail :
Code
git push
<img width="975" height="1058" alt="image" src="https://github.com/user-attachments/assets/25cadbd4-bc0f-4c53-a179-0f8eeb0ccb61" />
Conclusion
Ce travail m’a permis de :
✔️ utiliser Git et GitHub ✔️ créer un dossier personnel dans un dépôt partagé ✔️ créer et modifier un fichier README ✔️ faire des commits et synchroniser un dépôt ✔️ générer et configurer une clé SSH ✔️ sécuriser la connexion avec GitHub ✔️ envoyer mon travail avec git push
Je maîtrise maintenant les bases essentielles pour travailler avec Git dans mes futurs projets.






