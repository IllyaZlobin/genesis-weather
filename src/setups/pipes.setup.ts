import { INestApplication } from '@nestjs/common';
import { WeatherValidationSchemas } from 'src/modules/weather/weatherValidation.schemas';
import { JoiValidationPipe } from '../core';

export const setupPipes = async (app: INestApplication) => {
  app.useGlobalPipes(new JoiValidationPipe({ ...WeatherValidationSchemas }));
};
