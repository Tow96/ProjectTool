import { WinstonModule } from '@app/winston';
import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import { ArchiveController } from './archiving.controller';
import { ArchivingService } from './archiving.service';

@Module({
  imports: [WinstonModule, DatabaseModule],
  controllers: [ArchiveController],
  providers: [ArchivingService],
})
export class ArchivingModule {}
