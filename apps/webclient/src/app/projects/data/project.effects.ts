// Libraries
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
// Services
import { ToastService } from '../../core';
import { ProjectApiService } from '.';
// Actions
import { ProjectActions } from '.';
// Services
import { ProjectSelectors } from '.';
import { EffectHelpers } from '../utils';

@Injectable()
export class ProjectEffects {
  helpers = new EffectHelpers();

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly toast: ToastService,
    private readonly api: ProjectApiService
  ) {}
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      concatLatestFrom(() =>
        this.store.select(ProjectSelectors.selectLastUpdated)
      ),
      filter(([, cache]) =>
        this.helpers.validateProjectCache(cache, this.store)
      ),
      switchMap(() =>
        this.api.getProjects().pipe(
          map((projects) => ProjectActions.loadProjectsSuccess({ projects })),
          catchError((e) => of(ProjectActions.loadProjectsFailure(e.message)))
        )
      )
    )
  );
}
