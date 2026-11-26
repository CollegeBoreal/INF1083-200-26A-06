import { Component, NO_ERRORS_SCHEMA, OnDestroy } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';

@Component({
  selector: 'app-exercices',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="SportFit - Exercices"
      backgroundColor="#15803d" color="white">
    </ActionBar>

    <ScrollView backgroundColor="#101713">
      <StackLayout padding="20">

        <Label text="💪 Mon entraînement"
          fontSize="27"
          fontWeight="bold"
          color="#4ade80"
          textAlignment="center">
        </Label>

        <StackLayout backgroundColor="#22332a"
          borderRadius="20"
          padding="20"
          marginTop="20"
          marginBottom="20">

          <Label text="⏱️ Chronomètre"
            color="white"
            fontSize="20"
            textAlignment="center">
          </Label>

          <Label [text]="temps"
            color="#4ade80"
            fontSize="45"
            fontWeight="bold"
            textAlignment="center">
          </Label>

          <GridLayout columns="*, *, *">

            <Button col="0" text="Start"
              backgroundColor="#22c55e"
              color="black"
              (tap)="demarrer()">
            </Button>

            <Button col="1" text="Pause"
              backgroundColor="#eab308"
              color="black"
              (tap)="pause()">
            </Button>

            <Button col="2" text="Reset"
              backgroundColor="#dc2626"
              color="white"
              (tap)="reset()">
            </Button>

          </GridLayout>

        </StackLayout>

        <StackLayout *ngFor="let exercice of exercices"
          backgroundColor="#22332a"
          borderRadius="18"
          padding="18"
          marginBottom="15">

          <GridLayout columns="65, *">

            <Label col="0"
              [text]="exercice.icone"
              fontSize="40"
              verticalAlignment="center">
            </Label>

            <StackLayout col="1">

              <Label [text]="exercice.nom"
                color="white"
                fontSize="23"
                fontWeight="bold">
              </Label>

              <Label [text]="exercice.duree"
                color="#4ade80"
                fontSize="16">
              </Label>

              <Label [text]="exercice.description"
                color="#a7c4b0"
                textWrap="true"
                fontSize="14"
                marginTop="5">
              </Label>

            </StackLayout>

          </GridLayout>

          <Button
            [text]="estTermine(exercice.nom) ? '✓ Terminé' : 'Terminer exercice'"
            [backgroundColor]="estTermine(exercice.nom) ? '#166534' : '#22c55e'"
            color="white"
            fontWeight="bold"
            borderRadius="12"
            marginTop="12"
            (tap)="terminer(exercice.nom)">
          </Button>

        </StackLayout>

        <Label [text]="message"
          color="#4ade80"
          fontSize="18"
          textWrap="true"
          textAlignment="center">
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
      description: 'Renforcer les bras et les pectoraux.'
    },
    {
      nom: 'Squats',
      icone: '🏋️',
      duree: '3 séries de 15',
      description: 'Renforcer les jambes.'
    },
    {
      nom: 'Abdominaux',
      icone: '🔥',
      duree: '3 séries de 20',
      description: 'Renforcer les muscles abdominaux.'
    },
    {
      nom: 'Course',
      icone: '🏃',
      duree: '15 minutes',
      description: 'Améliorer ton endurance.'
    }
  ];

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

  terminer(nom: string) {
    ApplicationSettings.setBoolean(
      'sportfit_' + nom, true
    );

    this.message = '🎉 Bravo ! ' + nom + ' terminé !';
  }

  ngOnDestroy() {
    this.pause();
  }
}