import { BaseEntityModel } from './baseEntity.model';
import { Weather } from './weather.model';

export interface City extends BaseEntityModel {
  name?: string;
  latitude?: number;
  longitude?: number;
  forecasts: Weather[];
}
