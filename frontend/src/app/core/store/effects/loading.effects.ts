// Libraries
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
// Actions
import * as LoadingActions from '../actions/loading.actions';
import { ProjectActions } from '@app/project-viewer';

@Injectable()
export class LoadingEffects {
  constructor(private actions$: Actions) {}

  showLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      map(() => LoadingActions.showLoading())
    );
  });

  hideLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ProjectActions.loadProjectsSuccess,
        ProjectActions.loadProjectsFailure
      ),
      map(() => LoadingActions.hideLoading())
    );
  });
}
