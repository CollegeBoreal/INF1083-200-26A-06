 
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    NativeScriptCommonModule,
    NativeScriptRouterModule,
} from '@nativescript/angular';

@Component({
    selector: 'Home',
    templateUrl: './person.component.html',
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    schemas: [NO_ERRORS_SCHEMA],
})
export class PersonComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            email: ['', Validators.required],
            username: ['', Validators.required],
        });
    }

    onButtonTap(): void {
        console.log(JSON.stringify(this.signUpForm.value));
    }
}

