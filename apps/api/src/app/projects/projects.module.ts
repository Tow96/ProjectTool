// Libraries
import { Module } from '@nestjs/common';
// Modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '@pt/image';
import { LoggerModule } from '@pt/logger';
// Entities
import { ProjectEntity } from '../utils';
// Controllers
import { ProjectsController } from './projects.controller';
// Services
import { ProjectService } from './projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    LoggerModule,
    ImageModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectService],
})
export class ProjectsModule {}
