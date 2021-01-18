import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './services/weather.service';
import { GetForecastByDateRequest } from './dto/getByDate/getByDate.request';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMostSearchableCityResponse } from './dto/getSearchableCity/getSearchableCity.response';
import { WeatherHistoryService } from './services/weatherHistory.service';
import { GetForecastByDateResponse } from './dto/getByDate/getByDate.response';
import { GetAverageTempRequest } from './dto/getAverageTemp/getAverageTemp.request';
import { GetAverageTempResponse } from './dto/getAverageTemp/getAverageTemp.response';

@Controller('weather')
@ApiTags('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly weatherHistoryService: WeatherHistoryService,
  ) {}

  @Get('/')
  @ApiOperation({
    summary:
      'Get forecast info for selected day and city. Available dates between today and 4 days before',
  })
  async getForecastByDate(
    @Query() model: GetForecastByDateRequest,
  ): Promise<GetForecastByDateResponse> {
    const { city, date } = model;

    const {
      dateForecast,
      todayForecast,
      yesterdayForecast,
    } = await this.weatherService.getForecast(city, date);

    const response = new GetForecastByDateResponse(
      dateForecast,
      todayForecast,
      yesterdayForecast,
    );

    return response;
  }

  @Get('/searchable-city')
  @ApiOkResponse({
    type: GetMostSearchableCityResponse,
    description: 'Return the most searchable city',
  })
  @ApiOperation({ summary: 'Get the most searchable city from database' })
  async getMostSearchableCity() {
    const {
      city,
      total,
    } = await this.weatherHistoryService.getMostSearchableCity();
    const response = new GetMostSearchableCityResponse(city, total);
    return response;
  }

  @Get('/avg')
  @ApiOperation({
    summary:
      'Get average temperature for passed days. Max days value = 4. If passed days - 0, will return average temperature for today. If passed days - 1, will return two-dat average temp (today and yesterday) etc.',
  })
  async getAverageTemp(@Query() model: GetAverageTempRequest) {
    const { city, days } = model;
    const average_temp = await this.weatherService.getAverageTemp(city, days);

    const response = new GetAverageTempResponse(average_temp);
    return response;
  }
}
