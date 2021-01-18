import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherHistoryEntity } from '../../../typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherHistoryService {
  constructor(
    @InjectRepository(WeatherHistoryEntity)
    private readonly weatherHistoryRepository: Repository<WeatherHistoryEntity>,
  ) {}

  async getMostSearchableCity(): Promise<{ city: string; total: number }> {
    const [result] = (await this.weatherHistoryRepository
      .createQueryBuilder('weather_history')
      .select('COUNT(weather_history.city)', 'total')
      .addSelect('weather_history.city', 'city')
      .groupBy('weather_history.city')
      .having('COUNT(weather_history.city) > 0')
      .orderBy('total', 'DESC')
      .execute()) as { city: string; total: number }[];

    return result;
  }
}
