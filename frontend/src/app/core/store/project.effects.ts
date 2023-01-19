// Libraries
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { firstValueFrom, tap } from 'rxjs';

// NGRX
import { Store } from '@ngrx/store';
import { EffectActions, ReducerActions } from './project.actions';

// Services
import { ApiService } from '../services';

@Injectable()
export default class ProjectEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly api: ApiService,
    private readonly store: Store
  ) {}

  loadProjects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EffectActions.loadProjects),
        tap(async () => {
          // TODO: Loading
          const projects = await firstValueFrom(this.api.getProjects());

          this.store.dispatch(
            ReducerActions.setProjectList({ payload: projects })
          );
        })
      ),
    { dispatch: false }
  );
}
