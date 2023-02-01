// Libraries
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
// Services
import NotificationService from '../../notification.service';
// Actions
import { Generic } from '../actions';
import { ProjectActions } from '@app/project-viewer';

@Injectable()
export class NotificationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly notification: NotificationService
  ) {}

  openInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Generic.openInfo, ProjectActions.promptDeleteModal),
        tap((data) => {
          this.notification.info(data.message, data.title, data.next);
        })
      ),
    { dispatch: false }
  );

  openWarn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          Generic.openWarn,
          ProjectActions.formInvalidFields,
          ProjectActions.upsertProjectFailure,
          ProjectActions.updateProjectFailure,
          ProjectActions.deleteProjectFailure
        ),
        tap((data) => {
          this.notification.warning(data.message, data.title, data.next);
        })
      ),
    { dispatch: false }
  );

  openError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Generic.openError, ProjectActions.loadProjectsFailure),
        tap((data) => {
          this.notification.info(data.message, data.title, data.next);
        })
      ),
    { dispatch: false }
  );
}
