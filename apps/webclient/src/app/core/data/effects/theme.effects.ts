// Libraries
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
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

  private defaultConfig = { dispatch: false };

  // Effects -------------------------------------------------------------------------------------
  initialThemeEffect = createEffect(() => this.initialThemePipe$(), this.defaultConfig);

  toggleDarkModeEffect = createEffect(() => this.toggleDarkModePipe$(), this.defaultConfig);

  // Functions ----------------------------------------------------------------------------------
  private initialThemePipe$(): Observable<unknown> {
    return this.actions$.pipe(
      ofType(ThemeActions.setInitialMode),
      concatLatestFrom(() => this.store.select(ThemeSelectors.selectDarkMode)),
      tap(([, dark]) => this.styles.setDarkTheme(dark))
    );
  }

  private toggleDarkModePipe$(): Observable<unknown> {
    return this.actions$.pipe(
      ofType(ThemeActions.toggleDarkMode),
      concatLatestFrom(() => this.store.select(ThemeSelectors.selectDarkMode)),
      tap(([, dark]) => this.styles.setDarkTheme(dark))
    );
  }
}
