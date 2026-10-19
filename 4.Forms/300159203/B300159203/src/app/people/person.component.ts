
import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule } from '@nativescript/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ns-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  signUpForm!: FormGroup;
  message = '';

  ngOnInit(): void {
   this.signUpForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  username: ['', Validators.required],
});
  }

onButtonTap(): void {
  if (this.signUpForm.get('email')?.hasError('required')) {
    this.message = 'Please enter your email.';
    return;
  }

  if (this.signUpForm.get('email')?.hasError('email')) {
    this.message = 'Please enter a valid email address.';
    return;
  }

  if (this.signUpForm.get('username')?.hasError('required')) {
    this.message = 'Please enter your username.';
    return;
  }

  this.message = 'Account created successfully!';
  console.log(JSON.stringify(this.signUpForm.value));
}
}