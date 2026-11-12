import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'
import { ApicallService } from '../shared/apicall.service'
import { Country } from '../shared/country'

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchComponent implements OnInit {
  name: string
  countries: Array<Country>

  constructor(private apiService: ApicallService) {}

  ngOnInit(): void {}

  searchCapital() {
    this.apiService
      .searchCountryByName(this.name)
      .subscribe((data: Country[]) => {
        console.log(data)
        this.countries = data
      })
  }
}