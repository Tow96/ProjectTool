// Libraries
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
// Services
import { StyleManagerService } from '../../utils';
import { ThemeActions } from '../actions';
import { ThemeSelectors } from '../selectors';

@Injectable()
export class ThemeEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly styles: StyleManagerService
  ) {}

  setInitialTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ThemeActions.setInitialMode),
        concatLatestFrom(() =>
          this.store.select(ThemeSelectors.selectDarkMode)
        ),
        tap(([, dark]) => this.styles.setDarkTheme(dark))
      ),
    { dispatch: false }
  );

  toggleDarkMode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ThemeActions.toggleDarkMode),
        concatLatestFrom(() =>
          this.store.select(ThemeSelectors.selectDarkMode)
        ),
        tap(([, dark]) => this.styles.setDarkTheme(dark))
      ),
    { dispatch: false }
  );
}
