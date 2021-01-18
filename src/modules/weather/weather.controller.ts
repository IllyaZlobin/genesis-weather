import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './services/weather.service';
import { GetForecastByDateRequest } from './dto/getByDate/getByDate.request';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMostSearchableCityResponse } from './dto/getSearchableCity/getSearchableCity.response';
import { WeatherHistoryService } from './services/weatherHistory.service';

@Controller('weather')
@ApiTags('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly weatherHistoryService: WeatherHistoryService,
  ) {}

  @Get('/')
  @ApiOperation({
    description:
      'Get forecast info for selected day and city. Available dates between today and 4 days before',
  })
  async getForecastByDate(@Query() model: GetForecastByDateRequest) {
    const response = await this.weatherService.getForecast(
      model.city,
      model.date,
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
}
