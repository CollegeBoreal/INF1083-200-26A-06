# SankoTalent — Exigences fonctionnelles

Document de référence de SANKOVEYA Technologies. Sections 1 à 33 : documentation d'origine. Sections 34 à 54 : compléments du 26 novembre 2026.

> Ce document décrit la plateforme **visée**. L'état réel de chaque fonctionnalité est suivi dans [AUDIT_REPORT.md](AUDIT_REPORT.md).

## 1. Mission principale

Tu interviens comme architecte logiciel senior, ingénieur en cybersécurité, développeur full-stack, spécialiste UX/UI et expert en plateformes de recrutement et d’évaluation technique.

Je développe actuellement SankoTalent, une plateforme professionnelle appartenant à SANKOVEYA Technologies, destinée à identifier, évaluer, sélectionner et mettre en relation les talents informatiques avec les entreprises en République démocratique du Congo.

Une grande partie de la simulation et de l’application existe déjà.

Ne recommence pas le projet à zéro.

Ta mission consiste à :

* Examiner intégralement le projet existant.
* Analyser le code source, les interfaces, les fonctionnalités et les données.
* Comparer l’existant avec cette documentation.
* Identifier les fonctionnalités terminées, partielles, manquantes ou défectueuses.
* Compléter progressivement les fonctionnalités manquantes.
* Préserver les fonctionnalités existantes qui fonctionnent correctement.
* Transformer progressivement la simulation en une véritable plateforme opérationnelle, professionnelle et sécurisée.

## 2. Identité de l’entreprise

* Entreprise : SANKOVEYA Technologies.
* Application : SankoTalent.
* Domaine : sankoveya.com.
* Courriel principal : contact@sankoveya.com.
* Courriel commercial : business@sankoveya.com.
* Assistance technique : support@sankoveya.com.
* Marché principal : République démocratique du Congo.
* Langues : français et anglais.
* Couverture géographique : Kinshasa, Lubumbashi, Kolwezi et progressivement toutes les provinces de la RDC.

La plateforme doit s’inspirer du professionnalisme des plateformes telles que LinkedIn, Indeed, HackerRank, Codility et TestGorilla, tout en étant adaptée aux réalités du marché congolais.

## 3. Objectifs de la plateforme

La plateforme doit permettre de :

* Identifier les talents informatiques compétents.
* Vérifier leurs compétences réelles.
* Réduire les fausses déclarations de compétences.
* Organiser des évaluations techniques sécurisées.
* Organiser des entretiens professionnels.
* Constituer une base de talents qualifiés.
* Mettre les entreprises en relation avec des professionnels présélectionnés.
* Faciliter l’accès aux stages et aux premières expériences professionnelles.
* Valoriser les compétences pratiques au-delà des diplômes.

## 4. Catégories d’utilisateurs

Prévoir les espaces suivants :

1. Candidat professionnel.
2. Étudiant.
3. Stagiaire.
4. Entreprise partenaire.
5. Recruteur.
6. Évaluateur technique.
7. Surveillant d’examen.
8. Administrateur.
9. Super-administrateur.

Chaque catégorie doit disposer de permissions spécifiques et d’un tableau de bord adapté.

## 5. Spécialités informatiques

La plateforme doit initialement couvrir six grandes spécialités :

* Network Engineering — Réseaux informatiques.
* Cybersecurity — Cybersécurité.
* IT Support — Assistance informatique.
* Systems Administration — Administration des systèmes.
* Software Development — Développement logiciel.
* Cloud Computing — Informatique en nuage.

Prévoir une architecture permettant d’ajouter ultérieurement d’autres spécialités, notamment DevOps, Data Engineering, Database Administration, Intelligence artificielle et gestion de projets informatiques.

## 6. Inscription et profil du candidat

Le candidat doit pouvoir créer un compte et renseigner :

* Nom et prénom.
* Adresse électronique.
* Numéro de téléphone.
* Ville et province.
* Pays de résidence.
* Niveau d’études.
* Établissement fréquenté.
* Année d’études.
* Diplômes obtenus.
* Certifications professionnelles.
* Spécialité informatique.
* Années d’expérience.
* Compétences techniques.
* Langues parlées.
* Disponibilité professionnelle.
* CV au format PDF.
* Portfolio.
* Profil GitHub.
* Profil LinkedIn.
* Projets personnels ou professionnels.
* Vidéo de présentation.

Prévoir la vérification du courriel, la récupération du mot de passe et la modification sécurisée du profil.

Le candidat doit pouvoir enregistrer un dossier incomplet et le terminer ultérieurement.

## 7. Processus complet de recrutement

Le processus doit suivre les étapes suivantes :

1. Création du compte.
2. Vérification du courriel.
3. Remplissage du profil.
4. Soumission de la candidature.
5. Vérification administrative.
6. Présélection.
7. Invitation au test technique.
8. Vérification des conditions de passage du test.
9. Examen technique sécurisé.
10. Analyse des résultats.
11. Vidéo de présentation.
12. Entretien technique.
13. Entretien professionnel.
14. Validation humaine finale.
15. Intégration dans la base des talents qualifiés.
16. Mise en relation avec les entreprises.
17. Suivi professionnel.

Le candidat doit pouvoir consulter l’état de sa candidature depuis son tableau de bord.

## 8. Système d’évaluation technique

Créer un véritable moteur d’évaluation configurable selon la spécialité et le niveau du candidat.

Niveaux :

* Beginner.
* Intermediate.
* Advanced.
* Expert.

Types de questions :

* Questions à choix unique.
* Questions à choix multiples.
* Vrai ou faux.
* Questions ouvertes.
* Études de cas.
* Analyse de configurations.
* Analyse de journaux système.
* Exercices de programmation.
* Résolution de problèmes techniques.
* Simulations pratiques.

Fonctionnalités indispensables :

* Banque de questions.
* Sélection aléatoire des questions.
* Mélange des réponses.
* Chronomètre.
* Sauvegarde automatique.
* Soumission automatique à la fin du temps autorisé.
* Correction automatique lorsque possible.
* Correction manuelle des exercices complexes.
* Historique des tentatives.
* Gestion des versions des examens.
* Barème configurable.
* Seuil de réussite configurable.
* Rapports détaillés des résultats.
* Possibilité de programmer une nouvelle tentative.

Les réponses correctes ne doivent jamais être transmises au navigateur du candidat pendant l’examen.

## 9. Contenu des examens par spécialité

### Network Engineering

* Modèle OSI et TCP/IP.
* IPv4 et IPv6.
* Subnetting.
* VLAN.
* Trunk.
* Routage statique et dynamique.
* OSPF.
* DHCP.
* DNS.
* NAT.
* ACL.
* VPN.
* GRE.
* Diagnostic réseau.
* Analyse de configurations Cisco.
* Wireshark.
* Simulation de pannes réseau.

### Cybersecurity

* Principes de sécurité informatique.
* Gestion des identités et des accès.
* Pare-feu.
* Sécurité réseau.
* Analyse de journaux.
* Détection des menaces.
* Gestion des vulnérabilités.
* Réponse aux incidents.
* Cryptographie.
* Sécurité des systèmes.
* Phishing.
* Analyse de scénarios de sécurité dans des environnements autorisés.

### IT Support

* Diagnostic matériel.
* Diagnostic logiciel.
* Windows, Linux et macOS.
* Installation de logiciels.
* Gestion des incidents.
* Configuration des imprimantes.
* Assistance à distance.
* Résolution des problèmes réseau.
* Gestion des tickets.
* Service à la clientèle.

### Systems Administration

* Windows Server.
* Linux.
* Active Directory.
* Group Policy.
* DNS et DHCP.
* PowerShell.
* Bash.
* Gestion des utilisateurs.
* Permissions.
* Virtualisation.
* Hyper-V.
* Sauvegarde et restauration.
* Gestion des services.

### Software Development

* Logique de programmation.
* Algorithmique.
* HTML et CSS.
* JavaScript et TypeScript.
* Python.
* SQL.
* API REST.
* Git et GitHub.
* Débogage.
* Développement web et mobile.
* Tests logiciels.
* Sécurité du code.

### Cloud Computing

* Concepts du cloud.
* Microsoft Azure.
* AWS.
* Google Cloud.
* Machines virtuelles.
* Stockage.
* Réseaux cloud.
* IAM.
* Conteneurs.
* Docker.
* Kubernetes.
* Surveillance des infrastructures.
* Sécurité cloud.

Les questions doivent être originales, pertinentes et adaptées aux compétences réellement recherchées par les entreprises.

## 10. Navigateur sécurisé pour les examens

Développer un environnement d’examen sécurisé permettant de réduire les possibilités de fraude.

Étudier notamment l’intégration de Safe Exam Browser ou d’une solution équivalente compatible avec l’architecture existante.

Le mode examen doit, selon les capacités techniques du navigateur ou du logiciel utilisé :

* Exiger le plein écran.
* Détecter les changements d’onglet.
* Détecter la perte de focus.
* Détecter la sortie du plein écran.
* Restreindre le copier-coller.
* Restreindre l’impression.
* Limiter l’accès aux ressources externes non autorisées.
* Enregistrer les tentatives de navigation hors de l’examen.
* Détecter certaines interruptions de session.
* Limiter les applications externes lorsque le système sécurisé le permet.
* Empêcher les connexions simultanées au même examen.
* Prévenir le candidat lorsqu’un événement suspect est détecté.
* Enregistrer les incidents dans un journal horodaté.

