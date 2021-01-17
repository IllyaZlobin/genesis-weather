import { ConfigService } from '../modules/shared';

const connectionOptions = () => {
  const configService = new ConfigService();
  return configService.TypeOrmConfig;
};

export = connectionOptions();
