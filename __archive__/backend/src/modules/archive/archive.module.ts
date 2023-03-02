// Libraries
import { Module } from '@nestjs/common';
// Modules
import { SharedModule } from 'src/shared/shared.module';
import ProjectModule from '../project/project.module';
// Controllers
import { ArchiveController } from './archive.controller';
// Services
import ArchiveService from './archive.service';

@Module({
  imports: [ProjectModule, SharedModule],
  controllers: [ArchiveController],
  providers: [ArchiveService],
})
export class ArchiveModule {}
