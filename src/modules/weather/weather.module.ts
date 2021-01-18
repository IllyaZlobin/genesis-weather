import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './services/weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity, WeatherEntity, WeatherHistoryEntity } from '../../typeorm';
import { CheckCityMiddleware } from '../../core';
import { WeatherHistoryService } from './services/weatherHistory.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([WeatherEntity, CityEntity, WeatherHistoryEntity]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherHistoryService],
})
export class WeatherModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckCityMiddleware).forRoutes(WeatherController);
  }
}
