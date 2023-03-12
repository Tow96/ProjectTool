// Libraries
import { Module } from '@nestjs/common';
// Modules
import { TypeOrmModule } from '@nestjs/typeorm';
// Services
import { ConfigService } from '@nestjs/config';
import { ProjectEntity } from '../utils/index';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities: [ProjectEntity],
      }),
    }),
  ],
})
export class DatabaseModule {}
