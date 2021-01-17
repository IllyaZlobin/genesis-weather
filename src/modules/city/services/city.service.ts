import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async getAvailable(): Promise<{ name: string }[]> {
    const cities = await this.cityRepository.find();
    const result = cities.map(x => ({ name: x.name }));
    return result;
  }
}
