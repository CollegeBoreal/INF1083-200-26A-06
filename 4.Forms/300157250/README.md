# Laboratoire 8 - Forms

## Étudiant

- Nom : Emmanuel N'Goran
- Numéro étudiant : 300157250

---

## Objectif

L'objectif de ce laboratoire est de comprendre le fonctionnement des formulaires avec Angular et NativeScript.

---

## Réalisation

Dans ce laboratoire, j'ai créé une application contenant :

- Un champ Email
- Un champ Username
- Un bouton Sign Up

Lorsque l'utilisateur remplit le formulaire et clique sur le bouton **Sign Up**, les informations saisies sont récupérées et affichées dans la console au format JSON.

---

## Code utilisé

### home.component.html

```html
<ActionBar>
    <Label text="Home"></Label>
</ActionBar>

<StackLayout>
    <TextField #email hint="Email"></TextField>

    <TextField #username hint="Username"></TextField>

    <Button
        text="sign up"
        (tap)="onButtonTap(email.text, username.text)">
    </Button>
</StackLayout>
```

### home.component.ts

```ts
onButtonTap(email: string, username: string) {
    console.log(
        JSON.stringify({
            email: email,
            username: username,
        })
    );
}
```


## Résultat obtenu

Après avoir saisi les informations suivantes :

- Email : Jeanpierre225@gmail.com
- Username : Emmanuel

La console affiche :

```json
{
  "email": "Jeanpierre225@gmail.com",
  "username": "Emmanuel"
}
```

---

## Captures d'écran

### Formulaire

<img width="564" height="810" alt="forme 1" src="https://github.com/user-attachments/assets/6a5277c6-e181-4c3d-9fb1-b89d64f8a2a2" />

### Résultat dans la console
<img width="500" height="16" alt="forme 2 " src="https://github.com/user-attachments/assets/2f1f4b43-90df-442b-b720-ffaf54d60f2b" />


---

## Conclusion

Ce laboratoire m'a permis de comprendre comment créer un formulaire simple avec Angular et NativeScript, récupérer les données saisies par l'utilisateur et afficher les résultats dans la console.

