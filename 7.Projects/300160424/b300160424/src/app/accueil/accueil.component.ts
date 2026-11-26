import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule
} from '@nativescript/angular';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="SportFit 💪"
      backgroundColor="#15803d" color="white">
    </ActionBar>

    <ScrollView backgroundColor="#101713">
      <StackLayout padding="20">

        <Label text="🔥 SPORTFIT"
          fontSize="35"
          fontWeight="bold"
          color="#4ade80"
          textAlignment="center">
        </Label>

        <Label text="Bienvenue Youcef !"
          fontSize="24"
          color="white"
          textAlignment="center"
          marginTop="15">
        </Label>

        <Label text="Deviens la meilleure version de toi-même."
          color="#a7c4b0"
          textWrap="true"
          textAlignment="center"
          fontSize="16"
          marginTop="10">
        </Label>

        <StackLayout backgroundColor="#22332a"
          borderRadius="20"
          padding="20"
          marginTop="25">

          <Label text="🎯 Objectif du jour"
            color="white"
            fontSize="20"
            fontWeight="bold">
          </Label>

          <Label text="30 MIN"
            fontSize="45"
            color="#4ade80"
            fontWeight="bold"
            textAlignment="center"
            marginTop="10">
          </Label>

          <Label text="Entraînement quotidien"
            color="#a7c4b0"
            textAlignment="center">
          </Label>

        </StackLayout>

        <GridLayout columns="*, *" marginTop="15">

          <StackLayout col="0"
            backgroundColor="#22332a"
            borderRadius="15"
            padding="15"
            marginRight="5">

            <Label text="🏋️" fontSize="35"
              textAlignment="center">
            </Label>

            <Label text="4 Exercices"
              color="white"
              fontSize="18"
              textAlignment="center">
            </Label>

          </StackLayout>

          <StackLayout col="1"
            backgroundColor="#22332a"
            borderRadius="15"
            padding="15"
            marginLeft="5">

            <Label text="🏆" fontSize="35"
              textAlignment="center">
            </Label>

            <Label text="1 Objectif"
              color="white"
              fontSize="18"
              textAlignment="center">
            </Label>

          </StackLayout>

        </GridLayout>

        <Button text="▶ Commencer mon entraînement"
          [nsRouterLink]="['/exercices']"
          backgroundColor="#22c55e"
          color="#101713"
          fontWeight="bold"
          fontSize="16"
          height="55"
          borderRadius="15"
          marginTop="25">
        </Button>

        <Button text="📊 Voir mes progrès"
          [nsRouterLink]="['/suivi']"
          backgroundColor="#22332a"
          color="white"
          fontSize="16"
          height="55"
          borderRadius="15"
          marginTop="10">
        </Button>

        <Label text="💡 La discipline est la clé du succès."
          color="#4ade80"
          fontSize="15"
          textAlignment="center"
          textWrap="true"
          marginTop="25">
        </Label>

      </StackLayout>
    </ScrollView>
  `
})
export class AccueilComponent {}