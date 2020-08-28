import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public countries: Country[];
  public selectedCountries: Country[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Country[]>(baseUrl + 'Countries').subscribe(result => {
      this.countries = result;
    }, error => console.error(error));
  }
  clear(item: Country): void {
    this.selectedCountries = this.selectedCountries.filter((c) => { return c.countryShortCode != item.countryShortCode });
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Country {
  countryName: string;
  countryShortCode: string;
  regions: Array<Region>;
  flagLink: string;
}

interface Region {
  name: string;
  shortCode: string;
}
