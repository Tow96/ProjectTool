import { createSelector } from '@ngrx/store';
import { ThemeSelectors } from '.';
import { ToolbarViewModel } from '../../utils';

export const selectToolbarViewModel = createSelector(
  ThemeSelectors.selectDarkMode,
  (dark): ToolbarViewModel => ({
    dark,
  })
);
