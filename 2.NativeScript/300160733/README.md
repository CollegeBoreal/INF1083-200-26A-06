Projet NativeScript – B300160733

Présentation

Ce projet a pour objectif de créer, configurer et exécuter une application mobile avec NativeScript et Angular sur un environnement Android.

J’ai d’abord préparé le dossier du projet, créé l’application NativeScript, vérifié la configuration Android et Java, puis lancé l’application sur un émulateur. Enfin, j’ai personnalisé les données affichées dans l’application.

1. Création du dossier de travail

J’ai commencé par créer un dossier nommé B300160733 sur le Bureau.
Dans ce dossier, j’ai également créé un fichier README.md et un dossier images afin d’organiser le projet et les captures d’écran.

cd $HOME\Desktop
mkdir B300160733
cd B300160733
New-Item README.md
mkdir images


<img width="1917" height="1025" alt="image" src="https://github.com/user-attachments/assets/099dcb14-7048-4a0d-823c-bb47f72ae3b9" />



2. Création du projet NativeScript

J’ai créé le projet NativeScript avec la commande suivante :

ns create B300160733

Pendant la création, j’ai choisi Angular comme type de projet et Hello World comme modèle de départ.


<img width="1917" height="1046" alt="image" src="https://github.com/user-attachments/assets/47bbae5b-1337-4bb2-a279-d7ac8d09e642" />



3. Vérification de la création du projet

Après l’installation des dépendances, NativeScript confirme que le projet B300160733 a été créé avec succès.

Je me suis ensuite déplacé dans le dossier du projet et j’ai vérifié les fichiers avec :

cd B300160733
dir


<img width="1917" height="1042" alt="image" src="https://github.com/user-attachments/assets/f5c3b30d-433f-455a-a385-554aba365975" />



4. Diagnostic de l’environnement

J’ai utilisé la commande suivante pour vérifier la configuration de NativeScript :

ns doctor

Le diagnostic a permis d’identifier les éléments qui devaient encore être configurés, notamment ANDROID_HOME, le SDK Android, les outils de compilation et le JDK Java.


<img width="1917" height="1046" alt="image" src="https://github.com/user-attachments/assets/b5e82395-7fcd-4048-80e9-dd5188e27c2f" />



5. Configuration Android et Java

Le diagnostic indiquait que certains composants Android et Java n’étaient pas encore correctement configurés. J’ai donc poursuivi l’installation et la configuration des dépendances nécessaires afin de pouvoir compiler l’application Android.


<img width="1917" height="1045" alt="image" src="https://github.com/user-attachments/assets/48735993-05c3-48bf-84c1-983df482cf43" />



6. Installation du JDK

J’ai tenté d’installer Temurin JDK 17 avec Chocolatey. La première tentative a rencontré un problème de permissions, ce qui m’a permis d’identifier qu’une installation avec les droits administrateur était nécessaire.

choco install temurin17 -y



<img width="1917" height="1060" alt="image" src="https://github.com/user-attachments/assets/461a4cd5-d6c9-4f03-adc4-c8b90a5c5698" />



7. Première exécution de l’application

Après la configuration de l’environnement, j’ai exécuté l’application sur un émulateur Android.

La version initiale affichait une liste de scientifiques en informatique, par exemple Alan Turing, Grace Hopper, Ada Lovelace et Linus Torvalds.


<img width="1917" height="1057" alt="image" src="https://github.com/user-attachments/assets/db6c5382-3a2e-4543-8cfb-14b3f0f23a44" />



8. Personnalisation de l’application

J’ai ensuite modifié les données de l’application afin d’afficher ma propre liste de personnes.

Pour chaque personne, j’ai ajouté les informations suivantes :

nom et prénom ;

nationalité ;

travail ;

ville.

La liste contient notamment Yanis Belhadi, Amine Benali, Sarah Martin, Adam Wilson, Lina Haddad, Karim Bensalem, Emma Johnson, Mohamed Amari, Sofia Rossi et Lucas Tremblay.


<img width="1865" height="1071" alt="image" src="https://github.com/user-attachments/assets/de56a1a8-cdda-4d1f-bac3-f6207f2d78ea" />


<img width="1912" height="1056" alt="image" src="https://github.com/user-attachments/assets/cfc68f21-444e-4152-ba79-7ee99fa97516" />



9. Résultat final

L’application fonctionne maintenant sur l’émulateur Android avec les données personnalisées. La liste a bien été mise à jour et les modifications sont visibles dans l’application.


<img width="1865" height="1071" alt="image" src="https://github.com/user-attachments/assets/de56a1a8-cdda-4d1f-bac3-f6207f2d78ea" />



<img width="1912" height="1056" alt="image" src="https://github.com/user-attachments/assets/cfc68f21-444e-4152-ba79-7ee99fa97516" />


✅ Conclusion

Ce travail m’a permis de réaliser les principales étapes d’un projet NativeScript :

créer et organiser le dossier du projet ;

créer une application NativeScript avec Angular ;

vérifier l’environnement avec ns doctor ;

configurer Android et Java ;

exécuter l’application sur un émulateur Android ;

modifier les données de l’application ;

vérifier le résultat final.

Le projet B300160733 est maintenant fonctionnel et personnalisé.
