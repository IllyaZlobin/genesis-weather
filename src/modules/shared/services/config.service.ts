import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DatabaseEntities } from '../../../typeorm';

@Injectable()
export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `env/.${nodeEnv}.env`,
    });
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'dev';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'prod';
  }

  get isLocal(): boolean {
    return this.nodeEnv === 'local';
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('env') || 'local';
  }

  get TypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.get('db_host'),
      port: this.getNumber('db_port'),
      username: this.get('db_username'),
      password: this.get('db_password'),
      database: this.get('db_name'),
      synchronize: false,
      logger: 'simple-console',
      entities: DatabaseEntities,
      migrationsTableName: 'custom_migration_table',
      migrations: ['dist/typeorm/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/typeorm/migrations',
      },
      factories: ['src/typeorm/factories/**/*{.ts,.js}'],
      seeds: ['src/typeorm/seeds/**/*{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}
