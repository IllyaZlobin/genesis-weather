import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { CityEntity, WeatherHistoryEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { ValidationException } from '../exceptions';
import { IsEntityExist } from '../helpers';

@Injectable()
export class CheckCityMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(WeatherHistoryEntity)
    private readonly weatherHistoryRepository: Repository<WeatherHistoryEntity>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { city } = req.query;

    if (city) {
      const existedCity = await IsEntityExist<CityEntity>(this.cityRepository, {
        name: String(city),
      });

      if (!existedCity) {
        throw new ValidationException('City is not exist', ['city']);
      }

      const weatherHistory = new WeatherHistoryEntity();
      weatherHistory.city = existedCity.name;

      await this.weatherHistoryRepository.save(weatherHistory);

      next();
    } else {
      next();
    }
  }
}
