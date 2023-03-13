// Libraries
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
// Services
import { ConfigService } from '@nestjs/config';
import { PidWinstonLogger } from '@pt/logger';
// Utils
import { UPLOADS_FOLDER, UPLOADS_EXPIRATION, THUMBNAILFOLDER } from './utils';

@Injectable()
export class ImageService {
  private thumbnailLocation: string;

  constructor(
    private readonly logger: PidWinstonLogger,
    private readonly configService: ConfigService
  ) {
    this.thumbnailLocation = `${this.configService.get<string>(
      'COLD_FOLDER'
    )}/${THUMBNAILFOLDER}`;
  }

  @Cron('0 0 * * * *') // Run every hour
  imageSchedule() {
    this.clearUploadsFolder();
  }

  clearUploadsFolder(): void {
    this.logger.log(`Clearing uploads folder`);
    const files = fs.readdirSync(UPLOADS_FOLDER);
    const compareDate = new Date();
    let counter = 0;

    files.forEach((file) => {
      const { birthtime } = fs.statSync(`${UPLOADS_FOLDER}/${file}`);
      if (compareDate.getTime() - birthtime.getTime() > UPLOADS_EXPIRATION) {
        counter++;
        fs.unlinkSync(`${UPLOADS_FOLDER}/${file}`);
      }
    });

    this.logger.log(`Removed ${counter} file(s)`);
  }

  deleteImage(pid: string, image: string): void {
    this.logger.pidLog(pid, `Removing image: ${image}`);
    fs.unlinkSync(`${this.thumbnailLocation}/${image}`);
  }

  keepImage(pid: string, filename: string): void {
    const prevPath = `${UPLOADS_FOLDER}/${filename}`;
    const newPath = `${this.thumbnailLocation}/${filename}`;

    this.logger.pidLog(
      pid,
      `Moving image: ${prevPath} to the thumbnails folder`
    );
    fs.copyFileSync(prevPath, newPath);
    fs.unlinkSync(prevPath);
  }
}
