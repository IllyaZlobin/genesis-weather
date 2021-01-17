import { BaseEntityModel } from './baseEntity.model';
import { City } from './city.model';

export interface Weather extends BaseEntityModel {
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