Un navigateur web classique ne permet pas de bloquer intégralement les autres applications, les captures d’écran ou les outils externes. Ne pas prétendre que ces restrictions sont garanties si elles ne sont pas techniquement possibles.

Prévoir un mode d’examen standard et un mode d’examen renforcé.

## 11. Surveillance par caméra et microphone

Créer un système de surveillance d’examen à distance, également appelé remote proctoring.

Avant l’examen :

* Présenter les règles.
* Informer le candidat des données collectées.
* Obtenir son accord lorsque requis.
* Vérifier la caméra.
* Vérifier le microphone.
* Vérifier la connexion Internet.
* Vérifier la compatibilité du navigateur.
* Vérifier les conditions techniques de passage de l’examen.
* Permettre un test de fonctionnement avant l’évaluation.

Pendant l’examen :

* Maintenir la surveillance selon les règles annoncées.
* Détecter l’interruption de la caméra.
* Signaler une absence prolongée du candidat.
* Signaler la présence éventuelle d’une autre personne.
* Signaler les interruptions inhabituelles.
* Enregistrer les événements pertinents.
* Permettre une surveillance humaine lorsque nécessaire.
* Permettre au candidat de signaler un problème technique.

Utiliser WebRTC ou une technologie adaptée pour la communication vidéo.

L’analyse automatisée doit uniquement produire des signalements nécessitant une vérification humaine.

Ne jamais considérer automatiquement un mouvement des yeux, un bruit, une absence momentanée ou un problème de connexion comme une preuve de fraude.

Ne pas utiliser la reconnaissance des émotions ou des caractéristiques personnelles pour évaluer les candidats.

## 12. Système anti-triche

Prévoir un moteur de gestion des incidents avec trois niveaux indicatifs :

* Niveau 1 : événement mineur.
* Niveau 2 : événement nécessitant une vérification.
* Niveau 3 : incident potentiellement grave nécessitant une intervention.

Exemples d’événements :

* Changement d’onglet.
* Sortie du plein écran.
* Interruption de la caméra.
* Connexion simultanée.
* Tentative de copier-coller.
* Déconnexion répétée.
* Présence éventuelle d’une autre personne.
* Tentative d’accès à une ressource non autorisée.

Chaque événement doit contenir :

* Identifiant du candidat.
* Identifiant de l’examen.
* Date et heure.
* Type d’événement.
* Durée.
* Niveau indicatif.
* Informations techniques disponibles.
* Statut de vérification.
* Commentaire de l’évaluateur.

Prévoir un processus de contestation permettant au candidat d’expliquer un incident.

Aucune exclusion définitive ne doit être prononcée uniquement par un algorithme.

## 13. Simulations et laboratoires techniques

La plateforme doit progressivement permettre aux candidats de démontrer leurs compétences dans des environnements pratiques.

Exemples :

* Terminal Linux simulé.
* Terminal Cisco simulé.
* Console PowerShell.
* Éditeur de code.
* Environnement SQL.
* Simulation Active Directory.
* Simulation de configuration réseau.
* Diagnostic d’une panne informatique.
* Analyse de journaux de sécurité.
* Simulation d’une infrastructure cloud.
* Simulation d’un ticket d’assistance informatique.

Pour les environnements exécutant réellement du code, prévoir une isolation stricte, des limites de ressources, des délais d’exécution et des restrictions réseau.

Ne jamais exécuter directement le code non fiable des candidats sur le serveur principal.

## 14. Vidéo de présentation

Après la présélection ou l’évaluation technique, le candidat doit pouvoir enregistrer ou téléverser une vidéo professionnelle.

La vidéo doit permettre au candidat de présenter :

* Son parcours.
* Sa formation.
* Sa spécialité.
* Ses compétences.
* Ses projets.
* Son expérience.
* Ses motivations.
* Ses objectifs professionnels.

Prévoir :

* Enregistrement depuis le navigateur.
* Téléversement d’un fichier vidéo.
* Prévisualisation.
* Possibilité de recommencer avant la soumission.
* Compression adaptée.
* Stockage privé.
* Accès limité aux personnes autorisées.

## 15. Système d’entretien professionnel

Créer un module complet de gestion des entretiens.

Prévoir trois catégories :

### Entretien de présélection

Évaluer le parcours, la motivation, la disponibilité et la cohérence de la candidature.

### Entretien technique

Évaluer la compréhension des concepts, les compétences pratiques, la résolution de problèmes et la capacité à expliquer une solution.

### Entretien professionnel

Évaluer la communication, la collaboration, l’organisation, le professionnalisme et les attentes professionnelles.

Fonctionnalités :

* Planification des entretiens.
* Sélection de la date et de l’heure.
* Invitation par courriel.
* Confirmation du candidat.
* Rappels automatiques.
* Salle d’attente virtuelle.
* Appel vidéo.
* Partage d’écran avec autorisation.
* Messagerie.
* Notes privées du recruteur.
* Grille d’évaluation.
* Rapport d’entretien.
* Décision finale.
* Enregistrement uniquement lorsque justifié et annoncé.

## 16. Simulation d’entretien pour les candidats

Créer un mode d’entraînement distinct des entretiens officiels.

Le candidat doit pouvoir :

* Choisir sa spécialité.
* Choisir son niveau.
* Choisir le français ou l’anglais.
* Répondre à des questions techniques.
* Répondre à des questions comportementales.
* S’entraîner avec un chronomètre.
* Recevoir des questions complémentaires.
* Obtenir une correction.
* Identifier ses points faibles.
* Refaire les exercices.
* Consulter sa progression.

Une intelligence artificielle peut assister la simulation en jouant le rôle d’un recruteur ou d’un évaluateur technique.

Les résultats d’entraînement ne doivent pas être confondus avec les résultats des évaluations officielles.

## 17. Système de notation

Proposition de barème initial, modifiable par l’administration :

* Test théorique : 25 points.
* Test pratique : 35 points.
* Entretien technique : 20 points.
* Entretien professionnel : 15 points.
* Portfolio et projets : 5 points.

Total : 100 points.

Classification indicative :

* 90 à 100 : Excellent.
* 80 à 89 : Très bon.
* 70 à 79 : Bon.
* 60 à 69 : À renforcer.
* Moins de 60 : Niveau insuffisant pour le seuil proposé.

Les critères doivent être transparents, liés aux compétences professionnelles et adaptés à chaque poste.

Les incidents anti-triche doivent être examinés séparément et ne doivent pas entraîner une pénalité automatique injustifiée.

## 18. Tableau de bord du candidat

Afficher :

* Profil.
* Pourcentage de complétion du dossier.
* État de la candidature.
* Tests disponibles.
* Tests terminés.
* Résultats autorisés à la consultation.
* Entretiens programmés.
* Notifications.
* Documents.
* Recommandations de formation.
* Historique.
* Opportunités professionnelles.
* Offres de stage.
* Paramètres de confidentialité.

## 19. Tableau de bord administratif

L’administration doit pouvoir consulter une fiche complète pour chaque candidat, regroupant :

* Informations personnelles.
* CV.
* Formation.
* Certifications.
* Portfolio.
* Projets.
* Résultats théoriques.
* Résultats pratiques.
* Vidéo de présentation.
* Incidents de surveillance.
* Rapports d’entretien.
* Notes des évaluateurs.
* Décision finale.
* Historique des modifications.

Prévoir également :

* Gestion des utilisateurs.
* Gestion des examens.
* Gestion des questions.
* Gestion des spécialités.
* Gestion des évaluateurs.
* Gestion des entreprises.
* Gestion des entretiens.
* Statistiques.
* Recherche et filtrage.
* Exportation des rapports.
* Journal d’audit.
* Gestion des autorisations.

## 20. Espace entreprise

Les entreprises partenaires doivent pouvoir :

* Créer un profil professionnel.
* Soumettre leurs besoins en recrutement.
* Publier des opportunités.
* Rechercher des talents qualifiés.
* Filtrer par spécialité, niveau, expérience et localisation.
* Consulter les profils autorisés.
* Présélectionner des candidats.
* Demander un entretien.
* Communiquer avec SANKOVEYA.
* Suivre leurs demandes.

Les entreprises ne doivent pas accéder automatiquement aux enregistrements de surveillance, aux documents confidentiels ou aux informations personnelles non nécessaires au recrutement.

## 21. Programme de stages

Prévoir un parcours spécifique pour les étudiants et les jeunes diplômés.

Ce programme doit permettre :

* L’inscription des étudiants.
* L’évaluation des compétences de base.
* L’identification des besoins de formation.
* L’accompagnement par des professionnels expérimentés.
* L’affectation à des projets.
* Le suivi des présences.
* L’évaluation de la progression.
* La production de rapports de stage.
* La validation des compétences acquises.

Prévoir également la gestion des éventuelles allocations de transport et de repas selon les conditions définies par SANKOVEYA.

## 22. Architecture des données

Examiner les modèles existants avant de créer de nouvelles structures.

Prévoir notamment les entités suivantes :

* Users
* Roles
* Permissions
* Candidates
* CandidateProfiles
* Education
* Certifications
* Skills
* Specializations
* Applications
* Documents
* Companies
* JobOffers
* Exams
* Questions
* ExamAttempts
* Answers
* PracticalLabs
* ExamResults
* ProctoringSessions
* ProctoringEvents
* Interviews
* InterviewEvaluations
* Videos
* Notifications
* Internships
* AuditLogs
* ConsentRecords
* Appeals

Définir les relations, les contraintes, les index, les migrations et les règles d’accès nécessaires.

Éviter la duplication des données et préserver les données existantes.

## 23. Sécurité informatique

