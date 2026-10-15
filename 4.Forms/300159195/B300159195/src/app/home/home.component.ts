import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptRouterModule,
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {
  signUpForm: FormGroup;
  statusMessage = '';

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  onButtonTap(): void {
    if (this.signUpForm.invalid) {
      this.statusMessage = 'Veuillez remplir les deux champs.';
      return;
    }

    console.log(JSON.stringify(this.signUpForm.value));
    this.statusMessage = 'Formulaire envoyé avec succès !';
  }
}