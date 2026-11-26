
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { TextField } from '@nativescript/core';
import { timeout } from 'rxjs';
import { ApicallService } from './shared/apicall.service';
import { Country } from './shared/country';

@Component({
  standalone: false,
  selector: 'ns-app',
  template: `
    <Frame>
      <Page>
        <GridLayout rows="auto, auto, auto, auto, *" padding="10">

          <Label
            row="0"
            text="Drapeaux du monde"
            fontSize="24"
            fontWeight="bold"
            textAlignment="center">
          </Label>

          <TextField
            #champPays
            row="1"
            hint="Rechercher un pays">
          </TextField>

          <StackLayout row="2">

            <Button
              text="Rechercher"
              (tap)="searchCountries()">
            </Button>

            <Button
              text="Recharger les drapeaux"
              (tap)="loadCountries()">
            </Button>

          </StackLayout>

          <Label
            row="3"
            [text]="message"
            textWrap="true"
            textAlignment="center">
          </Label>

          <ListView
            row="4"
            [items]="countries">

            <ng-template let-item="item">
              <StackLayout padding="15">

                <Label
                  [text]="item.name"
                  fontSize="20"
                  fontWeight="bold"
                  textAlignment="center">
                </Label>

                <Image
                  [src]="item.flag"
                  height="120"
                  stretch="aspectFit">
                </Image>

              </StackLayout>
            </ng-template>

          </ListView>

        </GridLayout>
      </Page>
    </Frame>
  `
})
export class AppComponent implements OnInit {

  @ViewChild('champPays', { static: false })
  champPays!: ElementRef<TextField>;

  countries: Country[] = [];
  message: string = '';
  loading: boolean = false;

  private allCountries: Country[] = [];

  constructor(
    private apiService: ApicallService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.message = 'Chargement des drapeaux...';

    this.apiService.getCountries()
      .pipe(timeout(15000))
      .subscribe({

        next: (data: Country[]) => {
          this.zone.run(() => {
            this.loading = false;
            this.allCountries = data;
            this.searchCountries();
          });
        },

        error: (error: any) => {
          this.zone.run(() => {
            this.loading = false;
            this.message =
              'Erreur : ' +
              (error?.message || String(error));
          });
        }

      });
  }

  searchCountries(): void {

    const texte = this.champPays
      ? String(this.champPays.nativeElement.text || '')
      : '';

    const search = this.normalize(texte.trim());

    this.zone.run(() => {

      this.countries = this.allCountries.filter(
        country =>
          this.normalize(country.name).includes(search)
      );

      if (this.countries.length === 0) {
        this.message = 'Aucun pays trouvé.';
      } else {
        this.message =
          this.countries.length + ' pays trouvé(s).';
      }

      console.log('Texte recherché :', texte);
      console.log('Résultat :', this.countries.length);
    });
  }

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }
}
