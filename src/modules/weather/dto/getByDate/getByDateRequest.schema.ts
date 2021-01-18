import * as JoiBase from '@hapi/joi';
import * as JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

export const GetForecastByDateRequestSchema = Joi.object({
  city: Joi.string().required(),
  date: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .optional(),
});