Mettre en place progressivement :

* HTTPS.
* Authentification sécurisée.
* Authentification multifacteur pour les administrateurs.
* Gestion des rôles et permissions.
* Hachage sécurisé des mots de passe.
* Validation des données côté serveur.
* Protection contre les injections SQL.
* Protection contre XSS et CSRF.
* Limitation des requêtes.
* Protection des API.
* Gestion sécurisée des sessions.
* Chiffrement des données sensibles.
* Stockage privé des documents et vidéos.
* Sauvegardes.
* Procédures de restauration.
* Journalisation des accès.
* Gestion des secrets par variables d’environnement.
* Analyse des dépendances.
* Tests de sécurité.

Ne jamais publier de mots de passe, clés API, données personnelles, résultats confidentiels ou documents de candidats dans un dépôt GitHub public.

## 24. Confidentialité et protection des candidats

Prévoir :

* Politique de confidentialité.
* Conditions générales d’utilisation.
* Règlement des examens.
* Information relative à la surveillance.
* Gestion des autorisations.
* Durée de conservation des données.
* Suppression des comptes.
* Accès et rectification des informations.
* Procédure de contestation.
* Accès restreint aux vidéos.
* Journalisation des consultations sensibles.
* Aménagements raisonnables pour les candidats ayant des besoins particuliers.

Vérifier les obligations juridiques applicables avant le déploiement réel.

Ne pas collecter davantage de données que nécessaire.

## 25. Adaptation aux réalités de la RDC

La plateforme doit fonctionner dans des conditions de connexion Internet variables.

Prévoir :

* Interface légère.
* Compression des images.
* Compression des vidéos.
* Chargement progressif.
* Sauvegarde automatique.
* Reprise sécurisée après une interruption.
* Messages d’erreur compréhensibles.
* Compatibilité avec différents appareils.
* Optimisation pour les connexions mobiles.
* Procédure alternative pour les candidats ne disposant pas des équipements nécessaires à un examen surveillé.

Une mauvaise connexion Internet ne doit pas être automatiquement interprétée comme une tentative de fraude.

## 26. Application mobile SankoTalent

Analyser l’intégration avec le dépôt existant :

https://github.com/kevinmayele/sankotalent-data

Source JSON publique existante :

https://raw.githubusercontent.com/kevinmayele/sankotalent-data/main/talents.json

Vérifier notamment :

* Chargement distant des données.
* Actualisation des profils.
* Bouton de rafraîchissement.
* Date de dernière mise à jour.
* Gestion des erreurs réseau.
* Cache local.
* Fonctionnement hors connexion.
* Affichage bilingue.
* Navigation entre les spécialités.
* Affichage des photos.
* Cohérence entre le site web et l’application mobile.

Le dépôt public doit rester réservé aux données de démonstration ou aux informations explicitement destinées à être publiques.

Pour la production, utiliser une API sécurisée et une base de données privée pour les véritables dossiers des candidats.

## 27. Design et expérience utilisateur

Conserver l’identité visuelle existante si elle est cohérente.

L’interface doit être :

* Moderne.
* Professionnelle.
* Responsive.
* Accessible.
* Rapide.
* Bilingue.
* Cohérente.
* Adaptée aux ordinateurs, tablettes et téléphones.

Éviter les interfaces surchargées, les textes génériques et les fonctionnalités purement décoratives qui ne fonctionnent pas réellement.

## 28. Notifications et communications

Prévoir des notifications pour :

* Confirmation d’inscription.
* Candidature reçue.
* Dossier incomplet.
* Présélection.
* Invitation à un test.
* Rappel d’examen.
* Confirmation de soumission.
* Invitation à un entretien.
* Rappel d’entretien.
* Résultat disponible.
* Décision finale.
* Nouvelle opportunité professionnelle.

Prévoir des modèles professionnels en français et en anglais.

## 29. Calendrier du projet

Objectifs initiaux :

* Avant avril 2027 : plateforme prête pour le lancement.
* Avril 2027 : ouverture des candidatures.
* Avril à juin 2027 : évaluation et sélection des talents.
* Mai à juin 2027 : démarrage progressif des activités opérationnelles.

Organiser les priorités de développement en fonction de ces échéances.

## 30. Audit obligatoire du projet existant

Avant toute modification importante, inspecter :

* L’arborescence du projet.
* Le frontend.
* Le backend.
* Les API.
* La base de données.
* L’authentification.
* Les dépendances.
* Les interfaces.
* Les boutons.
* Les formulaires.
* Les simulations.
* Les examens.
* Les entretiens.
* Les configurations de sécurité.
* Les dépôts GitHub associés.
* Les fonctionnalités réellement opérationnelles.

Produire un tableau contenant :

Fonctionnalité	État actuel	Élément manquant	Priorité	Action nécessaire

Utiliser les statuts suivants :

* TERMINÉ.
* PARTIELLEMENT TERMINÉ.
* SIMULATION UNIQUEMENT.
* NON IMPLÉMENTÉ.
* À CORRIGER.
* À TESTER.
* À SÉCURISER.

Ne jamais déclarer une fonctionnalité terminée sans avoir vérifié son fonctionnement.

## 31. Ordre de priorité

### P0 — Indispensable

* Authentification.
* Base de données.
* Gestion des candidats.
* Soumission des candidatures.
* Moteur d’examen.
* Sauvegarde des réponses.
* Sécurité.
* Gestion des résultats.
* Administration.

### P1 — Évaluation professionnelle

* Navigateur sécurisé.
* Surveillance par caméra.
* Gestion des incidents.
* Laboratoires pratiques.
* Vidéo de présentation.
* Entretiens techniques.
* Entretiens professionnels.
* Simulation d’entretien.

### P2 — Développement commercial

* Espace entreprise.
* Recherche de talents.
* Gestion des offres.
* Mise en relation.
* Programme de stages.
* Rapports et statistiques.

### P3 — Améliorations

* Intelligence artificielle d’assistance.
* Recommandations personnalisées.
* Automatisation avancée.
* Intégrations externes.
* Optimisation des performances.

## 32. Documentation à produire

Créer ou compléter, selon la structure existante :

* README.md
* docs/PROJECT_OVERVIEW.md
* docs/FUNCTIONAL_REQUIREMENTS.md
* docs/TECHNICAL_ARCHITECTURE.md
* docs/DATABASE_SCHEMA.md
* docs/API_DOCUMENTATION.md
* docs/EXAM_ENGINE.md
* docs/SECURE_EXAM_BROWSER.md
* docs/PROCTORING.md
* docs/ANTI_CHEATING.md
* docs/INTERVIEW_SYSTEM.md
* docs/PRACTICAL_LABS.md
* docs/SECURITY.md
* docs/PRIVACY.md
* docs/DEPLOYMENT.md
* docs/TESTING.md
* docs/ROADMAP.md
* docs/AUDIT_REPORT.md
* CHANGELOG.md

La documentation doit refléter le fonctionnement réel du projet et distinguer les fonctionnalités existantes des fonctionnalités futures.

## 33. Instructions finales de développement

Ne pas supprimer les fonctionnalités existantes sans justification.

Ne pas modifier inutilement le design actuel.

Ne pas remplacer une fonctionnalité opérationnelle par une simple simulation.

Ne pas inventer des résultats de tests.

Ne pas introduire de données personnelles réelles dans les démonstrations.

Ne pas effectuer de déploiement public non autorisé.

Travailler par étapes, tester chaque modification et documenter les changements.

Commence immédiatement par analyser mon projet actuel et comparer chaque fonctionnalité avec cette documentation.

Présente-moi ensuite :

1. Ce qui existe déjà.
2. Ce qui fonctionne réellement.
3. Ce qui est uniquement simulé.
4. Ce qui manque.
5. Ce qui présente un risque de sécurité.
6. Ce qui doit être corrigé.
7. Les fichiers concernés.
8. Le plan de développement restant.
9. Le pourcentage d’avancement vérifiable, si les éléments disponibles permettent de le calculer.
10. Les décisions nécessitant mon autorisation.

Après cet audit, commence à compléter les fonctionnalités manquantes qui ne nécessitent pas de décision supplémentaire, sans recommencer le projet à zéro.

L’objectif final est de disposer d’une plateforme de recrutement informatique professionnelle, sécurisée, évolutive et réellement utilisable par SANKOVEYA Technologies.

---

Ces sections complètent les sections 1 à 33. Elles suivent les mêmes règles : ne rien présenter comme terminé sans l'avoir vérifié, distinguer clairement le réel du simulé, et ne publier aucune donnée réelle dans un dépôt public.

---

## 34. Paiements des entreprises

### 34.1 Principe

Une entreprise qui a un besoin informatique crée un compte, décrit sa demande, puis paie. Cette demande peut porter sur une panne, un projet, un recrutement ou une mission. Le paiement suit la demande à chaque étape, jusqu'au versement au professionnel qui a réalisé le travail.

Les montants définitifs seront fixés plus tard par SANKOVEYA. **Pour l'instant, la plateforme fonctionne en mode simulation** : les montants viennent d'une grille de tarifs configurable, et aucun argent réel ne circule.

### 34.2 Deux types de demandes

| Type | Exemple | Délai | Mode de paiement |
|---|---|---|---|
| **Urgente** | Serveur en panne, réseau coupé, attaque informatique en cours | Intervention dans les heures qui suivent | Paiement immédiat et complet avant l'intervention, avec un supplément d'urgence configurable |
| **Projet à long terme** | Installation d'un réseau d'entreprise, migration vers le cloud, développement d'une application | Plusieurs semaines ou mois | Paiement par jalons : acompte au démarrage, puis un versement à chaque étape validée |

