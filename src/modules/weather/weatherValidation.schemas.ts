import { JoiRegisteredSchemas } from '../../core';
import { GetForecastByDateRequestSchema } from './dto/getByDate/getByDateRequest.schema';

export const WeatherValidationSchemas: JoiRegisteredSchemas = {
  GetForecastByDateRequest: GetForecastByDateRequestSchema,
};
