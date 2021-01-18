import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { WeatherHistoryEntity } from '../entities';

export default class CreateWeatherHistorySeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(WeatherHistoryEntity)
      .values(HISTORIES)
      .execute();
  }
}

const HISTORIES = [{ city: 'Kyiv' }, { city: 'Kyiv' }, { city: 'London' }];
