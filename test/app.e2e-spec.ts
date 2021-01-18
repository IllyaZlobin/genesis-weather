import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as dayjs from 'dayjs';
import { assert } from 'chai';
import { setupFilters, setupInterceptors, setupPipes } from './../src/setups';

describe('Weather Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupFilters(app);
    setupPipes(app);
    setupInterceptors(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/weather GET', () => {
    it('Should return valid array of forecast objects', async () => {
      return await request(app.getHttpServer())
        .get('/weather')
        .query({ city: 'Kyiv', date: dayjs().format('YYYY-MM-DD') })
        .expect(200)
        .expect(res => {
          const { data } = res.body;
          assert.hasAllKeys(data, [
            'dateForecast',
            'todayForecast',
            'yesterdayForecast',
          ]);

          const { dateForecast, todayForecast, yesterdayForecast } = data;

          assert.isArray(dateForecast);
          assert.isNotEmpty(dateForecast);

          assert.isArray(todayForecast);
          assert.isNotEmpty(todayForecast);

          assert.isArray(yesterdayForecast);
          assert.isNotEmpty(yesterdayForecast);

          for (const [key, value] of Object.entries(data)) {
            assert.hasAllKeys(value[0], [
              'id',
              'createdAt',
              'updatedAt',
              'dt',
              'sunrise',
              'sunset',
              'temp',
              'feels_like',
              'avg_temp',
              'pressure',
              'humidity',
              'clouds',
              'wind_speed',
              'description',
            ]);
          }
        });
    });

    it('Should return bad request if passed city is not exist', async () => {
      return await request(app.getHttpServer())
        .get('/weather')
        .query({ city: 'qwertyuiop' })
        .expect(400)
        .expect((err, res) => {
          const { errors } = err.body;

          assert.isArray(errors);
          assert.lengthOf(errors, 1);

          assert.hasAllKeys(errors[0], ['message', 'property']);
        });
    });
  });

  describe('/weather/searchable-city GET', () => {
    it('Should return 200 with valid object structure', async () => {
      return await request(app.getHttpServer())
        .get('/weather/searchable-city')
        .expect(200)
        .expect(res => {
          const { data } = res.body;
          assert.hasAllKeys(data, ['city', 'total']);
          assert.isNotNull(data.city);
          assert.isNotNull(data.total);
        });
    });
  });

  describe('/weather/avg GET', () => {
    it('Should return 200 with valid object structure', async () => {
      return await request(app.getHttpServer())
        .get('/weather/avg')
        .query({ city: 'Kyiv', days: 2 })
        .expect(200)
        .expect(res => {
          const { data } = res.body;
          assert.hasAllKeys(data, ['average_temperature']);
          assert.isNotNull(data.average_temperature);
        });
    });
  });
});
