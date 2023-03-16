import { createAction, props } from '@ngrx/store';
import { Project } from '@pt/models';

export const testAddProject = createAction(
  '[Project/API] Test Add Project',
  props<{ project: Project }>()
);

export const testPopProject = createAction('[Project/API] Test Pop Project');
