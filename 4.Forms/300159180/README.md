abdenour zourane 
300159180

1. Présentation du travail 

Le travail consiste à ajouter une page d'inscription à l'application NativeScript. Cette page contient deux champs, Email et Username, ainsi qu'un bouton Sign up. Le formulaire utilise Reactive Forms d'Angular pour organiser les champs et les rendre obligatoires. 

Lorsque l'utilisateur appuie sur le bouton, les valeurs saisies sont récupérées dans le composant et affichées dans le terminal de Visual Studio Code. 

2. Structure des fichiers 

Les fichiers utilisés se trouvent dans le dossier src/app : 

signup/signup.component.ts : logique du formulaire et récupération des valeurs. 

signup/signup.component.html : interface du formulaire. 

app.routes.ts : configuration de la navigation vers la page d'inscription. 

3. Code du composant – signup.component.ts 

Le composant SignupComponent utilise FormBuilder pour créer un FormGroup. Les contrôles email et username sont déclarés avec Validators.required. La méthode onButtonTap() affiche les valeurs du formulaire dans le terminal. 

import { Component, OnInit } from '@angular/core'; 
 import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
 import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'; 
 import { ReactiveFormsModule } from '@angular/forms'; 
  
@Component({ 
   selector: 'ns-signup', 
   templateUrl: './signup.component.html', 
   imports: [ 
     NativeScriptCommonModule, 
     NativeScriptFormsModule, 
     ReactiveFormsModule 
   ] 
 }) 
 export class SignupComponent implements OnInit { 
   signUpForm!: FormGroup; 
  
  constructor(private formBuilder: FormBuilder) {} 
  
  ngOnInit(): void { 
     this.signUpForm = this.formBuilder.group({ 
       email: ['', Validators.required], 
       username: ['', Validators.required], 
     }); 
   } 
  
  onButtonTap() { 
     console.log(JSON.stringify(this.signUpForm.value)); 
    
  

4. Interface – signup.component.html 

Le fichier HTML définit l'écran du formulaire : un titre, un champ Email, un champ Username et un bouton Sign up. L'attribut [formGroup] relie l'interface au formulaire TypeScript. Chaque TextField est associé à son contrôle avec formControlName. 

<ActionBar title="ReactiveForms"></ActionBar> 
  
<StackLayout [formGroup]="signUpForm" class="p-4"> 
   <Label text="Créer un compte" 
          class="text-2xl font-bold text-center m-4"></Label> 
  
  <TextField hint="Email" 
              keyboardType="email" 
              formControlName="email"></TextField> 
  
  <TextField hint="Username" 
              formControlName="username"></TextField> 
  
  <Button text="Sign up" 
           (tap)="onButtonTap()"></Button> 
 </StackLayout> 

 

5. Navigation – app.routes.ts 

La route signup permet d'accéder au formulaire. La route vide redirige vers /signup afin d'afficher le formulaire lorsque l'application ouvre la route d'accueil. 

import { Routes } from '@angular/router'; 
 import { PersonComponent } from './people/person.component'; 
 import { PersonDetailComponent } from './people/person-detail.component'; 
 import { SignupComponent } from './signup/signup.component'; 
  
export const routes: Routes = [ 
   { path: '', redirectTo: '/signup', pathMatch: 'full' }, 
   { path: 'signup', component: SignupComponent }, 
   { path: 'items', component: PersonComponent }, 
   { path: 'item/:id', component: PersonDetailComponent } 
 ]; 

 

6. Compilation et lancement Android 

Le projet a été lancé depuis le terminal intégré de Visual Studio Code avec la commande : 

ns run android 

Le terminal a indiqué que la compilation était réussie et que l'application avait été synchronisée avec l'émulateur Android. 

 

 

 

 

 

 

 

 

 

 

 

7. Test du formulaire 

Le formulaire a été testé avec les informations suivantes : 

Champ 

Valeur de test 

Email 

test@gmail.com 

Username 

abdenour 

Après avoir appuyé sur Sign up, les valeurs saisies sont apparues dans le terminal. La capture du terminal montre que les champs sont bien récupérés. 

 

8. Conclusion 

Le formulaire d'inscription s'affiche dans l'émulateur Android. Les champs Email et Username sont reliés au FormGroup, et le bouton Sign up déclenche la méthode onButtonTap(). Les valeurs saisies sont affichées dans le terminal de Visual Studio Code. Ce travail a permis de pratiquer la création d'un formulaire Reactive Forms, la configuration d'une route et le test d'une application NativeScript sur Android. 

 
