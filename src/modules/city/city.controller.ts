import { Controller, Get } from '@nestjs/common';
import { GetAllCitiesResponse } from './dto/getAll/getAll.response';
import { CityService } from './services/city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAllAvailable() {
    const cities = await this.cityService.getAvailable();
    const response = new GetAllCitiesResponse(cities);
    return response;
  }
}
