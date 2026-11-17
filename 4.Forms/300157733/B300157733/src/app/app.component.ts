import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html',
    imports: [NativeScriptCommonModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent {

    email = '';
    username = '';

    setEmail(event: any) {
        this.email = event.object.text;
    }

    setUsername(event: any) {
        this.username = event.object.text;
    }

    onButtonTap() {
        console.log(
            JSON.stringify({
                email: this.email,
                username: this.username
            })
        );
    }
}