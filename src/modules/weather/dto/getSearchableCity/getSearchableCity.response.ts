export class GetMostSearchableCityResponse {
  city: string;
  total: number;

  constructor(city?: string, total?: number) {
    this.city = city;
    this.total = total;
  }
}
