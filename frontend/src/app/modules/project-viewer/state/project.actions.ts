import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { NotificationModels } from '@app/core';
import { CreateProject, Project, ProjectNotification } from '../models';

export const loadProjects = createAction(
  '[Project Viewer Component] Load Projects'
);

export const loadProjectsSuccess = createAction(
  '[Project Effects] Load Projects Success',
  props<{ projects: Project[] }>()
);

export const loadProjectsFailure = createAction(
  '[Project Effects] Load Projects Failure',
  props<NotificationModels.NotificationInterface>()
);

export const toggleProjectVisibility = createAction(
  '[Project Card Component] Toggle Project Visibilty',
  props<{ id: number }>()
);

export const formInvalidFields = createAction(
  '[Project Card Component] Project Invalid Fields',
  props<NotificationModels.NotificationInterface>()
);

export const upsertProject = createAction(
  '[Project Card Component] Upsert Project',
  props<CreateProject>()
);

export const upsertProjectSuccess = createAction(
  '[Project Effects] Add Unregistered Project Success',
  props<{ id: number; project: Project }>()
);

export const upsertProjectSuccessp2 = createAction(
  '[Project Effects] Upsert Project Success p2',
  props<{ id: number }>()
);

export const upsertProjectFailure = createAction(
  '[Project Effects] Add Unregistred Project Failure',
  props<ProjectNotification>()
);

export const updateProject = createAction(
  '[Project Card Component] Update Project',
  props<{ project: Project }>()
);

export const updateProjectSuccess = createAction(
  '[Project Effects] Update Project Success',
  props<{ project: Project }>()
);

export const updateProjectFailure = createAction(
  '[Project Effects] Update Project Failure',
  props<ProjectNotification>()
);

export const promptDeleteModal = createAction(
  '[Project Card Component] Prompt Project Delete',
  props<NotificationModels.NotificationInterface>()
);

export const deleteProject = createAction(
  '[Project Card Component] Delete Project',
  props<{ id: number }>()
);

export const deleteProjectSuccess = createAction(
  '[Project Effects] Delete Project Success',
  props<{ id: number }>()
);

export const deleteProjectFailure = createAction(
  '[Project Effects] Delete Project Failure',
  props<ProjectNotification>()
);

// -----------------------------------------------------------
export const addProject = createAction(
  '[Project/API] Add Project',
  props<{ project: Project }>()
);

export const addProjects = createAction(
  '[Project/API] Add Projects',
  props<{ projects: Project[] }>()
);

export const upsertProjects = createAction(
  '[Project/API] Upsert Projects',
  props<{ projects: Project[] }>()
);

export const updateProjects = createAction(
  '[Project/API] Update Projects',
  props<{ projects: Update<Project>[] }>()
);

export const deleteProjects = createAction(
  '[Project/API] Delete Projects',
  props<{ ids: string[] }>()
);

export const clearProjects = createAction('[Project/API] Clear Projects');
