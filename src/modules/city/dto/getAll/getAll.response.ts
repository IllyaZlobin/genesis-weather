export class GetAllCitiesResponse {
  cities: Required<{ name: string }>[];

  constructor(cities?: Required<{ name: string }>[]) {
    this.cities = cities;
  }
}
