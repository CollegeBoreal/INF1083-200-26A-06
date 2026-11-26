import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';

@Component({
  selector: 'app-suivi',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="SportFit - Mes progrès"
      backgroundColor="#15803d" color="white">
    </ActionBar>

    <ScrollView backgroundColor="#101713">
      <StackLayout padding="20">

        <Label text="📊 Mes performances"
          fontSize="27"
          fontWeight="bold"
          color="#4ade80"
          textAlignment="center">
        </Label>

        <StackLayout backgroundColor="#22332a"
          padding="25"
          borderRadius="20"
          marginTop="20">

          <Label text="Progression du programme"
            fontSize="20"
            color="white"
            textAlignment="center">
          </Label>

          <Label [text]="pourcentage + '%'"
            fontSize="55"
            fontWeight="bold"
            color="#4ade80"
            textAlignment="center">
          </Label>

          <Progress [value]="total"
            [maxValue]="4"
            color="#22c55e"
            backgroundColor="#374151"
            height="15">
          </Progress>

          <Label [text]="total + ' / 4 exercices terminés'"
            color="white"
            fontSize="17"
            textAlignment="center"
            marginTop="15">
          </Label>

        </StackLayout>

        <GridLayout columns="*, *" marginTop="15">

          <StackLayout col="0"
            backgroundColor="#22332a"
            borderRadius="18"
            padding="15"
            marginRight="5">

            <Label text="🔥"
              fontSize="35"
              textAlignment="center">
            </Label>

            <Label [text]="calories + ' kcal'"
              color="#4ade80"
              fontSize="25"
              fontWeight="bold"
              textAlignment="center">
            </Label>

            <Label text="Calories indicatives"
              color="white"
              textWrap="true"
              textAlignment="center">
            </Label>

          </StackLayout>

          <StackLayout col="1"
            backgroundColor="#22332a"
            borderRadius="18"
            padding="15"
            marginLeft="5">

            <Label text="💪"
              fontSize="35"
              textAlignment="center">
            </Label>

            <Label [text]="total + ' / 4'"
              color="#4ade80"
              fontSize="25"
              fontWeight="bold"
              textAlignment="center">
            </Label>

            <Label text="Exercices"
              color="white"
              textAlignment="center">
            </Label>

          </StackLayout>

        </GridLayout>

        <StackLayout backgroundColor="#22332a"
          borderRadius="20"
          padding="20"
          marginTop="20">

          <Label text="🏆 Mes récompenses"
            fontSize="23"
            fontWeight="bold"
            color="white"
            textAlignment="center">
          </Label>

          <Label [text]="trophee"
            fontSize="50"
            textAlignment="center"
            marginTop="15">
          </Label>

          <Label [text]="niveau"
            color="#4ade80"
            fontSize="23"
            fontWeight="bold"
            textAlignment="center">
          </Label>

          <Label [text]="message"
            color="#a7c4b0"
            fontSize="16"
            textWrap="true"
            textAlignment="center"
            marginTop="10">
          </Label>

        </StackLayout>

        <Button text="🔄 Actualiser mes progrès"
          backgroundColor="#22c55e"
          color="#101713"
          fontWeight="bold"
          borderRadius="15"
          height="55"
          marginTop="20"
          (tap)="actualiser()">
        </Button>

        <Button text="Réinitialiser l'entraînement"
          backgroundColor="#dc2626"
          color="white"
          borderRadius="15"
          height="50"
          marginTop="10"
          (tap)="reinitialiser()">
        </Button>

      </StackLayout>
    </ScrollView>
  `
})
export class SuiviComponent implements OnInit {

  total = 0;
  pourcentage = 0;
  calories = 0;
  trophee = '🎯';
  niveau = 'Débutant';
  message = '';

  exercices = [
    { nom: 'Pompes', calories: 25 },
    { nom: 'Squats', calories: 35 },
    { nom: 'Abdominaux', calories: 30 },
    { nom: 'Course', calories: 100 }
  ];

  ngOnInit() {
    this.actualiser();
  }

  actualiser() {

    const termines = this.exercices.filter(exercice =>
      ApplicationSettings.getBoolean(
        'sportfit_' + exercice.nom, false
      )
    );

    this.total = termines.length;
    this.pourcentage = this.total * 25;

    this.calories = termines.reduce(
      (somme, exercice) => somme + exercice.calories, 0
    );

    if (this.total === 0) {
      this.trophee = '🎯';
      this.niveau = 'Débutant';
      this.message = 'Commence ton premier exercice !';
    } else if (this.total === 1) {
      this.trophee = '🥉';
      this.niveau = 'Sportif débutant';
      this.message = 'Bravo ! Continue comme ça.';
    } else if (this.total === 2) {
      this.trophee = '🥈';
      this.niveau = 'Sportif motivé';
      this.message = 'Tu es à la moitié du programme !';
    } else if (this.total === 3) {
      this.trophee = '🥇';
      this.niveau = 'Sportif confirmé';
      this.message = 'Encore un exercice !';
    } else {
      this.trophee = '🏆';
      this.niveau = 'Champion SportFit';
      this.message = 'Félicitations ! Objectif atteint !';
    }
  }

  reinitialiser() {

    this.exercices.forEach(exercice =>
      ApplicationSettings.remove(
        'sportfit_' + exercice.nom
      )
    );

    this.actualiser();
  }
}