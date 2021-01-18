import { Column, Entity } from 'typeorm';
import { WeatherHistory } from '../interfaces';
import { AbstractEntity } from './abstract.entity';

@Entity('weather_history')
export class WeatherHistoryEntity extends AbstractEntity
  implements WeatherHistory {
  @Column({ type: 'varchar', nullable: false })
  city?: string;
}
