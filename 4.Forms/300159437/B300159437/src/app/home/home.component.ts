
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  NativeScriptCommonModule,
  NativeScriptRouterModule
} from '@nativescript/angular';

import { alert } from '@nativescript/core';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    ReactiveFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

  onButtonTap(): void {
    if (this.signUpForm.valid) {
      console.log(JSON.stringify(this.signUpForm.value));

      alert({
        title: 'Registration Successful',
        message: 'Welcome, ' + this.signUpForm.value.username + '!',
        okButtonText: 'OK'
      });

    } else {
      alert({
        title: 'Invalid Information',
        message: 'Please enter a valid email and username.',
        okButtonText: 'OK'
      });
    }
  }
}
