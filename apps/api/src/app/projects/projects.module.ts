// Libraries
import { Module } from '@nestjs/common';
// Modules
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities
import { Project } from '@pt/models';
// Controllers
import { ProjectsController } from './projects.controller';
// Services
import { PidWinstonLogger } from '@pt/logger';
import ProjectService from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectService, PidWinstonLogger],
})
export class ProjectsModule {}
