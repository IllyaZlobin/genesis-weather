import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules';
import { CityModule } from './modules/city/city.module';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [ScheduleModule.forRoot(), SharedModule, CityModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
