
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent implements OnInit {

  signUpForm!: FormGroup;
  message = '';
  estValide = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
    });
  }

  onButtonTap() {
    if (this.signUpForm.valid) {
      this.message = "Inscription réussie !";
      this.estValide = true;
      console.log(JSON.stringify(this.signUpForm.value));
    } else {
      this.message = "Veuillez remplir correctement les champs.";
      this.estValide = false;
    }
  }
}
