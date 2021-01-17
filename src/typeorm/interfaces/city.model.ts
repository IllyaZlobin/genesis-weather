import { BaseEntityModel } from './baseEntity.model';

export interface City extends BaseEntityModel {
  name?: string;
  latitude?: number;
  longitude?: number;
}
