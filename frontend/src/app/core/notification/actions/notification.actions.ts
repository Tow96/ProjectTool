import { createActionGroup, props } from '@ngrx/store';
import { NotificationInterface } from '../models';

export const Generic = createActionGroup({
  source: 'Generic Notification',
  events: {
    'Open Info': props<NotificationInterface>(),
    'Open Warn': props<NotificationInterface>(),
    'Open Error': props<NotificationInterface>(),
  },
});
