// Libraries
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, tap } from 'rxjs';
// Services
import { ToastService } from '../../../core';
// Actions
import { ProjectActions } from '..';

@Injectable()
export class ToastEffects {
  constructor(private readonly actions$: Actions, private readonly toast: ToastService) {}

  showErrorEffect = createEffect(() => this.showError$(), { dispatch: false });

  // --------------------------------------------------------------------------
  private showError$(): Observable<unknown> {
    return this.actions$.pipe(
      ofType(ProjectActions.loadProjectsFailure),
      tap((action) => this.toast.warn(action.message))
    );
  }
}
