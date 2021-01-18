import * as Joi from '@hapi/joi';
import { GetAverageTempRequest } from './getAverageTemp.request';

export const GetAverageTempRequestSchema = Joi.object<GetAverageTempRequest>({
  city: Joi.string().required(),
  days: Joi.number()
    .integer()
    .min(0)
    .max(4)
    .default(0)
    .optional(),
});
