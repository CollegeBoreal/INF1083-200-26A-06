import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-forms.html',
  styleUrl: './reactive-forms.css'
})
export class ReactiveForms {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  onSubmit() {
    console.log(this.signupForm.value);
  }
}