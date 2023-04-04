// Libraries
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, Observable, switchMap } from 'rxjs';
import { Action, Store } from '@ngrx/store';
// Services
import { ProjectApiService } from '..';
// Actions
import { ProjectActions } from '..';
// Selectors
import { ProjectSelectors } from '..';
// Misc
import { EffectHelpers } from '../../utils';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ProjectEffects {
  helpers;

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly api: ProjectApiService,
    private readonly dialog: MatDialog
  ) {
    this.helpers = new EffectHelpers(store, api, dialog);
  }

  // Effects ------------------------------------------------------
  createProjectEffect = createEffect(() => this.createProject$());
  deleteProjectEffect = createEffect(() => this.deleteProject$());
  loadProjectsEffect = createEffect(() => this.loadProjects$());
  updateProjectEffect = createEffect(() => this.updateProject$());

  // Pipes ----------------------------------------------------
  private createProject$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(ProjectActions.createProject),
      switchMap((action) => this.helpers.createProject$(action.project, action.img))
    );
  }

  private deleteProject$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(ProjectActions.deleteProject),
      switchMap((action) => this.helpers.deleteProject$(action.id))
    );
  }

  private loadProjects$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      concatLatestFrom(() => this.store.select(ProjectSelectors.selectLastUpdated)),
      filter(([, cache]) => this.helpers.validateProjectCache(cache)),
      switchMap(() => this.helpers.getProjects$())
    );
  }

  private updateProject$(): Observable<Action> {
    return this.actions$.pipe(
      ofType(ProjectActions.updateProject),
      switchMap((action) => this.helpers.updateProject$(action.id, action.changes, action.img))
    );
  }
}
