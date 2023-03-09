import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PidWinstonLogger } from '@pt/logger';
import * as fs from 'fs';
import { UPLOADS_FOLDER, UPLOADS_EXPIRATION } from './utils';

@Injectable()
export class ImageService {
  constructor(private readonly logger: PidWinstonLogger) {}

  @Cron('0 0 * * * *') // Run every hour
  imageSchedule() {
    this.clearUploadsFolder();
  }

  clearUploadsFolder() {
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
}
