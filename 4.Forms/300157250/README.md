🚀 Créer votre répertoire
 Créer un répertoire avec son 🆔 et ajouter le fichier README.md et un répertoire images 🖼️
🎯 Objectif
À la fin de ce laboratoire, vous serez capable de :

Comprendre le 'layout'
Comprendre les 'forms' d'Angular
🖼️ layout-containers
Mastering NativeScript Layouts - Brad Martin

🧮 Forms
2 examples de Forms en Angular:

 ReactiveForms - ce module

 Template Driven Forms - le module RxJS

ReactiveForms
https://nativescript.org/blog/angular-10-support/

tns v7.0.1	Patrons
ns create B🆔 --template @nativescript/template-blank-ng	Hello World
0️⃣ Naviguer vers votre projet et pour l'éditer avec ⌨️ vsc, taper:

code .
1️⃣ ReactiveForms

Open up home component template home.component.html replace <GridLayout> by the following :

⌨️ Dans vsc Ouvrir un fichier -> Ctrl p 💻 Windows ou ⌘ p 🍎 MacOS

<StackLayout [formGroup]="signUpForm">
    <TextField formControlName="email" hint="Email" keyboardType="email"></TextField>
    <TextField formControlName="username" hint="Username"></TextField>
    <Button text="sign up" (tap)="onButtonTap()"></Button>
</StackLayout>
💡 Angular Event Binding



Add the formBuilder variable to the home component constructor
    constructor(private formBuilder: FormBuilder) {
        // Use the component constructor to inject providers.
    }
⌨️ Dans vsc Quick Fix -> Ctrl . 💻 Windows ou ⌘ . 🍎 MacOS

Add the signUpForm: FormGroup; attribute to the home component
   signUpForm: FormGroup;
Add the signUpForm initialization in ngOnInit method
        // Init your component properties here.
        this.signUpForm = this.formBuilder.group({
            email: ["", Validators.required],
            username: ["", Validators.required],
        });
Add the onButtonTap method
    onButtonTap() {
        console.log(JSON.stringify(this.signUpForm.value));
    }
💡 Final Result

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {

    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
              // Init your component properties here.
        this.signUpForm = this.formBuilder.group({
            email: ["", Validators.required],
            username: ["", Validators.required],
        });
    }

    onButtonTap() {
       console.log(JSON.stringify(this.signUpForm.value));
    }

}
🫵 Résultat:
L'exercice est d'afficher le courriel et l'utilisateur dans la console.

📚 References
[] NativeScript Application Templates