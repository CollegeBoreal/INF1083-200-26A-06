import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';

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
        NativeScriptFormsModule,
        ReactiveFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent implements OnInit {

    signUpForm!: FormGroup;

    message: string = "";
    messageColor: string = "red";

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
        email: ["", Validators.required],
        username: ["", Validators.required]
    });
}

    onButtonTap() {
    const email = this.signUpForm.value.email || "";
    const username = this.signUpForm.value.username || "";

    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValide) {
        this.message = "Please enter a valid email address.";
        this.messageColor = "red";
        return;
    }

    if (!username.trim()) {
        this.message = "Please enter a username.";
        this.messageColor = "red";
        return;
    }

    this.message = "Account created successfully!";
    this.messageColor = "green";

    console.log(JSON.stringify(this.signUpForm.value));
}