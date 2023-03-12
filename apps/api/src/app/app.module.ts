// Libraries
import * as Joi from 'joi';
import { Module } from '@nestjs/common';
// Modules
import { ConfigModule } from '@nestjs/config';
import { RoutingModule } from './app.routing';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
      validationSchema: Joi.object({
        // Basic
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3001),
        DISABLE_LOGGING: Joi.boolean().default(false),
        NAME: Joi.string().required(),
        // Folders
        HOT_FOLDER: Joi.string().default('/media/hot'),
        COLD_FOLDER: Joi.string().default('/media/cold'),
        // Database
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(true),
      }),
    }),
    RoutingModule,
    DatabaseModule,
  ],
})
export class AppModule {}
