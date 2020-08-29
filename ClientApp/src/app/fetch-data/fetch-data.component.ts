import { Component, Inject } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public countries: Country[];
  public selectedCountries: Array<string>;
  public httpClient: HttpClient;
  public serviceUrl: string;
  public regions: ExtendedRegion[];
  public selectedRegions: Array<string>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.serviceUrl = baseUrl;
    http.get<Country[]>(baseUrl + 'Countries').subscribe(result => {
      this.countries = result;
    }, error => console.error(error));
  }
  clear(item: Country): void {
    this.selectedCountries = this.selectedCountries.filter((c) => { return c != item.code });
    this.selectedRegions = null;
    this.filterRegions();
  }
  filterRegions(): void {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = this.selectedCountries;
    this.httpClient.post<Array<ExtendedRegion>>(this.serviceUrl + 'Countries', body, {
      headers
    }).subscribe(res => {
      this.regions = res;
    }), err => {
      console.error(err)
    }
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Country {
  name: string;
  code: string;
  flagLink: string;
}

interface Region {
  name: string;
  shortCode: string;
}

interface ExtendedRegion {
  name: string;
  code: string;
  countryCode: string;
}
