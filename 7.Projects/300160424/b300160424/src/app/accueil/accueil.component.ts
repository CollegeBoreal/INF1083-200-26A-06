
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
    <ActionBar title="SPORTFIT | TRAINING"
      backgroundColor="#101010"
      color="#FF6B00">
    </ActionBar>

    <ScrollView backgroundColor="#101010">
      <StackLayout padding="18">

        <Label text="SPORTFIT PRO"
          color="#FF6B00"
          fontSize="15"
          fontWeight="bold">
        </Label>

        <Label text="Prêt à t'entraîner ?"
          color="white"
          fontSize="28"
          fontWeight="bold"
          marginTop="8">
        </Label>

        <Label text="Chaque effort compte."
          color="#AAAAAA"
          fontSize="16"
          marginTop="5">
        </Label>

        <GridLayout rows="220"
          borderRadius="20"
          marginTop="20"
          backgroundColor="#242424">

          <Image
            src="~/images/fitness.jpg"
            stretch="aspectFill"
            opacity="0.55">
          </Image>

          <StackLayout
            verticalAlignment="bottom"
            padding="18">

            <Label text="NO EXCUSES"
              color="#FF6B00"
              fontSize="32"
              fontWeight="bold">
            </Label>

            <Label text="TRAIN HARD"
              color="white"
              fontSize="30"
              fontWeight="bold">
            </Label>

            <Label text="Construis ta meilleure version."
              color="white"
              fontSize="14">
            </Label>

          </StackLayout>

        </GridLayout>

        <Label text="TON PROGRAMME"
          color="white"
          fontWeight="bold"
          fontSize="19"
          marginTop="25">
        </Label>

        <GridLayout columns="*, *"
          marginTop="12">

          <StackLayout col="0"
            backgroundColor="#242424"
            borderRadius="16"
            padding="18"
            marginRight="5">

            <Label text="⏱"
              fontSize="30"
              color="#FF6B00">
            </Label>

            <Label text="30 MIN"
              color="#FF6B00"
              fontSize="28"
              fontWeight="bold">
            </Label>

            <Label text="Objectif quotidien"
              color="#BBBBBB"
              fontSize="13"
              textWrap="true">
            </Label>

          </StackLayout>

          <StackLayout col="1"
            backgroundColor="#242424"
            borderRadius="16"
            padding="18"
            marginLeft="5">

            <Label text="🏋️"
              fontSize="30">
            </Label>

            <Label text="04"
              color="#FF6B00"
              fontSize="28"
              fontWeight="bold">
            </Label>

            <Label text="Exercices"
              color="#BBBBBB"
              fontSize="13">
            </Label>

          </StackLayout>

        </GridLayout>

        <Label text="ENTRAÎNEMENT DU JOUR"
          color="white"
          fontSize="19"
          fontWeight="bold"
          marginTop="25">
        </Label>

        <StackLayout
          backgroundColor="#242424"
          borderRadius="16"
          padding="18"
          marginTop="12">

          <Label text="💪 Full Body Workout"
            color="white"
            fontSize="21"
            fontWeight="bold">
          </Label>

          <Label text="Pompes • Squats • Abdominaux • Course"
            color="#AAAAAA"
            textWrap="true"
            marginTop="8">
          </Label>

          <Label text="NIVEAU DÉBUTANT"
            color="#FF6B00"
            fontWeight="bold"
            marginTop="12">
          </Label>

          <Button text="▶ COMMENCER"
            [nsRouterLink]="['/exercices']"
            backgroundColor="#FF6B00"
            color="white"
            fontSize="17"
            fontWeight="bold"
            borderRadius="12"
            height="55"
            marginTop="15">
          </Button>

        </StackLayout>

        <Button text="📊 VOIR MES PERFORMANCES"
          [nsRouterLink]="['/suivi']"
          backgroundColor="#242424"
          color="#FF6B00"
          fontWeight="bold"
          borderColor="#FF6B00"
          borderWidth="1"
          borderRadius="12"
          height="55"
          marginTop="15">
        </Button>

        <Label text="DISCIPLINE • FORCE • PERFORMANCE"
          color="#FF6B00"
          fontSize="12"
          fontWeight="bold"
          textAlignment="center"
          marginTop="25"
          marginBottom="15">
        </Label>

      </StackLayout>
    </ScrollView>
  `
})
export class AccueilComponent {}
