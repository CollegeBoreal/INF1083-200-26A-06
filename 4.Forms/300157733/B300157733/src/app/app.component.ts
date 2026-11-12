import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule
} from '@angular/forms';

import { NativeScriptCommonModule } from '@nativescript/angular';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html',
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent {

    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

        this.signUpForm = this.formBuilder.group({
            email: ['', Validators.required],
            username: ['', Validators.required]
        });

    }

    onButtonTap() {
        console.log(JSON.stringify(this.signUpForm.value));
    }
}