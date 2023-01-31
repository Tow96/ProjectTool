// Libraries
import { Module } from '@nestjs/common';
// Modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
// Entities
import { Project } from './models';
// Controllers
import { ProjectController } from './project.controller';
// Services
import ProjectService from './project.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export default class ProjectModule {}
