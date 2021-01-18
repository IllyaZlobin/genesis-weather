import { City, Weather } from '../../../../typeorm';

export class WeatherDto implements Weather {
  dt?: Date;
  sunrise?: Date;
  sunset?: Date;
  temp?: number;
  feels_like?: number;
  avg_temp?: number;
  pressure?: number;
  humidity?: number;
  clouds?: number;
  wind_speed?: number;
  description?: string;
  city?: City;
}
