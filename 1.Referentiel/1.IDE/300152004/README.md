# premiers pas avec Git
# 300152004

Étape 1 création du répertoire personnel
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/1.Referentiel/1.IDE/300152004/images/etape-1-preparation-et-repertoire.png?raw=true" />
J’ai commencé par essayer de créer le répertoire de développement Developer. PowerShell m’a indiqué qu’il existait déjà, ce qui n’a pas posé de problème : je me suis simplement déplacé dedans. J’ai ensuite tenté de cloner le dépôt du cours depuis GitHub, mais Git a refusé parce que le dossier du cours se trouvait déjà sur mon ordinateur, ayant été cloné auparavant. Je suis donc entré directement dans le répertoire de la leçon (1.Referentiel/1.IDE). Une fois là, j’ai créé mon répertoire personnel, nommé avec mon identifiant Boréal (300152004), puis je m’y suis placé et j’ai ouvert l’éditeur nano pour créer et rédiger mon fichier README.md.

Étape 2 configuration de Git et premier commit
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/1.Referentiel/1.IDE/300152004/images/etape-2-mise-en-scene-et-commit.png?raw=true" />
Après avoir rédigé mon README.md, je suis remonté d’un niveau vers le répertoire de la leçon. En vérifiant l’état du dépôt avec git status, j’ai vu que mon dossier apparaissait en rouge, ce qui signifie que Git ne le suivait pas encore. J’ai d’abord lancé git add sans préciser de fichier, et Git m’a répondu qu’il n’avait rien ajouté. J’ai donc recommencé en indiquant mon dossier, ce qui l’a mis en scène. Un avertissement sur la conversion des fins de ligne est apparu, sans conséquence sous Windows. Un second git status a alors affiché mon fichier en vert, signe qu’il était prêt à être validé.

Étape 3 Mise à jour du dépôt local (pull)
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/1.Referentiel/1.IDE/300152004/images/etape-3-pull.png?raw=true" />
Mon commit a bien été enregistré : un fichier créé, avec deux lignes ajoutées. J’ai ensuite synchronisé mon dépôt local avec celui de GitHub grâce à git pull --no-edit, l’option --no-edit évitant l’ouverture de l’éditeur pour le message de fusion. Git a téléchargé environ 49 Mo de données et fusionné automatiquement les changements. La liste affichée montre que d’autres étudiants avaient ajouté leurs propres dossiers et fichiers, et que certains scripts du cours avaient été mis à jour. Mon dépôt local contient désormais à la fois mon travail et celui des autres.

Étape 4 Génération de la clé SSH
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/1.Referentiel/1.IDE/300152004/images/etape-4-cle-ssh.png?raw=true" />
La sortie du pull se termine par la création de nouveaux fichiers, notamment pour la partie Angular du cours. J’ai ensuite lancé la génération d’une clé SSH de type ed25519, associée à mon courriel. J’ai commis une petite erreur : quand Git m’a demandé où enregistrer la clé, j’ai tapé la commande cd ~/.ssh au lieu d’appuyer simplement sur Entrée. Git a donc tenté d’enregistrer la clé sous ce nom, et la sauvegarde a échoué. J’ai laissé la phrase secrète vide, comme le demandait le tutoriel. Je me suis ensuite déplacé dans le répertoire .ssh et j’ai commencé à renommer la clé privée en ma_cle.pk. Pour la prochaine fois, il faudra accepter l’emplacement par défaut avec Entrée, puis renommer aussi la clé publique en ma_cle.pub.

Étape 5 Configuration SSH, changement d’URL et envoi sur GitHub
<img width="3840" height="2877" alt="225547c6-30d0-4d3c-9def-288f2ce3d170" src="https://github.com/CollegeBoreal/INF1083-200-26A-06/blob/main/1.Referentiel/1.IDE/300152004/images/etape-5-config-ssh-et-push.png?raw=true" />
J’ai ouvert le fichier de configuration SSH avec nano pour indiquer à SSH quelle clé utiliser avec GitHub. L’ajout de la clé publique à mon compte GitHub se fait dans le navigateur, c’est pourquoi cette étape n’apparaît pas sur les captures. Je suis ensuite retourné dans le dépôt du cours et j’ai remplacé l’adresse HTTPS du dépôt distant par son adresse SSH. J’ai vérifié ce changement avec git remote --verbose, qui affiche bien la nouvelle adresse pour la récupération et l’envoi. Enfin, j’ai exécuté git push pour envoyer mon commit sur GitHub. Le message 6cb08b0..604cd35 main -> main confirme que l’envoi a réussi.




