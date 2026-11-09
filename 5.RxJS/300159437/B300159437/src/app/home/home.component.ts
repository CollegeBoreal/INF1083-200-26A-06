
import { Component } from '@angular/core';

@Component({
    selector: 'Home',
    standalone: false,
    template: `
        <StackLayout backgroundColor="#101C36" padding="25">
            <Label text="World Capitals"
                   color="white"
                   fontSize="30"
                   fontWeight="bold"
                   textAlignment="center">
            </Label>

            <Label text="Welcome! Discover capitals around the world."
                   color="#A8B8D2"
                   fontSize="16"
                   textWrap="true"
                   textAlignment="center"
                   marginTop="25">
            </Label>
        </StackLayout>
    `
})
export class HomeComponent {}
