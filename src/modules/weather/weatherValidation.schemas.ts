import { JoiRegisteredSchemas } from '../../core';
import { GetAverageTempRequestSchema } from './dto/getAverageTemp/getAverageTempRequest.schema';
import { GetForecastByDateRequestSchema } from './dto/getByDate/getByDateRequest.schema';

export const WeatherValidationSchemas: JoiRegisteredSchemas = {
  GetForecastByDateRequest: GetForecastByDateRequestSchema,
  GetAverageTempRequest: GetAverageTempRequestSchema,
};
