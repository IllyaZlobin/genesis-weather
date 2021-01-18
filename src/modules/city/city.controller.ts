import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetAllCitiesResponse } from './dto/getAll/getAll.response';
import { CityService } from './services/city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiOkResponse({ type: GetAllCitiesResponse })
  @ApiOperation({ summary: 'Return list of available city names' })
  async getAllAvailable() {
    const cities = await this.cityService.getAvailable();
    const response = new GetAllCitiesResponse(cities);
    return response;
  }
}
