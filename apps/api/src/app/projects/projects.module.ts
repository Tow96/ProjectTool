// Libraries
import { Module } from '@nestjs/common';
// Modules
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities
import { Project } from '@pt/models';
// Controllers
import { ProjectsController } from './projects.controller';
// Services
import { ProjectService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectService],
})
export class ProjectsModule {}
