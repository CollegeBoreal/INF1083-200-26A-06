# 300159672
## INF1083 – IDE, Git et GitHub

## But du travail

Pratiquer Git et GitHub, découvrir l'éditeur Nano et synchroniser un projet local avec un dépôt distant, en utilisant une connexion SSH.

## Remarque sur les captures d'écran

J'ai oublié de prendre des captures pendant que je faisais le travail. Toutes les étapes ont bien été réalisées. Les captures ci-dessous ont été prises après coup, à partir de l'état actuel de mon ordinateur et de mon compte GitHub, et prouvent chaque étape.

## Preuves du travail

### 1. Dépôt cloné, mon dossier créé et état du dépôt

J'ai cloné le dépôt du cours dans le dossier `Developer` (qui existait déjà) avec `git clone`, puis créé mon dossier `300159672` dans `1.Referentiel/1.IDE`, avec mon `README.md` écrit sous Nano. `git status` indique que ma branche est à jour avec `origin/main` et qu'il ne reste rien à valider.

<img width="1512" height="982" alt="Capture d’écran 2026-10-01 à 12 09 30" src="https://github.com/user-attachments/assets/644b3597-f215-49f8-ae95-14e4d7681e8b" />


### 2. Mon commit

`git log` montre mon commit `:star: Mon premier commentaire` sur mon dossier.
  
  <img width="1512" height="982" alt="Capture d’écran 2026-10-01 à 12 19 13" src="https://github.com/user-attachments/assets/02eeb8bc-c119-44ab-b879-0134feb845e9" />


### 3. Configuration de Git

Mon nom, mon courriel et l'éditeur `nano` sont configurés dans `~/.gitconfig`.

<img width="1512" height="982" alt="Capture d’écran 2026-10-01 à 12 23 27" src="https://github.com/user-attachments/assets/cff62b6d-3e5c-4f76-81c0-c76c50173722" />


### 4. Clé SSH et dépôt distant en SSH

La connexion SSH était déjà configurée : mes clés `ma_cle.pk` et `ma_cle.pub` existent, le fichier `config` pointe vers ma clé, `ssh -T git@github.com` confirme que GitHub me reconnaît, et `git remote --verbose` montre que le dépôt utilise l'adresse SSH.

<img width="1512" height="982" alt="Capture d’écran 2026-10-01 à 12 27 14" src="https://github.com/user-attachments/assets/85fbbafa-16d5-42f9-9fe4-60b948b8e3da" />


Ma clé publique est bien ajoutée à mon compte GitHub (ajoutée le 17 septembre, utilisée récemment).

![Clé SSH sur GitHub](images/05-github-cle.png)

### 5. Travail envoyé sur GitHub

Après le `git push`, mon dossier `300159672` est visible sur la page GitHub du dépôt, avec mon `README.md` et le commentaire « Mon premier commentaire ».

<img width="1512" height="982" alt="Capture d’écran 2026-10-01 à 12 44 07" src="https://github.com/user-attachments/assets/60a27020-315e-49a0-a728-9578ad4c5d74" />


## Conclusion

Ce travail m'a permis de pratiquer les commandes Git essentielles, d'utiliser Nano, de configurer Git et une clé SSH, et de synchroniser mon travail avec GitHub.
