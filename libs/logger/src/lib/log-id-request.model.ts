/** log-id-request.ts
 * Copyright (c) 2022, Towechlabs
 *
 * Model that extends the basic express request to include x-log-id parameter
 */
import { Request } from 'express';

export interface LogIdRequest extends Request {
  'x-log-id': string;
}
