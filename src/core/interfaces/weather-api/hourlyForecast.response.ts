import { ApiWeatherResponse } from './weather.response';

export interface ApiHourlyForecastResponse {
  dt?: number;
  temp?: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  clouds?: number;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;
  weather?: ApiWeatherResponse[];
}
