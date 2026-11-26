





# COLLÈGE BORÉAL  |  INF1083 — DÉVELOPPEMENT D’APPLICATIONS



```
RAPPORT FINAL

TP 7 — Projects

BarberShop

Application mobile NativeScript / Angular

Étudiant : Hammiche Billal

Matricule : 300159887

Cours : INF1083-200 — Développement d’applications

Date : 19 novembre 2026
```


## 💈 Application BarberShop — écran d’accueil


COLLÈGE BORÉAL  |  INF1083 — DÉVELOPPEMENT D’APPLICATIONS

1. Présentation et objectifs

BarberShop est une application mobile de démonstration destinée à présenter les prestations d’un salon de coiffure pour hommes. Elle permet de consulter les tarifs et de remplir un formulaire de demande de réservation. Le projet répond à la consigne d’une application comportant au minimum trois pages accessibles par onglets.

2. Environnement technique

Technologie

NativeScript, Angular, TypeScript, HTML

Patron (template)

@nativescript/template-tab-navigation-ng

Modules utilisés

@nativescript/core, @nativescript/angular, NativeScriptFormsModule

Développement

Visual Studio Code, PowerShell

Exécution

Émulateur Android Pixel 9

Gestion de versions

Git et GitHub

3. Architecture de l’application

La navigation principale comporte trois onglets : Home (Accueil), Browse (Services) et Search (Réservation). Les interfaces sont réalisées avec les composants natifs de NativeScript, notamment ActionBar, StackLayout, ScrollView, Label, TextField et Button.

4. Page Accueil — Home

La page d’accueil présente le nom BarberShop, un message de bienvenue et les prestations proposées. Un bouton permet d’accéder à la découverte des services.

<img width="318" height="583" alt="Capture d’écran 2026-11-19 110317" src="https://github.com/user-attachments/assets/48262824-e087-4666-92e1-9b05ec27fff3" />


Figure 1 — Page d’accueil de BarberShop


COLLÈGE BORÉAL  |  INF1083 — DÉVELOPPEMENT D’APPLICATIONS

5. Page Services — Browse

La page Browse présente les quatre prestations et leurs prix : coupe homme (25 $), dégradé moderne (30 $), taille de barbe (15 $), coupe + barbe (35 $).

<img width="285" height="592" alt="Capture d’écran 2026-11-19 110555" src="https://github.com/user-attachments/assets/977bd833-a111-4d46-a6c4-ed19926bca2a" />


Figure 2 — Liste des services et tarifs

6. Page Réservation — Search

La page Search comprend quatre champs : nom complet, téléphone, service souhaité et date souhaitée. Le module NativeScriptFormsModule active la liaison bidirectionnelle [(ngModel)] avec les propriétés du composant Angular. Le bouton « Réserver maintenant » déclenche la méthode reserver(), qui vérifie que les champs sont renseignés et affiche un message local.

<img width="281" height="600" alt="Capture d’écran 2026-11-19 111544" src="https://github.com/user-attachments/assets/351539d2-bd9c-4552-9bf0-efe3feae152c" />


Figure 3 — Formulaire de réservation affiché sur Android


COLLÈGE BORÉAL  |  INF1083 — DÉVELOPPEMENT D’APPLICATIONS

7. Tests et résultats

Le projet a été compilé et synchronisé sur l’émulateur Android. Les captures confirment l’affichage des pages Accueil, Services et Réservation. Le terminal indique une compilation sans erreur bloquante, avec 21 avertissements. Un essai a affiché « Veuillez remplir tous les champs » ; les valeurs des quatre champs ont ensuite été observées dans la console, ce qui confirme leur récupération par le composant. La confirmation visuelle d’une réservation complète reste à vérifier.

<img width="688" height="221" alt="Capture d’écran 2026-11-19 111657" src="https://github.com/user-attachments/assets/ad634deb-5f3d-4900-b583-25b2b1eff66d" />


Figure 4 — Terminal 


9. Conclusion

Le TP 7 a permis de concevoir une application mobile NativeScript/Angular comportant trois pages fonctionnelles, de mettre en œuvre une navigation par onglets, de présenter des services tarifés et de récupérer les données d’un formulaire grâce à ngModel. Les prochaines améliorations possibles sont la validation détaillée des données, le choix de date avec un composant dédié et l’enregistrement réel des réservations dans un service distant.






