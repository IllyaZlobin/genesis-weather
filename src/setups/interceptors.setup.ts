import { INestApplication } from '@nestjs/common';
import { BaseResponseInterceptor } from '../core';

export const setupInterceptors = (app: INestApplication): void => {
  app.useGlobalInterceptors(new BaseResponseInterceptor());
};
