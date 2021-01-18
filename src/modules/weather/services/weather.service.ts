import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity, WeatherEntity } from '../../../typeorm';
import { Between, Repository } from 'typeorm';
import { ConfigService } from '../../../modules/shared';
import * as dayjs from 'dayjs';
import {
  ApiBaseForecastResponse,
  ApiHourlyForecastResponse,
  IsEntityExist,
} from '../../../core';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getForecast(
    cityName: string,
    date?: string,
  ): Promise<{
    dateForecast: WeatherEntity[];
    todayForecast: WeatherEntity[];
    yesterdayForecast: WeatherEntity[];
  }> {
    const city = await IsEntityExist<CityEntity>(this.cityRepository, {
      name: cityName,
    });

    const dateForecast = await this.getForecastByDate(
      city,
      dayjs(date).format('YYYY-MM-DD'),
    );
    const todayForecast = await this.getForecastByDate(
      city,
      dayjs().format('YYYY-MM-DD'),
    );
    const yesterdayForecast = await this.getForecastByDate(
      city,
      dayjs()
        .subtract(1, 'day')
        .format('YYYY-MM-DD'),
    );

    return { dateForecast, todayForecast, yesterdayForecast };
  }

  private async getForecastByDate(
    city: CityEntity,
    date: string,
  ): Promise<WeatherEntity[]> {
    if (date) {
      const forecasts = await this.weatherRepository.find({
        city,
        dt: date,
      });

      return forecasts;
    }
  }

  async getAverageTemp(cityName: string, days: number) {
    const city = await IsEntityExist<CityEntity>(this.cityRepository, {
      name: cityName,
    });
    const forecasts = await this.weatherRepository.find({
      where: {
        dt:
          days > 0
            ? Between(
                dayjs()
                  .subtract(days, 'day')
                  .format('YYYY-MM-DD'),
                dayjs().format('YYYY-MM-DD'),
              )
            : dayjs().format('YYYY-MM-DD'),
        city,
      },
    });

    const average =
      forecasts.map(x => x.avg_temp).reduce((acc, curr) => acc + curr, 0) /
      forecasts.length;

    return average;
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async load(): Promise<WeatherEntity[]> {
    const requestObjects = await this.prepareRequestObjects();
    const forecasts: WeatherEntity[] = [];

    for (const { city, dt } of requestObjects) {
      const { data } = await this.getForecastFromApi(
        city.latitude,
        city.longitude,
        dt,
      );

      const avg_temp = await this.calculateAvgTemp(data.hourly);

      forecasts.push({
        dt: dayjs.unix(data.current.dt).toDate(),
        sunrise: dayjs.unix(data.current.sunrise).toDate(),
        sunset: dayjs.unix(data.current.sunset).toDate(),
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        avg_temp,
        pressure: data.current.pressure,
        humidity: data.current.humidity,
        clouds: data.current.clouds,
        wind_speed: data.current.wind_speed,
        description: data.current.weather[0].description,
        city: city,
      });
    }

    await this.deleteMany();
    const result = await this.saveMany(forecasts);

    return result;
  }

  private async saveMany(forecasts: WeatherEntity[]): Promise<WeatherEntity[]> {
    const result = await this.weatherRepository.save(forecasts);
    return result;
  }

  private async deleteMany(): Promise<void> {
    const weathers = await this.weatherRepository.find();
    await this.weatherRepository.remove(weathers);
  }

  private async prepareRequestObjects(): Promise<
    { city: CityEntity; dt: number }[]
  > {
    const cities = await this.prepareCity();
    const timestamps = await this.prepareTimestamps();
    const requestObjects: {
      city: CityEntity;
      dt: number;
    }[] = [];

    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < timestamps.length; j++) {
        requestObjects.push({
          city: cities[i],
          dt: timestamps[j],
        });
      }
    }

    return requestObjects;
  }

  private async prepareCity(): Promise<CityEntity[]> {
    const cities = await this.cityRepository.find();
    return cities;
  }

  private async prepareTimestamps(): Promise<number[]> {
    const now = dayjs();
    const timestamps: number[] = [];

    for (let i = 0; i < 5; i++) {
      const previousDay = now.subtract(i, 'day').unix();
      timestamps.push(previousDay);
    }

    return timestamps;
  }

  /**
   *
   * @param lat number - latitude
   * @param lon number - longitude
   * @param dt number - unix timestamp
   */
  private async getForecastFromApi(lat: number, lon: number, dt: number) {
    const result = await this.httpService.get<ApiBaseForecastResponse>(
      this.configService.get('weather_api_url'),
      {
        params: {
          lat,
          lon,
          dt,
          appid: this.configService.get('weather_api_key'),
          units: 'metric',
        },
      },
    );
    return result.toPromise();
  }

  /**
   *
   * @param hourlyForecast Object -  hourly forecast response from the api
   */
  private async calculateAvgTemp(
    hourlyForecast: ApiHourlyForecastResponse[],
  ): Promise<number> {
    const avg_temp =
      hourlyForecast.reduce((acc, curr) => acc + curr.temp, 0) /
      hourlyForecast.length;

    return avg_temp;
  }
}
