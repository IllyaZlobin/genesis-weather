import { Column, Entity, Index } from 'typeorm';
import { City } from '../interfaces';
import { AbstractEntity } from './abstract.entity';

@Entity('city')
export class CityEntity extends AbstractEntity implements City {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name?: string;

  @Column({ type: 'float', nullable: false })
  latitude?: number;

  @Column({ type: 'float', nullable: false })
  longitude?: number;
}
