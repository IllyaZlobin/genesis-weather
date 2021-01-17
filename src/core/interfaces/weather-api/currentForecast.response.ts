import { ApiWeatherResponse } from './weather.response';

export interface ApiCurrentForecastResponse {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  temp?: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  uvi?: number;
  clouds?: number;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;
  weather?: ApiWeatherResponse[];
}