### 34.3 Étapes d'une demande et circulation de l'argent

1. **Demande soumise** : l'entreprise choisit le service, le niveau d'urgence, la ville et décrit le problème.
2. **Devis** : le montant est calculé automatiquement selon la grille (service, urgence, durée, ville), puis ajusté si besoin par un administrateur.
3. **Acceptation du devis** par l'entreprise.
4. **Paiement** : complet pour une urgence, acompte pour un projet.
5. **Fonds réservés** : l'argent est enregistré comme reçu mais pas encore versé au professionnel.
6. **Affectation** d'un professionnel qualifié de la base des talents.
7. **Intervention ou réalisation du jalon.**
8. **Validation** par l'entreprise. Sans réponse dans un délai configurable, la validation est automatique.
9. **Versement au professionnel**, moins la commission de SANKOVEYA. Ce versement demande une **double autorisation** (voir section 37).
10. **Facture et reçu** envoyés automatiquement en français ou en anglais.
11. **Litige** possible à chaque étape, avec gel des fonds jusqu'à la décision d'un administrateur.

L'entreprise, le professionnel et l'administration voient à tout moment l'état de la demande et de l'argent.

### 34.4 Moyens de paiement à prévoir (marché RDC)

Il faut prévoir l'argent mobile (Mobile Money) des principaux opérateurs présents en RDC, ainsi que la carte bancaire et le virement pour les entreprises. L'agrégateur de paiement sera choisi plus tard : il faudra comparer les solutions disponibles en RDC sur les frais, les devises (CDF et USD) et la fiabilité.

### 34.5 Règles de sécurité des paiements

- La plateforme ne voit, ne transmet et ne stocke **jamais** un numéro de carte : la saisie se fait sur la page sécurisée du prestataire de paiement.
- Un paiement n'est confirmé que par une **notification signée** du prestataire, vérifiée sur le serveur. Une confirmation envoyée par le téléphone ou le navigateur ne compte jamais.
- Chaque paiement porte un identifiant unique (idempotence) pour empêcher les doubles débits.
- Chaque mouvement d'argent est inscrit dans un journal comptable qu'on ne peut pas modifier, seulement compléter par une écriture de correction.
- Les remboursements et les versements sont soumis à la double autorisation.
- Le mode simulation est clairement affiché à l'écran (« Paiement de démonstration »), pour qu'aucun utilisateur ne croie avoir réellement payé.

### 34.6 Entités de données ajoutées

ServiceRequests, ServiceCatalog, PriceGrid, Quotes, Milestones, Payments, PaymentEvents, Escrows (fonds réservés), Payouts, Invoices, Refunds, Disputes, LedgerEntries.

---

## 35. Paiement et suivi des formations

### 35.1 Parcours de l'apprenant

