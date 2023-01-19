/** rmq.module.ts
 * Copyright (c) 2022, Towechlabs
 *
 * Common module for the winston logger, including the req logid middleware
 */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogIdMiddleware } from './middlewares';
import { PidWinstonLogger } from './pid-winston.logger';

@Module({
  providers: [PidWinstonLogger],
  exports: [PidWinstonLogger],
})
export class WinstonModule {
  // Applies the middleware that adds a log id to all calls
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogIdMiddleware).forRoutes('*');
  }
}
