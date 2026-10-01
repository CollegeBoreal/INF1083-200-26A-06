# 📱 Application NativeScript - B300159437

## 1. Application avant les modifications

L'application est exécutée sur un émulateur Android **Pixel 7**.  
La version initiale affiche une liste de scientifiques en informatique.

<p align="center">
  <img src="images/Screenshot%202026-10-01%20122938.png" width="40%" alt="Application NativeScript avant modification">
</p>

---

## 2. Modification des données dans Visual Studio Code

Les informations affichées dans l'application ont été modifiées dans le fichier :

`src/app/people/person.service.ts`

Les noms, nationalités et réalisations des personnes ont été modifiés directement dans le service `PersonService`.

<p align="center">
  <img src="images/Screenshot%202026-10-01%20131008.png" width="80%" alt="Modification du fichier person.service.ts dans VS Code">
</p>

---

## 3. Application après les modifications

Après avoir enregistré les modifications et exécuté l'application avec :

```powershell
ns run android --device emulator-5554

<img src="images/Screenshot%202026-10-01%20133303.png" width="40%">
