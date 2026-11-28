
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ApplicationSettings, Dialogs } from '@nativescript/core';

@Component({
  selector: 'app-suivi',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],

  template: `
    <ActionBar title="SPORTFIT | PERFORMANCE"
      backgroundColor="#101010"
      color="#FF6B00">
    </ActionBar>

    <ScrollView backgroundColor="#101010"
      (loaded)="actualiser()">

      <StackLayout padding="18">

        <Label text="PERFORMANCE TRACKER"
          color="#FF6B00"
          fontSize="14"
          fontWeight="bold">
        </Label>

        <Label text="Mes performances"
          fontSize="28"
          fontWeight="bold"
          color="white"
          marginTop="8">
        </Label>

        <Label text="Chaque effort te rapproche de ton objectif."
          color="#AAAAAA"
          textWrap="true"
          marginTop="5">
        </Label>

        <StackLayout
          backgroundColor="#242424"
          padding="20"
          borderRadius="20"
          marginTop="20">

          <Label text="PROGRESSION DU PROGRAMME"
            fontSize="15"
            fontWeight="bold"
            color="#BBBBBB"
            textAlignment="center">
          </Label>

          <GridLayout
            width="180"
            height="180"
            borderRadius="90"
            borderWidth="10"
            [borderColor]="pourcentage === 100 ? '#22c55e' : '#FF6B00'"
            backgroundColor="#101010"
            marginTop="20">

            <StackLayout verticalAlignment="center">

              <Label [text]="pourcentage + '%'"
                fontSize="48"
                fontWeight="bold"
                color="#FF6B00"
                textAlignment="center">
              </Label>

              <Label [text]="total + ' / 4 exercices'"
                color="#BBBBBB"
                fontSize="14"
                textAlignment="center">
              </Label>

            </StackLayout>

          </GridLayout>

          <Progress
            [value]="pourcentage"
            [maxValue]="100"
            color="#FF6B00"
            backgroundColor="#414141"
            height="12"
            marginTop="20">
          </Progress>

          <Label [text]="total === 4 ? 'OBJECTIF ATTEINT !' : 'Continue ton entraînement !'"
            color="#FF6B00"
            fontWeight="bold"
            textAlignment="center"
            marginTop="15">
          </Label>

        </StackLayout>

        <GridLayout columns="*, *" marginTop="15">

          <StackLayout col="0"
            backgroundColor="#242424"
            borderRadius="18"
            padding="15"
            marginRight="5">

            <Label text="🔥"
              fontSize="35"
              textAlignment="center">
            </Label>

            <Label [text]="calories + ' kcal'"
              color="#FF6B00"
              fontSize="25"
              fontWeight="bold"
              textAlignment="center">
            </Label>

            <Label text="Calories estimées"
              color="#BBBBBB"
              textWrap="true"
              textAlignment="center">
            </Label>

          </StackLayout>

          <StackLayout col="1"
            backgroundColor="#242424"
            borderRadius="18"
            padding="15"
            marginLeft="5">

            <Label text="💪"
              fontSize="35"
              textAlignment="center">
            </Label>

            <Label [text]="total + ' / 4'"
              color="#FF6B00"
              fontSize="25"
              fontWeight="bold"
              textAlignment="center">
            </Label>

            <Label text="Exercices terminés"
              color="#BBBBBB"
              textWrap="true"
              textAlignment="center">
            </Label>

          </StackLayout>

        </GridLayout>

        <Label text="BILAN DES EXERCICES"
          color="white"
          fontSize="19"
          fontWeight="bold"
          marginTop="25">
        </Label>

        <StackLayout
          backgroundColor="#242424"
          borderRadius="18"
          padding="15"
          marginTop="12">

          <GridLayout
            *ngFor="let exercice of exercices"
            columns="*, auto"
            padding="12"
            borderBottomWidth="1"
            borderBottomColor="#414141">

            <Label col="0"
              [text]="exercice.nom"
              color="white"
              fontSize="17">
            </Label>

            <Label col="1"
              [text]="estTermine(exercice.nom) ? '✓ Terminé' : 'En attente'"
              [color]="estTermine(exercice.nom) ? '#22c55e' : '#AAAAAA'"
              fontSize="14">
            </Label>

          </GridLayout>

        </StackLayout>

        <StackLayout
          backgroundColor="#242424"
          borderRadius="20"
          padding="20"
          marginTop="20">

          <Label text="MES RÉCOMPENSES"
            fontSize="18"
            fontWeight="bold"
            color="#BBBBBB"
            textAlignment="center">
          </Label>

          <Label [text]="trophee"
            fontSize="65"
            textAlignment="center"
            marginTop="15">
          </Label>

          <Label [text]="niveau"
            color="#FF6B00"
            fontSize="24"
            fontWeight="bold"
            textAlignment="center"
            textWrap="true">
          </Label>

          <Label [text]="message"
            color="#BBBBBB"
            fontSize="16"
            textWrap="true"
            textAlignment="center"
            marginTop="10">
          </Label>

        </StackLayout>

        <Button text="ACTUALISER MES PROGRÈS"
          backgroundColor="#FF6B00"
          color="white"
          fontWeight="bold"
          borderRadius="12"
          height="55"
          marginTop="20"
          (tap)="actualiser()">
        </Button>

        <Button text="Réinitialiser l'entraînement"
          backgroundColor="#242424"
          color="#FF6B00"
          borderColor="#FF6B00"
          borderWidth="1"
          borderRadius="12"
          height="50"
          marginTop="10"
          (tap)="reinitialiser()">
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

  estTermine(nom: string): boolean {
    return ApplicationSettings.getBoolean(
      'sportfit_' + nom, false
    );
  }

  actualiser() {

    const termines = this.exercices.filter(exercice =>
      this.estTermine(exercice.nom)
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
      this.message = 'Félicitations ! Programme terminé à 100 % !';
    }
  }

  async reinitialiser() {

    const confirmation = await Dialogs.confirm({
      title: 'Réinitialisation',
      message: 'Veux-tu vraiment effacer tes progrès ?',
      okButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    });

    if (!confirmation) {
      return;
    }

    this.exercices.forEach(exercice =>
      ApplicationSettings.remove(
        'sportfit_' + exercice.nom
      )
    );

    this.actualiser();
  }
}
