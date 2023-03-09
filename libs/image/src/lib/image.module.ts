// Libraries
import { Module } from '@nestjs/common';
// Modules
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from '@pt/logger';
// Services
import { ImageService } from './image.service';

@Module({
  imports: [ScheduleModule.forRoot(), LoggerModule],
  providers: [ImageService],
})
export class ImageModule {}
