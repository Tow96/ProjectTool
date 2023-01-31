import { Request } from 'express';

export interface LogIdRequest extends Request {
  'x-log-id': string;
}
