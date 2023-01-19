/** database.module.ts
 * Copyright (c) 2023, Towechlabs
 *
 * Module that connects to the MariaDB
 */
// Libraries
import { Module } from '@nestjs/common';

// Modules
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { ConfigService } from '@nestjs/config';

// Entities
import { Project } from './entities';
import { ProjectRepository } from './repositories/project.repository';
import { DatabaseController } from './database.controller';
import { WinstonModule } from '@app/winston';

@Module({
  imports: [
    WinstonModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Project],
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
    }),

    // Repositories
    TypeOrmModule.forFeature([Project]),
  ],
  controllers: [DatabaseController],
  providers: [ProjectRepository],
  exports: [ProjectRepository],
})
export class DatabaseModule {}
