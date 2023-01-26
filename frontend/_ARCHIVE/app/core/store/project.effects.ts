// Libraries
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs';

// NGRX
import { EffectActions, ReducerActions } from './project.actions';

// Services
import { ApiService } from '../services';

@Injectable()
export default class ProjectEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly api: ApiService
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EffectActions.loadProjects),
      switchMap(() => this.api.getProjects()),
      map((res) => ReducerActions.setProjectList({ payload: res }))
    )
  );

  createProject$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EffectActions.createProject),
        tap((data) => {
          console.log(data);
        })
      ),
    { dispatch: false }
  );
}
