import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './services/weather.service';
import { GetForecastByDateRequest } from './dto/getByDate/getByDate.request';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMostSearchableCityResponse } from './dto/getSearchableCity/getSearchableCity.response';
import { WeatherHistoryService } from './services/weatherHistory.service';
import { GetForecastByDateResponse } from './dto/getByDate/getByDate.response';

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

  @Get('/load')
  @ApiOperation({
    summary:
      'Load forecast information from external api and save into database. This endpoint runs automatic every 12 hours',
  })
  async load() {
    await this.weatherService.load();
  }
}
