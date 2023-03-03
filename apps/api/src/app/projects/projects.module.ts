// Libraries
import { Module } from '@nestjs/common';
// Modules
// import { TypeOrmModule } from '@nestjs/typeorm';
// Entities
// import { Project } from './models';
// Controllers
import { ProjectsController } from './projects.controller';
// Services

@Module({
  imports: [
    // TypeOrmModule.forFeature([Project])
  ],
  controllers: [ProjectsController],
  // providers: [ProjectService],
})
export class ProjectsModule {}
