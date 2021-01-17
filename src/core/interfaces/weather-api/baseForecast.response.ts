import { ApiCurrentForecastResponse } from './currentForecast.response';
import { ApiHourlyForecastResponse } from './hourlyForecast.response';

export interface ApiBaseForecastResponse {
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: ApiCurrentForecastResponse;
  hourly?: ApiHourlyForecastResponse[];
}
