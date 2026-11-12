import { Component, OnInit } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ns-person',
  templateUrl: './person.component.html',
  imports: [NativeScriptCommonModule, ReactiveFormsModule],
})
export class PersonComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
    });
  }

  onButtonTap(): void {
    console.log(this.signUpForm.value);
  }
}