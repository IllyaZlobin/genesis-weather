import * as dayjs from 'dayjs';

export class GetForecastByDateRequest {
  city: string;
  date?: string = dayjs().format('YYYY-MM-DD');
}
