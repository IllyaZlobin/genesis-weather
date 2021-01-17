import { Column, Entity, ManyToOne } from 'typeorm';
import { Weather } from '../interfaces';
import { AbstractEntity } from './abstract.entity';
import { CityEntity } from './city.entity';

@Entity('weather')
export class WeatherEntity extends AbstractEntity implements Weather {
  @Column({ type: 'date', nullable: false })
  dt?: Date;

  @Column({ type: 'date', nullable: false })
  sunrise?: Date;

  @Column({ type: 'date', nullable: false })
  sunset?: Date;

  @Column({ type: 'float', nullable: false })
  temp?: number;

  @Column({ type: 'float', nullable: false })
  feels_like?: number;

  @Column({ type: 'float', nullable: false })
  avg_temp?: number;

  @Column({ type: 'int', nullable: false })
  pressure?: number;

  @Column({ type: 'int', nullable: false })
  humidity?: number;

  @Column({ type: 'int', nullable: false })
  clouds?: number;

  @Column({ type: 'float', nullable: false })
  wind_speed?: number;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ManyToOne(
    () => CityEntity,
    city => city.forecasts,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  city?: CityEntity;
}
