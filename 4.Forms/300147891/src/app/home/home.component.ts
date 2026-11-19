import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
  NativeScriptFormsModule
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    ReactiveFormsModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class HomeComponent {

  signUpForm!: FormGroup;

  showPassword = false;

  message = '';

  messageColor = 'red';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      username: ['', Validators.required],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      confirmPassword: ['', Validators.required]

    });

  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onButtonTap(): void {

    const values = this.signUpForm.value;

    if (this.signUpForm.invalid) {
      this.message = 'Please complete all fields correctly.';
      this.messageColor = 'red';
      return;
    }

    if (values.password !== values.confirmPassword) {
      this.message = 'Passwords do not match.';
      this.messageColor = 'red';
      return;
    }

    console.log(JSON.stringify({
      email: values.email,
      username: values.username
    }));

    this.message = 'Account created successfully!';
    this.messageColor = 'green';

  }

  resetForm(): void {

    this.signUpForm.reset();

    this.showPassword = false;

    this.message = '';

  }

}