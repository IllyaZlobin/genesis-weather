import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  setupFilters,
  setupInterceptors,
  setupPipes,
  setupSwagger,
} from './setups';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupPipes(app);
  setupFilters(app);
  setupInterceptors(app);
  setupSwagger(app, 'Genesis. Weather API', 'Apis', '1.0.0');

  await app.listen(3000);
}
bootstrap();
