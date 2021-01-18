import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { WeatherService } from '../../modules/weather/services/weather.service';
import { INestApplication } from '@nestjs/common';

export default class CreateWeathersSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    let app: INestApplication;
    try {
      app = await NestFactory.create(AppModule);
      const weatherService: WeatherService = app.get(WeatherService);
      await weatherService.load();
      await app.close();
    } catch (err) {
      await app.close();
      throw err;
    }
  }
}
