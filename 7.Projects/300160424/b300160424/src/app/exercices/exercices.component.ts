
import { Component, NO_ERRORS_SCHEMA, OnDestroy } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ApplicationSettings, View } from '@nativescript/core';

@Component({
  selector: 'app-exercices',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],

  template: `
    <ActionBar title="SPORTFIT | WORKOUT"
      backgroundColor="#101010"
      color="#FF6B00">
    </ActionBar>

    <ScrollView backgroundColor="#101010">
      <StackLayout padding="18">

        <Label text="FULL BODY TRAINING"
          color="#FF6B00"
          fontSize="14"
          fontWeight="bold">
        </Label>

        <Label text="Mon entraînement"
          fontSize="28"
          fontWeight="bold"
          color="white"
          marginTop="8">
        </Label>

        <Label text="Repousse tes limites !"
          color="#AAAAAA"
          fontSize="15"
          marginTop="5">
        </Label>

        <StackLayout
          backgroundColor="#242424"
          borderRadius="20"
          padding="20"
          marginTop="20">

          <Label text="CHRONOMÈTRE"
            color="#AAAAAA"
            fontSize="15"
            fontWeight="bold"
            textAlignment="center">
          </Label>

          <Label [text]="temps"
            color="#FF6B00"
            fontSize="55"
            fontWeight="bold"
            textAlignment="center"
            marginTop="10">
          </Label>

          <Label
            [text]="timer !== null ? '● En cours' : 'En pause'"
            color="#AAAAAA"
            textAlignment="center"
            marginBottom="12">
          </Label>

          <GridLayout columns="*, *, *">

            <Button col="0" text="▶ Start"
              backgroundColor="#FF6B00"
              color="white"
              borderRadius="12"
              fontWeight="bold"
              (tap)="demarrer()">
            </Button>

            <Button col="1" text="Pause"
              backgroundColor="#414141"
              color="white"
              borderRadius="12"
              (tap)="pause()">
            </Button>

            <Button col="2" text="Reset"
              backgroundColor="#414141"
              color="white"
              borderRadius="12"
              (tap)="reset()">
            </Button>

          </GridLayout>

        </StackLayout>

        <StackLayout
          backgroundColor="#242424"
          borderRadius="16"
          padding="15"
          marginTop="15">

          <GridLayout columns="*, auto">

            <Label col="0"
              text="Progression"
              color="white"
              fontWeight="bold"
              fontSize="18">
            </Label>

            <Label col="1"
              [text]="nombreTermines + '/4'"
              color="#FF6B00"
              fontWeight="bold"
              fontSize="20">
            </Label>

          </GridLayout>

          <Progress
            [value]="nombreTermines * 25"
            [maxValue]="100"
            color="#FF6B00"
            backgroundColor="#414141"
            height="12"
            marginTop="10">
          </Progress>

        </StackLayout>

        <Label text="TES EXERCICES"
          color="white"
          fontSize="20"
          fontWeight="bold"
          marginTop="25"
          marginBottom="15">
        </Label>

        <StackLayout
          *ngFor="let exercice of exercices"
          backgroundColor="#242424"
          borderRadius="18"
          marginBottom="18">

          <Label [text]="exercice.icone" fontSize="45" textAlignment="center" marginTop="15"></Label>

          <StackLayout padding="18">

            <Label [text]="exercice.nom"
              color="white"
              fontSize="25"
              fontWeight="bold">
            </Label>

            <Label [text]="exercice.duree"
              color="#FF6B00"
              fontSize="17"
              fontWeight="bold"
              marginTop="5">
            </Label>

            <Label [text]="exercice.description"
              color="#BBBBBB"
              textWrap="true"
              fontSize="15"
              marginTop="8">
            </Label>

            <Button
              [text]="estTermine(exercice.nom) ? '✓ TERMINÉ' : 'TERMINER L’EXERCICE'"
              [backgroundColor]="estTermine(exercice.nom) ? '#166534' : '#FF6B00'"
              [isEnabled]="!estTermine(exercice.nom)"
              color="white"
              fontWeight="bold"
              borderRadius="12"
              height="50"
              marginTop="15"
              (tap)="terminer(exercice.nom, $event)">
            </Button>

          </StackLayout>

        </StackLayout>

        <Label [text]="message"
          color="#FF6B00"
          fontSize="18"
          fontWeight="bold"
          textWrap="true"
          textAlignment="center"
          marginBottom="20">
        </Label>

      </StackLayout>
    </ScrollView>
  `
})
export class ExercicesComponent implements OnDestroy {

  secondes = 0;
  temps = '00:00';
  message = '';

  timer: ReturnType<typeof setInterval> | null = null;

  exercices = [
    {
      nom: 'Pompes',
      icone: '💪',
      duree: '3 séries de 10',
      description: 'Renforcer les bras et les pectoraux.',
      image: '~/images/pompes.jpg'
    },
    {
      nom: 'Squats',
      icone: '🏋️',
      duree: '3 séries de 15',
      description: 'Renforcer les jambes.',
      image: '~/images/squats.jpg'
    },
    {
      nom: 'Abdominaux',
      icone: '🔥',
      duree: '3 séries de 20',
      description: 'Renforcer les muscles abdominaux.',
      image: '~/images/abdominaux.jpg'
    },
    {
      nom: 'Course',
      icone: '🏃',
      duree: '15 minutes',
      description: 'Améliorer ton endurance.',
      image: '~/images/course.jpg'
    }
  ];

  get nombreTermines(): number {
    return this.exercices.filter(exercice =>
      this.estTermine(exercice.nom)
    ).length;
  }

  demarrer() {
    if (this.timer !== null) {
      return;
    }

    this.timer = setInterval(() => {
      this.secondes++;
      this.afficherTemps();
    }, 1000);
  }

  pause() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  reset() {
    this.pause();
    this.secondes = 0;
    this.afficherTemps();
  }

  afficherTemps() {
    const minutes = Math.floor(this.secondes / 60);
    const secondes = this.secondes % 60;

    this.temps =
      String(minutes).padStart(2, '0') + ':' +
      String(secondes).padStart(2, '0');
  }

  estTermine(nom: string): boolean {
    return ApplicationSettings.getBoolean(
      'sportfit_' + nom, false
    );
  }

  terminer(nom: string, event: any) {

    if (this.estTermine(nom)) {
      return;
    }

    ApplicationSettings.setBoolean(
      'sportfit_' + nom, true
    );

    this.message = 'Bravo ! ' + nom + ' terminé !';

    const bouton = event.object as View;

    bouton.animate({
      scale: { x: 0.95, y: 0.95 },
      duration: 150
    }).then(() => {
      return bouton.animate({
        scale: { x: 1, y: 1 },
        duration: 150
      });
    }).catch(() => {});

    if (this.nombreTermines === 4) {
      this.message =
        '🏆 Félicitations ! Programme terminé à 100 % !';
    }
  }

  ngOnDestroy() {
    this.pause();
  }
}


