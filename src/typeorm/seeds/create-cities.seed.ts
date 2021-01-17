import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CityEntity } from '../entities';

export default class CreateCitiesSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CityEntity)
      .values(CITIES)
      .execute();
  }
}

const CITIES = [
  {
    name: 'Vienna',
    latitude: 48.2,
    longitude: 16.366667,
  },
  {
    name: 'Prague',
    latitude: 50.083333333333336,
    longitude: 14.466667,
  },
  {
    name: 'Paris',
    latitude: 48.86666666666667,
    longitude: 2.333333,
  },
  {
    name: 'Berlin',
    latitude: 52.516666666666666,
    longitude: 13.4,
  },
  {
    name: 'Budapest',
    latitude: 47.5,
    longitude: 19.083333,
  },
  {
    name: 'Rome',
    latitude: 41.9,
    longitude: 12.483333,
  },
  {
    name: 'Vilnius',
    latitude: 54.68333333333333,
    longitude: 25.316667,
  },
  {
    name: 'Monaco',
    latitude: 43.733333333333334,
    longitude: 7.416667,
  },
  {
    name: 'Amsterdam',
    latitude: 52.35,
    longitude: 4.916667,
  },
  {
    name: 'Madrid',
    latitude: 40.4,
    longitude: -3.683333,
  },
  {
    name: 'Kyiv',
    latitude: 50.43333333333333,
    longitude: 30.516667,
  },
  {
    name: 'London',
    latitude: 51.5,
    longitude: -0.083333,
  },
];
