import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);

  const config = require('config')
  const serverConfig = config.get('server')
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application logging on port ${port}`)
}
bootstrap();
