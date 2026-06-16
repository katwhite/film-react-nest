import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TskvLogger } from './loggers/tskv.logger/tskv.logger';
import { JsonLogger } from './loggers/json.logger/json.logger';
import { DevLogger } from './loggers/dev.logger/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT ?? 3000;
  const logFormat = process.env.LOG_FORMAT ?? 'dev';
  let logger;
  switch (logFormat) {
    case 'json':
      logger = new JsonLogger();
      break;
    case 'tskv':
      logger = new TskvLogger();
      break;
    default:
      logger = new DevLogger();
      break;
  }
  app.useLogger(logger);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
