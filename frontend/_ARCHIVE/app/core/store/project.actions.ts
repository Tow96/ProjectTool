// Libraries
import { createActionGroup, emptyProps, props } from '@ngrx/store';

// Models
import { Project } from '../models';

export const ReducerActions = createActionGroup({
  source: 'Projects',
  events: {
    'Set Project List': props<{ payload: Project[] }>(),
  },
});

export const EffectActions = createActionGroup({
  source: 'Projects-Effects',
  events: {
    'Load Projects': emptyProps(),
    'Create Project': props<{ payload: Partial<Project> }>(),
  },
});
