Rapport d'Exécution et de Développement




<img width="675" height="617" alt="f" src="https://github.com/user-attachments/assets/c912625e-74ae-4fa4-b0ff-86b935de0e65" />






1. Contexte et Arborescence

Le projet s'inscrit dans le cadre du cours INF1083-200-26A-06. Une analyse du répertoire de travail montre la structure standard d'un projet NativeScript basé sur Angular et TypeScript :

Dossier principal : C:\Users\HP\Developer\INF1083-200-26A-06\B300159463

Éléments clés présents : src/, App_Resources/, node_modules/, platforms/, nativescript.config.ts, package.json.


<img width="1101" height="576" alt="a" src="https://github.com/user-attachments/assets/5daca739-520e-46be-a8ef-906f47369301" />





2. Modifications Apportées au Code Source

La mise à jour principale a porté sur le service Angular PersonService (src/app/people/person.service.ts) ainsi que les dépendances du projet :

Dépendances : Ajout et mise à jour de packages NativeScript (@nativescript/android, @nativescript/tailwind, etc.).

Données Métier : Remplacement de la liste initiale (pionniers de l'informatique comme Bjarne Stroustrup, Steve Wozniak, Niklaus Wirth) par une nouvelle collection de joueurs de football :

Lionel Messi, Cristiano Ronaldo, Kylian Mbappé, Neymar Jr, Mohamed Salah, Erling Haaland, Kevin De Bruyne, Luka Modric, Karim Benzema, Robert Lewandowski.

Structure du Code : Utilisation des Signals d'Angular (items = signal<Person[]>([...])) et conservation de la méthode de recherche getPerson(id: number).




<img width="1106" height="609" alt="c" src="https://github.com/user-attachments/assets/a81e2b92-7fe7-4ca6-bf58-0538045a0e98" />





3. Rendu Visualisé sur Émulateur Android

L'application mobile a été exécutée et testée sur l'émulateur Android :

La liste d'éléments s'affiche correctement sous forme de ListView / StackLayout.

Tous les noms des joueurs ajoutés dans le service apparaissent en ordre séquentiel sur l'interface utilisateur mobile.








4. Gestion de Version avec Git

Les étapes de suivi et de gestion de version ont été exécutées selon la séquence suivante :

Vérification du statut et des différences (git status, git diff) :

Identification des fichiers modifiés (package.json, package-lock.json, person.service.ts).

Validation des modifications (git commit) :

Message de commit : "Ajout des joueurs de football" (Hash: 24801cc).

Configuration du dépôt distant (git remote) :

Tentative initiale de git push ayant échoué (absence de serveur distant configuré).

Ajout du dépôt distant SSH : git remote add origin git@github.com:CollegeBoreal/INF1083-200-26A-06.git.

Vérification réussie via git remote -v.



<img width="1104" height="588" alt="e" src="https://github.com/user-attachments/assets/88ad73ef-1745-48ea-b041-03ff94d2dcbb" />






<img width="1101" height="576" alt="a" src="https://github.com/user-attachments/assets/78a76f29-f827-496b-8a03-776dd5c75fcb" />
<img width="1101" height="576" alt="a" src="https://github.com/user-attachments/assets/22e62ce9-3b16-4157-9b8c-a7c21ad3efd3" />
5. Résumé des Commandes Clés Exécutées

# Navigation
cd B300159463
dir

# Inspecter les modifications
git status
git diff

# Commiter les changements
git commit -m "Ajout des joueurs de football"

# Liaison avec GitHub
git push # (erreur initiale)
git remote add origin git@github.com:CollegeBoreal/INF1083-200-26A-06.git
git remote -v


6. Conclusion

Le développement de la fonctionnalité demandée est complet : le code source a été adapté aux nouvelles spécifications, le rendu visuel sur mobile est conforme, et le projet a été mis sous gestion de version sur Git avec la liaison au dépôt distant du Collège Boréal.
