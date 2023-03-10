/** log-id.middleware.ts
 * Copyright (c) 2022, Towechlabs
 *
 * Middleware that adds a random uuid for logging purposes
 */
import { randomUUID } from 'crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { LogIdRequest } from '../models';

@Injectable()
export class LogIdMiddleware implements NestMiddleware {
  use(req: LogIdRequest, res: Response, next: NextFunction) {
    const id = randomUUID();
    req['x-log-id'] = id;
    res.set('x-log-id', id);
    next();
  }
}
