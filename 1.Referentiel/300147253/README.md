Préparer les répertoires du projet, créer un fichier README.md et un dossier images, puis initialiser un projet NativeScript à partir de Windows PowerShell. Les captures ci-dessous documentent les résultats observés
Dans PowerShell, je me suis placé dans Documents\projets, puis j’ai créé les dossiers TON_ID et 300147253. Les premières tentatives de changement de dossier contenaient deux commandes collées, ce qui a provoqué une erreur. La commande corrigée a fonctionné.

Commandes utilisées :

cd Documents\projets
mkdir TON_ID
mkdir 300147253
<img width="868" height="651" alt="image" src="https://github.com/user-attachments/assets/9b3f7822-328c-4751-ad9e-59eaf3c991f1" />
Après avoir accédé au répertoire 300147253, j’ai créé le fichier README.md et le dossier images. La capture confirme la présence de ces éléments. Une tentative de commande cd mal saisie a d’abord généré une erreur, corrigée ensuite.

Commandes utilisées :

cd 300147253
New-Item README.md
mkdir images
<img width="876" height="660" alt="image" src="https://github.com/user-attachments/assets/95d6fda1-4d8d-4223-89af-3c78c4b085fe" />
Le terminal indique que le projet NativeScript B300147253 a été créé avec succès. Il affiche aussi des avertissements npm concernant des vulnérabilités et des scripts d’installation : ces avertissements ne signifient pas que la création du projet a échoué. La capture ne démontre pas encore l’exécution de l’application sur Android.

Commandes proposées pour la vérification et l’exécution (non confirmées par cette capture) :

cd B300147253
ns doctor
ns run android
<img width="866" height="644" alt="image" src="https://github.com/user-attachments/assets/8f4525ba-cbc9-4ee1-bf27-7bc905e34de9" />
Conclusion : les dossiers et le fichier de documentation ont été préparés, et le projet NativeScript a été initialisé. Une vérification sur émulateur Android reste à documenter séparémen
