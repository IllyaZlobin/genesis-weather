import { WeatherDto } from '../common/weather.dto';

export class GetForecastByDateResponse {
  dateForecast: WeatherDto[];
  todayForecast: WeatherDto[];
  yesterdayForecast: WeatherDto[];

  constructor(
    dateForecast?: WeatherDto[],
    todayForecast?: WeatherDto[],
    yesterdayForecast?: WeatherDto[],
  ) {
    this.dateForecast = dateForecast;
    this.todayForecast = todayForecast;
    this.yesterdayForecast = yesterdayForecast;
  }
}
