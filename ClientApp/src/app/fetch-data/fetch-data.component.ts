import { Component, Inject } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { SelectControlValueAccessor } from '@angular/forms';
import { NgOption } from '@ng-select/ng-select';

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
  public selectedRegions: Array<ExtendedRegion>;
  public minAge: number;
  public maxAge: number;
  public categories: Category[];
  public categoriesBuffer: Category[];
  public selectedCategories: Category[];
  public bufferSize: number = 50;
  public numberOfItemsFromEndBeforeFetchingMore: number = 10;
  public loading: boolean = false;
  public companySizeOptions: any[] = [
    { value: '1-10', label: '1-10' },
    { value: '11-50', label: '11-50' },
    { value: '51-100', label: '51-100' },
    { value: '101-250', label: '101-250' },
    { value: '251-500', label: '251-500' },
    { value: '501-1000', label: '501-1000' },
    { value: '1001-5000', label: '10001-5000' },
    { value: '5001-10000', label: '5001-10000' },
    { value: '10000+', label: '10000+' },
  ];
  public selectedCompanySize: string;

  public rankByAgeOptionsInputs: any[] = [
    { id: 1, nested: { cat: 'Age', name: 'Desc \u2193' } },
    { id: 2, nested: { cat: 'Age', name: 'Asc \u2191' } },
  ];

  public rankByScoreOptionsInputs: any[] = [
    { id: 3, nested: { cat: 'Alpha10x score', name: 'Desc \u2193' } },
    { id: 4, nested: { cat: 'Alpha10x score', name: 'Asc \u2191' } },
  ];

  public rankByRaisedMoneyOptionsInputs: any[] = [
    { id: 5, nested: { cat: 'Raised money', name: 'Desc \u2193' } },
    { id: 6, nested: { cat: 'Raised money', name: 'Asc \u2191' } },
  ];

  public selectedRankByOptions: RankByOptions[];
  public selectedRankByAge: any;
  public selectedRankByScore: any;
  public selectedRankByRaisedMoney: any;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.serviceUrl = baseUrl;
    http.get<Country[]>(baseUrl + 'Countries').subscribe(result => {
      this.countries = result;
    }, error => console.error(error));

    http.get<Category[]>(baseUrl + 'Categories').subscribe(result => {
      this.categories = result;
      this.categoriesBuffer = this.categories.slice(0, this.bufferSize);
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

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.categories.length <= this.categoriesBuffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.categoriesBuffer.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.categoriesBuffer.length;
    const more = this.categories.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.categoriesBuffer = this.categoriesBuffer.concat(more);
    }, 200)
  }
  shouldDisableSearchButton(): boolean {
    if (this.selectedCountries
      && this.selectedRegions
      && this.selectedCategories
      && this.selectedCompanySize
      && this.minAge
      && this.maxAge) {
      return !(this.selectedCountries.length > 0
        && this.selectedRegions.length > 0
        && this.selectedCategories.length > 0
        && this.selectedCompanySize.length > 0);
    }
    else
      return true;
  }
  onSearchButtonClick(): void {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let rankedByAgeDesc: boolean;
    let rankedByScoreDesc: boolean;
    let rankedByRaisedMoneyDesc: boolean;

    if (this.selectedRankByAge != null && this.selectedRankByAge.id == "1")
      rankedByAgeDesc = true;
    else
      rankedByAgeDesc = false;

    if (this.selectedRankByScore != null && this.selectedRankByScore.id == "3")
      rankedByScoreDesc = true;
    else
      rankedByScoreDesc = false;

    if (this.selectedRankByRaisedMoney != null && this.selectedRankByRaisedMoney.id == "5")
      rankedByRaisedMoneyDesc = true;
    else
      rankedByRaisedMoneyDesc = false;

    let inputBody: any = new searchInput(this.minAge, this.maxAge, this.selectedCompanySize, this.selectedCategories.map(a => a.childCategory), this.selectedRegions, rankedByAgeDesc, rankedByRaisedMoneyDesc, rankedByScoreDesc);
    let body = inputBody;
    this.httpClient.post<boolean>(this.serviceUrl + 'Search', body, {
      headers
    }).subscribe(res => {
      console.log("post succeedded");
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

interface Category {
  parentCategory: string;
  childCategory: string;
}

interface ISearchInput {
  minAge: number;
  maxAge: number;
  size: string;
  categories: Array<string>;
  regionsAndCountries: Array<ExtendedRegion>;
}

class searchInput {
  minAge: number;
  maxAge: number;
  size: string;
  categories: Array<string>;
  regionsAndCountries: Array<ExtendedRegion>;
  rankedByAgeDesc: boolean;
  rankedByRaisedMoneyDesc: boolean;
  rankedByScoreDesc: boolean;
  constructor(minAge: number, maxAge: number, size: string, categories: Array<string>, regionsAndCountries: Array<ExtendedRegion>, rankedByAgeDesc: boolean, rankedByRaisedMoneyDes: boolean, rankedByScoreDesc: boolean) {
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.size = size;
    this.categories = categories;
    this.regionsAndCountries = regionsAndCountries;
    this.rankedByAgeDesc = rankedByAgeDesc;
    this.rankedByRaisedMoneyDesc = rankedByRaisedMoneyDes;
    this.rankedByScoreDesc = rankedByScoreDesc;
  }
}

class RankByOptions {
  orderByOptionName: string;
  isDesc: boolean;
  constructor(descOrAscOptionName: string, isDescOption: boolean) {
    this.orderByOptionName = descOrAscOptionName;
    this.isDesc = isDescOption;
  }
}

