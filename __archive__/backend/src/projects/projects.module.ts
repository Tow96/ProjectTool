// Libraries
import { Module } from '@nestjs/common';
// Modules
// import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
// Entities
// import { Project } from './models';
// Controllers
import { ProjectsController } from './projects.controller';
// Services

@Module({
  imports: [
    SharedModule,
    // TypeOrmModule.forFeature([Project])
  ],
  controllers: [ProjectsController],
  // providers: [ProjectService],
})
export class ProjectsModule {}
