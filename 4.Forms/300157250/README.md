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

