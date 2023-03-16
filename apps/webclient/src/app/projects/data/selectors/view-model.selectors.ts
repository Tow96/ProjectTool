import { createSelector } from '@ngrx/store';
import { MainViewModel } from '../../utils';
import * as ProjectSelectors from './project.selectors';

export const selectMainViewModel = createSelector(
  ProjectSelectors.selectAll,
  (projects): MainViewModel => ({
    projects,
  })
);
