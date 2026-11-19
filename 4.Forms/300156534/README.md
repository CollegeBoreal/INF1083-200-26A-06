# INF1083 – Laboratoire 8.Forms : ReactiveForms

**Collège Boréal**  
**Étudiant :** Salhi Oualid  
**Matricule :** 300156534  
**Projet :** B300156534  

---

## 1. Objectif du laboratoire

Créer une application mobile Android avec NativeScript et Angular en utilisant les formulaires réactifs (ReactiveForms).

L'application permet de saisir une adresse courriel et un nom d'utilisateur, puis d'afficher les valeurs dans la console.

## 2. Environnement de développement

| Outil | Version |
|---|---|
| Node.js | 24.21.0 |
| npm | 11.19.0 |
| NativeScript CLI | 9.1.1 |
| Éditeur | Visual Studio Code |
| Émulateur | Android Pixel 9 |

![Vérification des outils](images/capture1.png)

## 3. Création du projet

Commande utilisée :

```powershell
ns create B300156534 --template @nativescript/template-blank-ng
```

![Création du projet](images/capture2.png)

## 4. Programmation du formulaire

Le formulaire contient :

- Un champ Email.
- Un champ Username.
- Un bouton Sign up.

Le formulaire utilise `FormBuilder`, `FormGroup`, `Validators` et `ReactiveFormsModule`.

![Code Angular](images/capture3.png)

## 5. Exécution sur Android

Commande utilisée :

```powershell
ns run android
```

L'application a été compilée et installée sur l'émulateur Android Pixel 9.

![Formulaire Android](images/capture4.png)

## 6. Affichage des données dans la console

Lorsque l'utilisateur clique sur **Sign up** avec des données valides, les valeurs sont affichées dans la console grâce à :

```typescript
console.log(JSON.stringify(this.signUpForm.value));
```

![Résultat dans la console](images/capture5.png)

## 7. Amélioration de l'interface CSS

L'interface a été améliorée avec :

- Un titre bleu centré.
- Des champs avec bordures arrondies.
- Un bouton bleu.
- Des messages de validation colorés.

![Interface améliorée](images/capture6.png)

## 8. Validation du formulaire

### 8.1 Validation réussie

Lorsque les informations sont correctes, le message suivant apparaît en vert :

**Inscription réussie !**

![Validation réussie](images/capture7.png)

### 8.2 Validation incorrecte

Lorsque les champs sont vides ou invalides, le message suivant apparaît en rouge :

**Veuillez remplir correctement les champs.**

![Validation incorrecte](images/capture8.png)

## 9. Conclusion

Ce laboratoire m'a permis de comprendre le fonctionnement des formulaires réactifs avec Angular et NativeScript.

J'ai appris à créer un formulaire, récupérer les données saisies, appliquer des règles de validation et améliorer l'interface graphique avec CSS.

L'application a été testée avec succès sur un émulateur Android.
