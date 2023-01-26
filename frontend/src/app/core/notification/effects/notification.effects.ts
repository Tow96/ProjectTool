// Libraries
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
// Actions
import { Generic } from '../actions';
// Services
import NotificationService from '../notification.service';

@Injectable()
export class NotificationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly notification: NotificationService
  ) {}

  openInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Generic.openInfo),
        tap((data) => {
          this.notification.info(data.message, data.title, data.next);
        })
      ),
    { dispatch: false }
  );

  openWarn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Generic.openWarn),
        tap((data) => {
          this.notification.warning(data.message, data.title, data.next);
        })
      ),
    { dispatch: false }
  );

  openError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Generic.openError),
        tap((data) => {
          this.notification.info(data.message, data.title, data.next);
        })
      ),
    { dispatch: false }
  );
}