1. Choix de la formation dans le catalogue.
2. Choix de la session : dates, format (en ligne, présentiel ou hybride) et **lieu**, c'est-à-dire le centre de formation, la ville et l'adresse affichée sur une carte.
3. Inscription.
4. **Paiement** des frais de formation, avec le même système et les mêmes règles que la section 34 (simulé pour l'instant). Le paiement en plusieurs fois est possible si SANKOVEYA l'autorise.
5. Confirmation et accès au contenu.
6. Suivi des présences.
7. **Notes** : travaux, laboratoires, examens blancs, avec une note finale.
8. **Préparation à la certification** : examens blancs chronométrés pour chaque certification visée (CCNA, Security+, A+, AZ-104, Linux, etc.), avec un résultat par domaine pour repérer les points faibles.
9. **Attestation de réussite SANKOVEYA**, délivrée avec un code de vérification unique et un code QR. Une entreprise peut vérifier en ligne qu'une attestation est authentique.

### 35.2 Ce qu'il faut distinguer

L'attestation SANKOVEYA confirme qu'une formation a été suivie et réussie. Elle **ne remplace pas** les certifications officielles (Cisco, CompTIA, Microsoft), que l'apprenant passe auprès de l'organisme officiel. La plateforme enregistre ces certifications officielles comme des documents à vérifier par un administrateur.

### 35.3 Entités de données ajoutées

TrainingSessions, TrainingLocations, Enrollments, Attendance, Grades, PracticeExams, CertificationTracks, CompletionCertificates, ExternalCertifications.

---

## 36. Tests de sécurité et recherche de failles

L'objectif est de rendre l'application **très difficile à attaquer**. Aucune application n'est inattaquable : on applique plusieurs couches de protection, puis on cherche les failles avant les attaquants.

### 36.1 Tests à mener sur nos propres systèmes uniquement

- Vérification de chaque point de l'**OWASP ASVS** (référentiel de sécurité des applications) et de l'**OWASP Mobile Top 10** pour l'application mobile.
- Analyse automatique avec **OWASP ZAP** sur un environnement de test, jamais sur la production.
- Contrôle des dépendances à chaque mise à jour (`npm audit`, alertes GitHub Dependabot).
- Recherche de secrets oubliés dans le code avant chaque publication.
- Tests manuels des cas d'attaque classiques :
  - injection SQL ;
  - XSS ;
  - CSRF ;
  - contournement des rôles, par exemple un candidat qui ouvre une page d'administrateur ;
  - accès aux données d'un autre utilisateur en changeant un identifiant dans l'adresse ;
  - manipulation d'un montant de paiement ;
  - rejeu d'une notification de paiement ;
  - tentative de lire les bonnes réponses d'un examen.
- Test d'intrusion par un professionnel indépendant avant le lancement d'avril 2027.
- Plus tard, un programme de signalement de failles pour les chercheurs en sécurité.

Ces tests se font uniquement sur les systèmes de SANKOVEYA, dans un environnement prévu pour cela, et chaque résultat est consigné dans `docs/TESTING.md` et `docs/SECURITY.md`.

### 36.2 Correction des bogues

Chaque faille ou bogue trouvé reçoit un niveau de gravité (critique, élevé, moyen, faible) et un délai de correction. Un test automatique empêche ensuite le retour du même bogue. Une faille critique bloque toute mise en production tant qu'elle n'est pas corrigée.

---

## 37. Double contrôle des autorisations

### 37.1 Double authentification (MFA)

| Rôle | MFA |
|---|---|
| Super-administrateur, administrateur, évaluateur, surveillant | Obligatoire |
| Entreprise, recruteur | Obligatoire avant tout paiement ou consultation de profils |
| Candidat, étudiant, stagiaire | Proposée, recommandée |

La MFA se fait par une application d'authentification ou une clé de sécurité. Le SMS ne sert qu'en secours, car il est moins sûr.

### 37.2 Principe des quatre yeux

Certaines actions sensibles demandent **deux personnes différentes** : la première prépare l'action, la seconde l'approuve. Une même personne ne peut jamais faire les deux.

- Versement d'argent à un professionnel.
- Remboursement.
- Modification d'un montant ou d'une grille de tarifs.
- Décision finale d'admission d'un candidat dans la base des talents.
- Annulation d'un résultat d'examen.
- Attribution ou retrait d'un rôle d'administrateur.
- Suppression d'un compte ou export massif de données.

Chaque demande et chaque approbation sont inscrites dans le journal d'audit, avec l'auteur, la date, l'adresse IP et le motif.

### 37.3 Autres protections

- Sessions courtes pour les administrateurs.
- Nouvelle saisie du mot de passe ou de la MFA avant une action sensible.
- Alerte en cas de connexion depuis un nouvel appareil.
- Blocage progressif après plusieurs échecs de connexion.
- Principe du moindre privilège : chaque rôle n'accède qu'à ce dont il a besoin.

---

## 38. Ajouts à l'ordre de priorité (section 31)

| Priorité | Ajout |
|---|---|
| P0 | Double authentification et principe des quatre yeux ; journal d'audit ; tests de sécurité de base (OWASP, dépendances, secrets) |
| P1 | Demandes des entreprises et paiements **en mode simulation** ; inscription et paiement des formations en simulation ; notes et examens blancs |
| P2 | Branchement d'un vrai prestataire de paiement ; versements aux professionnels ; factures ; attestations avec code QR ; test d'intrusion indépendant |
| P3 | Programme de signalement de failles ; paiement en plusieurs fois |

### Décisions qui demandent l'autorisation de SANKOVEYA

1. Les montants réels de la grille de tarifs et le taux de commission.
2. Le choix du prestataire de paiement et des devises (CDF, USD).
3. Le fait de garder l'argent avant de le verser au professionnel (fonds réservés). Ce point peut être encadré par la réglementation financière de la RDC et doit être vérifié avec un juriste ou un comptable avant d'utiliser de l'argent réel.
4. Le budget et le choix du professionnel qui fera le test d'intrusion indépendant.

---

Analyse des plateformes comparables, manques propres à la RD Congo et direction visuelle. Recherche effectuée le 26 novembre 2026. Les chiffres cités ont une source ; ils doivent être revérifiés avant d'être utilisés dans un document public ou une présentation à des investisseurs.

---

## 39. Ce que font les plateformes comparables

### 39.1 Plateformes internationales et africaines

| Plateforme | Ce qu'elle fait | Ce que SankoTalent doit en retenir |
|---|---|---|
| **Andela** (talents africains, puis mondiaux) | Sélection en plusieurs étapes : test d'anglais, exercices de code, entretien technique en direct. Elle annonce n'admettre qu'environ 7 % des candidats. Les entreprises peuvent revoir les tests de code de chaque candidat. Recrutement, gestion et paiement des talents sur une seule plateforme. | Sélection exigeante et transparente ; **revoir le test étape par étape** est un argument fort pour les entreprises ; garder le paiement dans la plateforme. |
| **Gebeya** (Éthiopie, panafricaine) | Rapprochement automatique selon la localisation, la langue et le budget. Elle vise une intégration d'un talent en 24 heures. Son idée de départ : l'Afrique ne manque pas de talents, elle manque de mise en relation. | **Score de correspondance** entre une demande et un talent ; inscription rapide ; même discours fondateur que SANKOVEYA. |
| **TestGorilla** (tests avant embauche) | Photos webcam avec permission, détection du plein écran, suivi de l'adresse IP, blocage du copier-coller. Les signaux sont regroupés en trois niveaux de risque, et la plateforme ne qualifie jamais un candidat de tricheur, car l'intention ne se prouve pas. | Confirme les sections 11 et 12 : trois niveaux, décision humaine, vocabulaire neutre (« signal », jamais « fraude »). |
| **HackerRank** (évaluation des développeurs) | Certifications de compétences gratuites et standardisées, que le candidat peut repasser ; détection de plagiat ; connexion aux logiciels de recrutement des entreprises. | **Tests de certification gratuits** pour attirer les talents ; règle de nouvelle tentative ; export vers les outils des entreprises. |
| **Upwork** (missions en freelance) | Argent déposé sur un compte séquestre avant chaque jalon ; libération automatique si le client ne répond pas ; délai court pour répondre à un litige, faute de quoi les fonds sont libérés ; arbitrage en dernier recours. Upwork exerce cette activité de séquestre sous agrément de l'État de Californie. | Valide le modèle de la section 34. Il confirme surtout que **garder l'argent d'autrui est une activité réglementée** : à vérifier en RDC avant tout paiement réel. |

### 39.2 Plateformes présentes en RD Congo

| Plateforme | Ce qu'elle fait | Position de SankoTalent |
|---|---|---|
| **ONEM — onem.cd et application MIKUBA** (Office national de l'emploi), lancées en juillet 2026 | Enregistrement des demandeurs d'emploi, centralisation des offres, base nationale des compétences, mise en relation avec les employeurs. | Ce n'est pas un concurrent direct : c'est un annuaire national généraliste. SankoTalent apporte ce que l'ONEM n'offre pas : **la preuve des compétences TI** par des tests surveillés. À terme, un **partenariat** est possible, par exemple la transmission des talents vérifiés. |
| **ExcelJob** (depuis 2021) | Mise en relation des entreprises et des talents ; publication d'offres et formations. | Site d'offres d'emploi généraliste, sans évaluation technique. |
| **Mediacongo, Radio Okapi, Indeed** (rubriques emploi) | Publication d'offres d'emploi. | Canaux de diffusion utiles pour annoncer les sessions de recrutement de SANKOVEYA. |
| **Orange Digital Center** (Kinshasa, Lubumbashi, Matadi, Kananga) | Formations numériques gratuites ; plus de 7 000 jeunes formés selon Orange RDC. | **Partenaire potentiel** : lieux d'examen surveillés, vivier de candidats, salles équipées. |

### 39.3 Constat

Aucune plateforme active en RDC ne combine les quatre briques de SankoTalent : **évaluation technique surveillée, formation certifiante, mise en relation et paiement de missions par Mobile Money.** C'est le positionnement à défendre.

---

## 40. Ce qui manque encore à la documentation

### 40.1 Fonctions vues chez les concurrents

1. **Score de correspondance expliqué.** Pour chaque demande d'entreprise, chaque talent reçoit un score (spécialité, niveau, ville, langue, disponibilité, budget) avec la raison affichée en clair, par exemple « Ville identique, niveau Intermédiaire validé, disponible le soir ».
2. **Badges de vérification sur le profil** : identité vérifiée, diplôme vérifié, certification officielle vérifiée, test SankoTalent réussi (avec le niveau), entretien réussi. Chaque badge indique la date et la personne qui l'a validé.
3. **Revoir un test** : l'entreprise autorisée revoit les réponses et le code du candidat, sans les données de surveillance (section 20).
4. **Tests de certification gratuits** par spécialité, accessibles sans payer, pour attirer les talents et alimenter la base.
5. **Évaluations après mission** : l'entreprise note le professionnel et le professionnel note l'entreprise. Les notes ne sont publiées qu'après la fin de la mission.
6. **Contrats et accords de confidentialité** générés pour chaque mission, avec acceptation électronique horodatée.
7. **Export et API** pour les grandes entreprises qui ont leur propre logiciel RH (P3).

### 40.2 Besoins propres à la RD Congo

**Connexion et électricité.** Fin 2026, environ 19,7 % de la population utilisait Internet. Seulement environ 19 % ont accès à l'électricité du réseau. La couverture 4G reste partielle. La plateforme doit donc :

- proposer un **mode économie de données** (images réduites, pas de vidéo automatique, pages légères) ;
- reprendre un examen exactement là où il s'est arrêté après une **coupure de courant ou de réseau**, avec le temps restant préservé et l'incident enregistré comme technique, pas comme suspect ;
- envoyer les notifications importantes par **SMS et WhatsApp** en plus du courriel, car beaucoup de candidats lisent peu leurs courriels ;
- proposer des **centres d'examen partenaires** (Orange Digital Center, universités, centres de formation) pour les candidats sans ordinateur, sans connexion stable ou sans électricité, avec un surveillant humain sur place. C'est la « procédure alternative » de la section 25, rendue concrète.

**Paiements.** Le marché repose sur quatre services de Mobile Money : M-Pesa (Vodacom), Airtel Money, Orange Money et Afrimoney. Le pays fonctionne en **double devise : dollar américain et franc congolais.** Il faut prévoir :

- l'affichage et le paiement en **USD ou en CDF**, au choix ;
- le parcours réel du Mobile Money : demande de paiement, **confirmation par le client sur son téléphone (code USSD)**, état « en attente », puis confirmation signée par le prestataire ;
- un agrégateur local qui regroupe les opérateurs sur une seule API. Des solutions comme MaxiCash, FlexPay ou Onafriq sont à comparer, sans en choisir une avant d'avoir comparé les frais et les contrats ;
- le **versement aux professionnels sur leur portefeuille Mobile Money**, pas seulement sur un compte bancaire ;
- la couverture par région : M-Pesa est plus présent à l'Est (Goma, Bukavu), Orange Money et Airtel Money à Kinshasa et à l'Ouest. Il faut tous les opérateurs pour couvrir le pays.

**Droit congolais des données personnelles.** Le **Code du numérique** (ordonnance-loi n° 23/010 du 13 mars 2023) encadre la protection des données. Il exige un consentement exprès et prévoit, selon les traitements, une **déclaration préalable ou une autorisation préalable** auprès de l'Autorité de protection des données (APD). L'APD n'est pas encore pleinement installée, et ses missions ont été confiées temporairement à l'ARPTIC, ce qui est contesté par certains juristes. À prévoir :

- désigner un **délégué à la protection des données** ;
- tenir le **registre des traitements** : candidats, vidéos, surveillance, paiements ;
- faire vérifier par un juriste congolais, avant avril 2027, les formalités à accomplir, en particulier pour la surveillance par caméra, qui touche à l'image et au comportement des personnes ;
- n'enregistrer, pour une pièce d'identité, que le **résultat de la vérification** (vérifiée oui ou non, par qui, quand), jamais une copie permanente sans nécessité.

**Confiance des entreprises.** Il faut vérifier que l'entreprise existe vraiment avant qu'elle publie une demande ou consulte des profils : numéro RCCM, identification nationale, personne de contact. On évite ainsi les fausses offres d'emploi, fréquentes dans la région.

**Inclusion.**
- Des **bourses de formation** financées par des entreprises partenaires, qui recrutent ensuite les lauréats.
- Un programme pour encourager les **femmes dans les TI**.
- Le travail **à distance** pour les talents de l'Est, où la situation sécuritaire limite les déplacements.

**Langues.** Le français et l'anglais restent les langues de la plateforme. Plus tard (P3), les notifications SMS et les messages d'aide pourront être proposés en **lingala et en swahili**, puis en tshiluba et en kikongo.

**Intervention urgente.** Pour les demandes urgentes de la section 34, il faut une **liste de garde** de techniciens vérifiés par ville, disponibles à des heures déclarées. La demande est proposée aux plus proches. Le premier qui accepte est affecté, et un délai maximal de réponse est fixé avant de passer au suivant.

**Observatoire des compétences et des salaires TI.** Avec des données agrégées et anonymes, SankoTalent peut publier chaque trimestre les compétences les plus demandées et les fourchettes de rémunération par spécialité et par ville. C'est une source de visibilité et de revenus (rapport payant pour les entreprises), à lancer seulement quand le volume de données le permet.

### 40.3 Entités de données ajoutées

MatchScores, VerificationBadges, MissionContracts, Reviews, CompanyVerifications, ExamCenters, ExamCenterSessions, OnCallRosters, Scholarships, NotificationChannels (courriel, SMS, WhatsApp), DataProcessingRegister, CurrencyRates.

---

## 41. Direction visuelle : un effet « waouh » qui reste rapide

L'objectif : quand une entreprise ou un candidat ouvre SankoTalent, la plateforme paraît **aussi soignée qu'une application internationale**. Elle doit rester légère, car la plupart des utilisateurs auront une connexion mobile limitée.

### 41.1 Identité

On garde le thème sombre « terminal » de l'application mobile (version 1.3) : fond bleu nuit avec motif discret, vert terminal pour l'action, une couleur par spécialité, polices Inter et JetBrains Mono. Le site web et l'application mobile doivent se ressembler. Un mode clair est proposé pour la lecture en plein soleil.

### 41.2 Graphiques et tableaux de bord

| Écran | Visualisation | Ce qu'elle montre |
|---|---|---|
| Tableau de bord du candidat | **Radar des compétences** (6 branches, une par spécialité) | Le niveau validé dans chaque domaine, comparé au niveau visé |
| Tableau de bord du candidat | **Anneau de progression** | Le pourcentage de complétion du dossier |
| Tableau de bord du candidat | **Frise des 17 étapes** du recrutement (section 7) | L'étape actuelle, en vert, et les suivantes |
| Résultat d'examen | Barres par thème (par exemple VLAN, OSPF, ACL) | Les points forts et les points à renforcer, avec la formation conseillée |
| Espace entreprise | **Carte de la RDC par province**, colorée selon le nombre de talents vérifiés | Où se trouvent les talents de la spécialité recherchée |
| Espace entreprise | Suivi d'une demande en étapes et suivi de l'argent | Où en est la mission et où en est le paiement |
| Administration | Entonnoir de recrutement (inscrits, dossiers complets, testés, admis) | Les étapes où les candidats abandonnent |
| Administration | Chiffres clés animés et courbes mensuelles | Inscriptions, examens, missions, revenus simulés |
| Formation | Courbe des examens blancs | La progression vers la certification visée |

### 41.3 Règles pour rester rapide

- Graphiques dessinés en SVG, sans grosse bibliothèque, et chargés seulement quand on ouvre l'écran.
- Squelettes de chargement (formes grises animées) plutôt que des écrans vides.
- Animations courtes (moins de 400 ms), désactivées si le téléphone demande moins d'animations.
- Couleurs testées pour le contraste (accessibilité) et jamais seules pour porter un sens : chaque couleur est accompagnée d'un texte ou d'une icône.

---

## 42. Mise à jour des priorités

| Priorité | Ajout |
|---|---|
| P0 | Vérification des entreprises ; reprise d'examen après coupure ; double devise USD et CDF ; registre des traitements et consentements |
| P1 | Score de correspondance ; badges de vérification ; notifications SMS et WhatsApp ; centres d'examen partenaires ; tableaux de bord graphiques du candidat et de l'administration ; mode économie de données |
| P2 | Liste de garde pour les urgences ; évaluations après mission ; contrats de mission ; carte des talents par province ; tests de certification gratuits ; bourses |
| P3 | Observatoire des salaires ; langues locales pour les notifications ; API pour les grandes entreprises ; partenariat de données avec l'ONEM |

### Nouvelles décisions qui demandent l'autorisation de SANKOVEYA

1. Approcher l'Orange Digital Center et des universités comme centres d'examen partenaires.
2. Consulter un juriste congolais sur deux points : les formalités du Code du numérique, et l'activité de fonds réservés (séquestre).
3. Choisir les canaux de notification payants (SMS, WhatsApp Business), qui ont un coût par message.
4. Contacter l'ONEM pour un partenariat éventuel.

---

Avis et satisfaction, transparence, fiches de paie automatiques, identifiants automatiques, badges numériques et lien avec LinkedIn.

---

## 43. Avis, commentaires et satisfaction

### 43.1 Qui donne un avis, et sur quoi

| Auteur | Sur quoi | Quand |
|---|---|---|
| Entreprise | Le professionnel qui a réalisé la mission | À la fin de chaque mission ou de chaque jalon |
| Professionnel | L'entreprise (clarté de la demande, respect des délais de paiement, comportement) | À la fin de chaque mission |
| Apprenant | La formation et le formateur | À la fin de chaque formation |
| Tout utilisateur | La plateforme SankoTalent elle-même | À tout moment, par la boîte à suggestions |

### 43.2 Contenu d'un avis

- **Satisfait ou non satisfait**, en un geste, puis une note de 1 à 5 étoiles.
- Des notes par critère :
  - pour un professionnel : qualité du travail, respect des délais, communication et professionnalisme ;
  - pour une formation : contenu, formateur, organisation et utilité pour le travail.
- Un commentaire écrit, facultatif, de 1 000 caractères au maximum.
- Une seule question pour mesurer la recommandation : « Recommanderiez-vous SankoTalent à un collègue ? », de 0 à 10.

### 43.3 Règles de confiance

1. **Seul un client réel peut donner un avis.** L'avis n'est possible qu'après une mission terminée ou une formation suivie. On évite ainsi les faux avis.
2. **Publication croisée.** Les deux avis d'une mission (entreprise et professionnel) ne sont publiés qu'une fois que les deux ont répondu, ou après 14 jours. Personne ne peut se venger en voyant d'abord la note de l'autre.
3. **Droit de réponse.** La personne évaluée peut répondre publiquement, une seule fois, sous l'avis.
4. **Modération transparente.** Un avis n'est retiré que s'il contient des insultes, des menaces, des données personnelles ou des propos discriminatoires, ou s'il ne concerne pas la mission. La raison du retrait est notifiée à l'auteur. **Un avis négatif honnête n'est jamais supprimé**, ni contre paiement ni sur demande de l'entreprise.
5. **Insatisfaction = action.** Un avis « non satisfait » ouvre automatiquement un ticket au service client (support@sankoveya.com). Si un paiement est en cours, l'entreprise peut ouvrir un litige (section 34).
6. **Signalement.** Tout utilisateur peut signaler un avis abusif. Un modérateur humain décide.

### 43.4 Affichage

Le profil montre la note moyenne, le nombre d'avis, le taux de missions terminées et les derniers commentaires. Une note ne s'affiche qu'à partir de 3 avis, pour éviter qu'un seul avis ne définisse une personne.

### 43.5 Entités de données ajoutées

Reviews, ReviewCriteria, ReviewResponses, ReviewReports, Suggestions, NpsResponses.

---

## 44. Transparence

La règle est simple : **les activités sont transparentes, les montants personnels restent confidentiels.**

### 44.1 Ce qui est transparent

- **La commission de SANKOVEYA est affichée avant tout paiement.** Chaque paiement montre la décomposition : montant payé par l'entreprise, commission SANKOVEYA, frais du prestataire de paiement, montant net versé au professionnel.
- **Le suivi de chaque demande et de chaque paiement**, étape par étape, est visible par les deux parties (section 34).
- **Qui a consulté mon profil** : le candidat voit quelles entreprises ont consulté son profil et à quelle date.
- **Historique des actions sur mon dossier** : chaque utilisateur voit les décisions prises sur son dossier (présélection, résultat, décision finale), avec la date. Le nom de l'évaluateur n'est pas affiché, mais l'action est tracée dans le journal d'audit.
- **Un rapport de transparence trimestriel public**, en chiffres agrégés et anonymes : nombre de talents vérifiés, missions réalisées, délai moyen d'intervention, taux de satisfaction, litiges ouverts et résolus, incidents de sécurité.
- **Une page d'état du service** : disponibilité de la plateforme et incidents en cours.

### 44.2 Ce qui reste confidentiel

- Les montants des paiements et des rémunérations, visibles seulement par les deux parties concernées et par les administrateurs autorisés.
- Les fiches de paie (section 45).
- Les données de surveillance d'examen, les pièces d'identité et les coordonnées personnelles.

---

## 45. Fiches de paie et relevés de paiement automatiques

### 45.1 Principe

À chaque paiement d'un professionnel, la plateforme génère automatiquement un document de paiement en PDF, sans intervention manuelle. Le rythme suit le mode d'engagement choisi par la personne :

| Mode d'engagement | Document généré |
|---|---|
| **Par mission** | Un relevé à chaque mission ou jalon payé |
| **À la semaine** | Un relevé hebdomadaire qui regroupe les paiements de la semaine |
| **Au mois** | Une fiche mensuelle |

### 45.2 Deux cas juridiques différents

- **Le professionnel travaille en indépendant** (mission confiée par une entreprise cliente) : le document est un **relevé de rémunération**. Il présente le montant brut de la mission, la commission, les frais et le montant net versé.
- **Le professionnel est salarié de SANKOVEYA** (stagiaire rémunéré, employé) : le document est un **bulletin de paie** au sens du droit du travail congolais. Il doit alors contenir les mentions et retenues légales (sécurité sociale, impôt sur le revenu, etc.). **Les mentions obligatoires et les taux doivent être fixés par un comptable ou un juriste congolais avant le premier versement réel.**

### 45.3 Contenu du document

- L'identifiant automatique de la personne et celui de l'entreprise (section 46).
- La période ou la mission concernée, les dates et les heures si nécessaire.
- Le montant brut, le détail des retenues et frais, et le montant net.
- La devise (USD ou CDF) et le moyen de versement, par exemple « Mobile Money, numéro masqué •••• 4521 ».
- Un **code QR de vérification**.

### 45.4 Sécurité

- **Le code QR ne contient aucune donnée personnelle**, seulement un lien avec un jeton signé numériquement. La page de vérification indique uniquement « Document authentique, émis par SANKOVEYA le 12/05/2027 », sans afficher le montant. Une banque ou un bailleur peut ainsi vérifier un document que la personne lui présente, sans fuite de données.
- **Le document est signé numériquement** par SANKOVEYA : toute modification du PDF est détectable.
- **Le PDF est chiffré** et s'ouvre avec un mot de passe choisi par la personne. Les documents sont stockés chiffrés sur le serveur.
- Un document n'est jamais modifié une fois émis : une erreur donne lieu à un document rectificatif qui annule le précédent.
- Le téléchargement et la consultation des documents de paie sont inscrits dans le journal d'audit.

### 45.5 Entités de données ajoutées

EngagementTypes, PayPeriods, PayStatements, PayStatementLines, DocumentSignatures, VerificationTokens.

---

## 46. Identifiants automatiques

Chaque compte reçoit à l'inscription un **identifiant unique, lisible et automatique**.

| Type de compte | Format | Exemple |
|---|---|---|
| Talent (professionnel) | `ST-TAL-AAAA-NNNNNN-C` | ST-TAL-2027-000123-7 |
| Entreprise | `ST-ENT-AAAA-NNNNNN-C` | ST-ENT-2027-000045-2 |
| Apprenant | `ST-APP-AAAA-NNNNNN-C` | ST-APP-2027-001208-4 |
| Formateur | `ST-FOR-AAAA-NNNNNN-C` | ST-FOR-2027-000012-9 |
| Demande de service | `ST-DEM-AAAA-NNNNNN-C` | ST-DEM-2027-003310-1 |
| Document de paie | `ST-PAY-AAAA-NNNNNN-C` | ST-PAY-2027-010455-6 |

`AAAA` est l'année d'inscription, `NNNNNN` un numéro séquentiel et `C` un **chiffre de contrôle**, qui détecte une faute de frappe quand quelqu'un dicte son numéro au téléphone.

Règles de sécurité :

- Cet identifiant sert à communiquer avec le service client et apparaît sur les documents. **Il ne donne aucun accès** : la sécurité repose sur l'authentification et les permissions, jamais sur le secret d'un numéro.
- En interne, chaque enregistrement possède aussi un identifiant technique aléatoire (UUID), qui n'est pas devinable et sert dans les adresses de l'application.
- Un identifiant n'est jamais réattribué, même après la suppression d'un compte.

---

## 47. Badges numériques

### 47.1 Pour qui

| Badges pour les travailleurs | Badges pour les apprenants |
|---|---|
| Niveau validé par spécialité : Réseau niveau 1 à 4 (Débutant, Intermédiaire, Avancé, Expert), et de même pour chaque spécialité | Formation terminée (par exemple « Linux et bash — réussi ») |
| Identité vérifiée, diplôme vérifié, certification officielle vérifiée | Examen blanc réussi au-dessus du seuil (par exemple « Prêt pour le CCNA ») |
| Missions accomplies : 1, 10, 50 et 100 missions | Assiduité : 100 % de présence |
| Intervention d'urgence fiable (délais respectés) | Parcours complet (plusieurs formations d'une même spécialité) |
| Formateur certifié SANKOVEYA | Mentor : a aidé d'autres apprenants |

### 47.2 Norme technique

Les badges suivent la norme internationale **Open Badges 3.0** de 1EdTech, alignée sur les « attestations vérifiables » du W3C. Chaque badge est signé numériquement par SANKOVEYA et contient l'émetteur, les critères, la date et les preuves. Il est donc infalsifiable, vérifiable par n'importe qui et reste la propriété de la personne, qui peut l'emporter ailleurs.

Chaque badge a sa page publique de vérification et un bouton **« Ajouter à mon profil LinkedIn »** (section 48).

### 47.3 Entités de données ajoutées

BadgeDefinitions, BadgeAwards, BadgeEvidence.

---

## 48. Lien avec LinkedIn et centre de progression

### 48.1 Ce que LinkedIn permet réellement

| Intégration | Possible ? | Conditions |
|---|---|---|
| **Se connecter avec LinkedIn** (OpenID Connect) | Oui | Créer une application sur le portail développeurs LinkedIn et demander le produit « Sign In with LinkedIn using OpenID Connect ». On récupère le nom, la photo et le courriel. **Attention : LinkedIn précise que ce produit ne vérifie pas l'identité des personnes.** La vérification d'identité de SankoTalent reste donc nécessaire. |
| **Bouton « Ajouter au profil »** pour les certifications et badges | Oui, gratuit | Il faut une page LinkedIn officielle de SANKOVEYA. Aucune approbation n'est nécessaire. Le bouton s'ajoute à la page du badge, aux courriels et à l'attestation. |
| **Partager sur LinkedIn** (badge obtenu, mission réussie) | Oui | Bouton de partage standard. |
| **Formations LinkedIn Learning intégrées dans l'application** | Pas pour l'instant | L'API LinkedIn Learning est réservée aux partenaires officiels et aux organisations qui ont acheté des licences LinkedIn Learning. |

### 48.2 Centre de progression

Le centre de progression rassemble en un seul endroit tout ce qui aide une personne à progresser :

1. **Diagnostic** : à partir des résultats d'examen (points faibles par thème) et de l'objectif choisi (par exemple « devenir administrateur réseau » ou « obtenir le Security+ »).
2. **Parcours recommandé**, qui combine :
   - les formations SankoTalent (catalogue intégré) ;
   - des **liens vers des ressources externes reconnues** : cours LinkedIn Learning sur le thème, Microsoft Learn (gratuit), Cisco Networking Academy, documentation officielle. On s'en tient à de simples liens tant qu'il n'y a pas de partenariat.
3. **Suivi** : la personne coche ce qu'elle a terminé. La progression est **validée par un test SankoTalent**, jamais par la seule déclaration.
4. **Objectifs de certification** avec une date visée et des rappels.
5. **Ajout sur LinkedIn** des badges et des attestations obtenus.

### 48.3 Septième spécialité : gestion de projets TI

La section 5 prévoyait déjà la gestion de projets informatiques comme spécialité future. Elle est ajoutée au centre de progression et aux formations : méthodes Agile et Scrum, gestion de projet classique, outils de suivi, et préparation aux certifications reconnues du domaine (par exemple CAPM, PMP, PRINCE2 ou Scrum Master).

### 48.4 Plus tard (P3)

- Candidature au programme partenaires de LinkedIn Learning.
- Achat de licences LinkedIn Learning pour les meilleurs talents, financé par les entreprises partenaires.
- Import du parcours professionnel depuis LinkedIn, avec l'accord de la personne.

---

## Mise à jour des priorités

| Priorité | Ajout |
|---|---|
| P0 | Identifiants automatiques ; décomposition de la commission avant paiement |
| P1 | Avis et satisfaction ; connexion avec LinkedIn ; badges Open Badges 3.0 ; bouton « Ajouter au profil » ; historique des actions sur mon dossier |
| P2 | Relevés de rémunération et fiches de paie automatiques avec code QR ; centre de progression ; rapport de transparence ; page d'état du service ; spécialité gestion de projets |
| P3 | Partenariat LinkedIn Learning ; import du parcours LinkedIn |

### Nouvelles décisions qui demandent l'autorisation de SANKOVEYA

1. Créer la page LinkedIn officielle de SANKOVEYA, nécessaire au bouton « Ajouter au profil ».
2. Faire valider par un comptable congolais le contenu légal du bulletin de paie, pour les personnes salariées de SANKOVEYA.
3. Fixer le taux de commission affiché.

---

Assistant IA, vérification anti-robots, adresses de courriel professionnelles, portail de l'apprenant, tableau de bord du travailleur et assistance 24 h sur 24, 7 jours sur 7.

---

## 49. Assistant conversationnel IA

### 49.1 Rôle

L'assistant IA est le **premier contact** de chaque visiteur, sur le site web, dans l'application mobile et, plus tard, sur WhatsApp. C'est lui qui engage la conversation : un message d'accueil apparaît à la première visite, propose son aide et oriente la personne selon son besoin.

Il répond en **français et en anglais**, et plus tard en lingala et en swahili (P3). Il est disponible **24 h sur 24, 7 jours sur 7**.

### 49.2 Ce que l'assistant fait

| Pour qui | Exemples de tâches |
|---|---|
| Visiteur | Expliquer SankoTalent, les spécialités, les formations, les tarifs publiés ; orienter vers l'inscription |
| Candidat | Aider à remplir le dossier, dire ce qui manque, expliquer l'étape actuelle de la candidature, rappeler un examen ou un entretien |
| Apprenant | Expliquer le calendrier, retrouver un cours, recommander des exercices selon les points faibles (section 48) |
| Entreprise | Aider à décrire une demande, expliquer le fonctionnement du paiement et des jalons, suivre l'état d'une demande |
| Travailleur | Expliquer un relevé de paiement, l'état d'une mission, les étapes d'un litige |
| Tous | Ouvrir un ticket, prendre un rendez-vous, passer la main à un humain |

Il fonctionne aussi en **simulateur d'entretien** pour l'entraînement (section 16), séparé des évaluations officielles.

### 49.3 Ce que l'assistant ne fait jamais

- **Il se présente toujours comme une IA.** Il ne prétend jamais être une personne.
- Il ne prend **aucune décision** : admission, résultat d'examen, sanction, remboursement et litige restent des décisions humaines.
- Il est **désactivé pendant un examen officiel**. Il ne donne jamais de réponse à une question d'examen, même hors examen si la question vient de la banque officielle.
- Il ne lit que les données du compte de la personne connectée, avec les mêmes permissions qu'elle. Il ne révèle jamais les données d'un autre utilisateur.
- Il ne demande jamais de mot de passe, de code de vérification ou de numéro de carte.
- Il répond à partir de la documentation officielle de SankoTalent (FAQ, règlements, catalogue). Quand il ne sait pas, il le dit et propose un humain plutôt que d'inventer.

### 49.4 Passage à un humain

L'assistant transfère immédiatement la conversation à un agent humain, avec tout l'historique pour éviter que la personne se répète, quand :

- la personne le demande (« Je veux parler à quelqu'un ») ;
- il s'agit d'un paiement bloqué, d'un litige, d'un problème de sécurité ou de compte piraté ;
- la personne exprime une colère ou une détresse ;
- l'assistant n'a pas trouvé de réponse fiable après deux tentatives.

### 49.5 Protection contre les abus

- Le texte de l'utilisateur est traité comme une question, jamais comme un ordre qui changerait les règles de l'assistant. C'est la protection contre l'« injection de consignes ».
- Les conversations sont limitées en nombre par minute et par compte.
- Elles sont conservées pendant une durée limitée (à définir dans la politique de confidentialité), et la personne peut demander leur suppression.

### 49.6 Entités de données ajoutées

ChatConversations, ChatMessages, ChatHandoffs, KnowledgeArticles.

---

## 50. Vérification « êtes-vous un humain ? »

### 50.1 Où

Sur le site web et l'application, aux endroits qui attirent les robots : création de compte, connexion après plusieurs échecs, récupération du mot de passe, formulaire de contact, dépôt d'une demande d'entreprise, inscription à une formation et soumission d'un avis.

### 50.2 Solution recommandée

**Cloudflare Turnstile**, gratuit. Dans la plupart des cas, la vérification est **invisible** et la personne n'a rien à faire. Une simple case à cocher apparaît seulement en cas de doute. Turnstile n'utilise pas les données pour la publicité, et Cloudflare annonce la conformité aux règles d'accessibilité WCAG 2.2 AA.

Des utilisateurs signalent des blocages par erreur avec des VPN, certains navigateurs et des lecteurs d'écran. Il faut donc toujours prévoir une **solution de secours** : un code envoyé par SMS ou par courriel, ou un contact avec le service client. Ainsi, aucune personne réelle ne reste bloquée.

### 50.3 Règles

- La réponse de la vérification est **contrôlée sur le serveur**, jamais seulement dans le navigateur.
- La vérification s'ajoute à la limitation des requêtes et au blocage progressif après plusieurs échecs (section 37). Elle ne les remplace pas.
- Pas de puzzle d'images : ils sont lents sur une connexion mobile faible et difficiles pour les personnes malvoyantes.

---

## 51. Adresses de courriel professionnelles

### 51.1 Qui reçoit une adresse

| Personne | Adresse | Type de boîte |
|---|---|---|
| Employé et administrateur de SANKOVEYA | `prenom.nom@sankoveya.com` | Boîte complète avec double authentification obligatoire |
| Formateur | `prenom.nom@sankoveya.com` | Boîte complète, pendant la durée de la collaboration |
| Talent en mission pour SANKOVEYA | `prenom.nom@talent.sankoveya.com` | Boîte simple, pour communiquer avec les entreprises clientes |
| Apprenant | `prenom.nom@learn.sankoveya.com` | Boîte simple ou redirection vers sa boîte personnelle, selon le budget |

Les adresses génériques existantes restent celles de l'entreprise : contact@, business@ et support@sankoveya.com.

### 51.2 Règles

- L'adresse est **créée automatiquement** à la validation du compte, avec gestion des homonymes (`prenom.nom2`).
- La double authentification est obligatoire pour les boîtes du personnel.
- **Désactivation automatique** à la fin du contrat, de la mission ou de la formation, après un délai de grâce annoncé. Les courriels sont alors redirigés ou archivés selon la politique de conservation.
- Le domaine est protégé contre l'usurpation par les enregistrements DNS **SPF, DKIM et DMARC**, pour qu'un escroc ne puisse pas envoyer de faux courriels « de SANKOVEYA ».

### 51.3 Décision de coût

Une boîte complète a un coût mensuel par utilisateur chez les fournisseurs habituels (Google Workspace, Microsoft 365). Les tarifs réduits « éducation » sont généralement réservés aux établissements reconnus. Il faut choisir pour les apprenants entre une vraie boîte et une simple redirection gratuite vers leur adresse personnelle.

---

## 52. Portail de l'apprenant

Dès son inscription, l'apprenant a son propre portail. Il y suit tout son parcours en un seul endroit.

| Rubrique | Contenu |
|---|---|
| **Accueil** | Prochain cours, dernières notes, annonces, progression globale |
| **Calendrier** | Les cours de la semaine, avec le lieu (salle, centre, carte) ou le lien en ligne ; les **cours annulés ou déplacés** affichés en rouge, avec une notification immédiate par l'application, SMS ou WhatsApp |
| **Mes cours** | Supports, vidéos et exercices par module, téléchargeables pour consultation hors connexion |
| **Notes et évaluations** | Note de chaque travail, laboratoire et examen blanc ; moyenne ; commentaire du formateur ; comparaison avec le seuil de réussite |
| **Présences** | Présences et absences, avec la possibilité de justifier une absence |
| **Préparation à la certification** | Examens blancs et résultats par thème (section 35) |
| **Paiements** | Frais payés, reste à payer, reçus (section 35) |
| **Documents** | Attestations, badges, relevés de notes avec code QR |
| **Messages** | Échanges avec le formateur et l'administration |
| **Mon évaluation du cours** | Avis sur la formation (section 43) |

### Entités de données ajoutées

Courses, CourseModules, ClassSessions, SessionChanges, Assignments, Submissions, Announcements, AbsenceJustifications.

---

## 53. Tableau de bord du travailleur

Chaque talent en mission voit comment il travaille, avec des données concrètes et des moyens de progresser.

### 53.1 Ce qu'il voit

| Indicateur | Exemple d'affichage |
|---|---|
| Satisfaction des clients | Note moyenne, avec le détail par critère (qualité, délais, communication, professionnalisme) |
| Missions | Missions terminées, en cours, annulées ; taux de réussite |
| Respect des délais | Pourcentage de jalons livrés à temps |
| Réactivité | Délai moyen de réponse aux messages et aux demandes urgentes |
| Communication | Historique des échanges avec chaque entreprise cliente, dans la messagerie de la plateforme |
| Revenus | Montants reçus par période, relevés de paiement (section 45) |
| Badges et niveaux | Badges obtenus et prochains à atteindre (section 47) |
| Progression | Points à améliorer, tirés des avis, avec des formations recommandées (section 48) |

### 53.2 Règles d'équité

- Les indicateurs servent à **progresser**, pas à punir automatiquement. Aucune sanction (suspension, retrait de badge, déclassement) n'est prise par un calcul seul : un administrateur examine toujours le dossier.
- Le travailleur peut **contester** un avis ou un indicateur qu'il juge injuste, par la même procédure que la section 12.
- Un retard causé par le client (paiement tardif, information manquante) ou par une panne de réseau ou d'électricité peut être signalé. Il est alors exclu du calcul après vérification.
- Les indicateurs détaillés ne sont visibles que par le travailleur et l'administration. Les entreprises voient seulement la note publique et les badges.

---

## 54. Assistance 24 h sur 24, 7 jours sur 7

### 54.1 Organisation à deux niveaux

| Niveau | Qui | Disponibilité | Délai de première réponse |
|---|---|---|---|
| **1** | Assistant IA (section 49) | 24 h sur 24, 7 jours sur 7 | Immédiat |
| **2** | Agent humain | Heures ouvrables, plus une **personne de garde** la nuit et le week-end pour les urgences | Selon la gravité (tableau ci-dessous) |

### 54.2 Délais par gravité

Ce sont des objectifs internes de départ, à ajuster selon les moyens humains disponibles :

| Gravité | Exemples | Première réponse humaine |
|---|---|---|
| Critique | Compte piraté, paiement disparu, incident de sécurité, intervention d'urgence bloquée | Moins de 1 heure, jour et nuit |
| Élevée | Paiement en attente, examen interrompu, litige ouvert | Moins de 4 heures |
| Normale | Question sur un dossier, une formation, une facture | Moins de 24 heures |
| Faible | Suggestion, demande d'information générale | Moins de 3 jours ouvrables |

### 54.3 Canaux

Chat dans l'application et sur le site, courriel support@sankoveya.com, WhatsApp, et téléphone pour les urgences critiques. Chaque demande reçoit un **numéro de ticket** (`ST-TKT-…`, section 46), suivi visible par la personne jusqu'à sa résolution, puis une question de satisfaction.

### 54.4 Entités de données ajoutées

SupportTickets, TicketMessages, OnCallSchedule, ServiceLevelTargets.

---

## Mise à jour des priorités

| Priorité | Ajout |
|---|---|
| P0 | Vérification anti-robots (Turnstile avec solution de secours) ; protection du domaine (SPF, DKIM, DMARC) |
| P1 | Assistant IA de premier contact avec passage à un humain ; système de tickets ; portail de l'apprenant ; adresses professionnelles du personnel et des formateurs |
| P2 | Tableau de bord du travailleur ; adresses des talents et des apprenants ; assistance WhatsApp ; garde de nuit et de week-end |
| P3 | Assistant en lingala et en swahili ; assistant sur WhatsApp |

### Nouvelles décisions qui demandent l'autorisation de SANKOVEYA

1. Le fournisseur d'IA de l'assistant et son budget mensuel, car l'usage est facturé.
2. Le fournisseur de messagerie professionnelle (Google Workspace ou Microsoft 365), et le choix entre une boîte complète ou une redirection pour les apprenants.
3. Qui assure la garde humaine la nuit et le week-end, et à partir de quand.
4. La durée de conservation des conversations avec l'assistant.
