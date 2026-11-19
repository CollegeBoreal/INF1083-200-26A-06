Rapport de laboratoire RxJS

Cours : INF1083
 Étudiant : Mouhamad Al Bachir Konate
 Numéro étudiant : 300157733
 Laboratoire : RxJS et consommation d'une API avec NativeScript Angular

Objectif

L'objectif de ce laboratoire était d'utiliser RxJS, HttpClient et les Observables afin d'accéder à des données provenant d'une API Web et de les afficher dans une application NativeScript Angular.

Technologies utilisées
NativeScript
Angular
RxJS
HttpClient
Observable
TypeScript
Android Emulator
Réalisation
1. Création du projet

Un projet NativeScript Angular a été créé à l'aide de la commande suivante :

Shell
ns create b300157733 --template @nativescript/template-tab-navigation-ng

Le projet a ensuite été ouvert dans Visual Studio Code pour effectuer les modifications nécessaires.

2. Création du modèle de données

Un dossier partagé nommé shared a été créé.

Le fichier country.ts contient la classe représentant un pays :

TypeScript
export class Country {
id: number;
name: string;
capital: string;
}
3. Création du service API

Le fichier apicall.service.ts a été créé afin de communiquer avec l'API.

Ce service utilise :

HttpClient
Observable
RxJS
map()
catchError()

Le service envoie une requête vers :

Plain Text
https://countries.nexperts.nl/capital/

et retourne une collection d'objets Country.

4. Configuration du module principal

Le module principal a été modifié afin d'ajouter :

TypeScript
NativeScriptHttpClientModule

Cette modification permet à l'application d'effectuer des requêtes HTTP vers l'API.

5. Configuration des formulaires Angular

Le module de recherche a été modifié afin d'ajouter :

TypeScript
NativeScriptFormsModule

Cette bibliothèque permet l'utilisation de :

TypeScript
[(ngModel)]

pour lier le champ texte à la variable utilisée dans le composant.

6. Modification du composant Search

Le composant de recherche a été modifié pour :

recevoir la saisie de l'utilisateur;
appeler le service API;
recevoir les données retournées;
stocker les résultats dans une collection de pays;
afficher les données dans une liste.

La méthode principale utilisée est :

TypeScript
searchCapital()

qui s'abonne à l'Observable retourné par RxJS grâce à :

TypeScript
.subscribe()
7. Interface utilisateur

L'interface contient :

un champ texte permettant de saisir une capitale;
un bouton Search;
un composant ListView affichant les résultats.

L'utilisateur peut entrer une capitale et afficher la liste des pays correspondants.

Tests effectués

Les tests suivants ont été réalisés avec succès :

Capitale saisie	Résultat
Ottawa	Canada
Paris	France
London	United Kingdom
Tokyo	Japan

Les pays trouvés ont été correctement affichés dans le composant ListView.

Résultat obtenu

L'application fonctionne correctement :

L'utilisateur saisit une capitale.
Le bouton Search lance la requête.
Le service Angular utilise HttpClient.
RxJS retourne un Observable<Country[]>.
Les résultats sont affichés dans la liste.
Conclusion

Ce laboratoire m'a permis d'apprendre à utiliser RxJS avec Angular et NativeScript afin de consommer une API Web. J'ai utilisé les Observables, le HttpClient, les formulaires Angular avec ngModel ainsi qu'un ListView pour afficher les données récupérées. Les tests effectués démontrent que l'application fonctionne correctement et répond aux exigences du laboratoire.


<img width="1521" height="845" alt="image" src="https://github.com/user-attachments/assets/e430b89f-9735-4c6f-8f06-2838c2ded58e" />
<img width="2048" height="1536" alt="image" src="https://github.com/user-attachments/assets/bc1c08a4-ea40-4510-a505-d7de01d06d4b" />
<img width="2048" height="1536" alt="image" src="https://github.com/user-attachments/assets/9f241954-6c99-4bfc-8c49-86ed25f79278" />
