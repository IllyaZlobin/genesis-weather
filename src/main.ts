import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules';
import {
  setupFilters,
  setupInterceptors,
  setupPipes,
  setupSwagger,
} from './setups';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  setupPipes(app);
  setupFilters(app);
  setupInterceptors(app);
  setupSwagger(app, 'Genesis. Weather API', 'Apis', '1.0.0');

  const port = process.env.PORT || 3000;
  const env = config.nodeEnv;

  console.log(`APP RUN ON ${port}, ENV: ${env}`);

  await app.listen(3000);
}
bootstrap();
