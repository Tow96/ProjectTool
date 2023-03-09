import { Module } from '@nestjs/common';
import { PidWinstonLogger } from './pid-winston.logger';

@Module({
  controllers: [],
  providers: [PidWinstonLogger],
  exports: [PidWinstonLogger],
})
export class LoggerModule {}
