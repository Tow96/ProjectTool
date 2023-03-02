/** main.ts
 * Copyright (c) 2022, Towechlabs
 *
 * Code that starts the app
 */
// Libraries
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PidWinstonLogger } from '@shared/logger';
// Modules
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// Services
import { ConfigService } from '@nestjs/config';
import { TrimPipe } from './pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: PidWinstonLogger.transports(),
    }),
  });
  const configService = app.get(ConfigService);

  // Adds the body trimming pipe
  app.useGlobalPipes(new TrimPipe());
  app.useGlobalPipes(new ValidationPipe());

  // Enables CORS only if development
  if (configService.get('NODE_ENV') === 'development') app.enableCors();

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Project Manager Tool')
    .setDescription('Another somewhat overkill app to organize project folders')
    .setVersion('1.0')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(configService.get('PORT'));
}
bootstrap();
