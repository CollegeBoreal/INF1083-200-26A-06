TP 5 — RxJS : recherche de pays par capitale

Étudiant : Hammiche Billal   |   Matricule : 300159887

Cours : INF1083-200 — Développement d’applications

Date : 12 novembre 2026   |   Projet : b300159887

1. Objectif

Développer une application mobile NativeScript Angular avec onglets, utilisant un formulaire basé sur ngModel, un service HttpClient et un Observable RxJS pour rechercher des pays à partir d’une capitale et afficher les résultats dans une liste.

2. Environnement et organisation

Outils : Visual Studio Code, PowerShell, NativeScript Angular, TypeScript, émulateur Android, Git et GitHub. Le projet est placé sous 5.RxJS/300159887/b300159887 ; les éléments de documentation sont README.md et images/.
<img width="217" height="426" alt="image" src="https://github.com/user-attachments/assets/f6f380f3-9e75-4e5b-ae04-a3ad961c9c46" />



Figure 1 — Structure initiale du projet Angular avec les modules app, search et shared.

3. Création du projet et modèle de données

Commande de création : ns create b300159887 --template @nativescript/template-tab-navigation-ng. Le modèle Country définit les propriétés id, name et capital. Les propriétés ont été déclarées avec une assertion d’affectation définitive (!) pour respecter la vérification TypeScript.
<img width="207" height="435" alt="image" src="https://github.com/user-attachments/assets/a8937cde-e9ea-4a90-b79d-56c4dd444033" />



Figure 2 — Dossier shared avec country.ts et apicall.service.ts.

4. Service HTTP et traitement RxJS

Le service ApicallService injecte HttpClient et appelle l’URL fournie dans le cours, https://countries.nexperts.nl/capital/ suivie de la capitale saisie. La méthode get() fournit un flux observable ; map() convertit les données reçues en objets Country et catchError() gère les erreurs. Le module principal importe NativeScriptHttpClientModule.
<img width="383" height="316" alt="image" src="https://github.com/user-attachments/assets/9c53472e-40b8-44cd-b56b-4c94d81dfe68" />



Figure 3 — Configuration du module principal avant ajout de l’accès HTTP.

5. Interface Search et formulaire

Le composant SearchComponent déclare name et countries, injecte ApicallService, puis utilise subscribe() pour récupérer les données et mettre à jour la liste. Dans le modèle HTML, [(ngModel)] relie la saisie à name ; le bouton déclenche searchCapital() et ListView affiche les résultats. NativeScriptFormsModule est importé dans search.module.ts.
<img width="373" height="268" alt="image" src="https://github.com/user-attachments/assets/fe91178f-61f1-4fe6-a2f8-79a2b98b5a8d" />



Figure 4 — Composant Search avant intégration de la logique de recherche.
<img width="402" height="227" alt="image" src="https://github.com/user-attachments/assets/abc97178-db2c-436d-af3d-cf644242ee28" />



Figure 5 — Module Search avant activation de NativeScriptFormsModule.

6. Test sur l’émulateur Android

L’application a été lancée avec ns run android. Dans l’onglet Search, la capitale Madrid a été saisie. Le résultat affiché à l’écran est Spain / Madrid. Ce test valide le fonctionnement visible de la recherche et du ListView.
<img width="215" height="412" alt="image" src="https://github.com/user-attachments/assets/bc3a1843-87e2-4ca9-9c63-9e7794d8e132" />



Figure 6 — Résultat réel sur l’émulateur : recherche Madrid, pays Spain.




8. Bilan et conclusion

Le laboratoire a permis de mettre en pratique les composants Angular, la liaison ngModel, l’injection de services, les requêtes HTTP et le traitement asynchrone avec RxJS. Le test Madrid → Spain / Madrid est concluant. Pour finaliser la remise, vérifier la publication sur GitHub et conserver les captures de preuve dans images/.
