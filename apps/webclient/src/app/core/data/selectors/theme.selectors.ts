import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromTheme } from '..';

const selectThemeState = createFeatureSelector<fromTheme.State>(fromTheme.featureKey);

export const selectDarkMode = createSelector(selectThemeState, (state) => state.dark);
