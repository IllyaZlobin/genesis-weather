export class GetAverageTempResponse {
  average_temperature: number;

  constructor(average_temperature?: number) {
    this.average_temperature = average_temperature;
  }
}
