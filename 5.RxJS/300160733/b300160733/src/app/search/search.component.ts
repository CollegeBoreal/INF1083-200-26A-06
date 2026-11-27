import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, TimeoutError } from 'rxjs';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  name = '';
  countries: Country[] = [];
  loading = false;
  message = '';

  constructor(
    private readonly apiService: ApicallService,
    private readonly destroyRef: DestroyRef,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  searchCapital(): void {
    const capital = this.name.trim();
    if (!capital || this.loading) {
      return;
    }

    this.loading = true;
    this.countries = [];
    this.message = 'Recherche en cours…';

    this.apiService.searchCountryByName(capital).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.loading = false;
        this.changeDetector.markForCheck();
      }),
    ).subscribe({
      next: (countries) => {
        this.countries = countries;
        this.message = countries.length ? '' : 'Aucun pays trouvé.';
      },
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.message = 'Aucun pays trouvé (HTTP 404).';
        } else if (error instanceof HttpErrorResponse && error.status > 0) {
          this.message = 'Erreur de l’API (HTTP ' + error.status + ').';
        } else if (error instanceof TimeoutError) {
          this.message = 'Le délai de réponse de l’API a été dépassé.';
        } else {
          this.message = 'Impossible de joindre l’API des pays.';
        }
        console.error('Recherche de capitale :', error);
      },
    });
  }
}
