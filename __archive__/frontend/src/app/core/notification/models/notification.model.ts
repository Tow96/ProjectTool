import { Action } from '@ngrx/store';

export interface NotificationInterface {
  title?: string;
  message: string;
  next?: Action;
}
