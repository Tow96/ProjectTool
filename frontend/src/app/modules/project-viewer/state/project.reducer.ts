import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Project } from '../models';
import * as ProjectActions from './project.actions';

export const projectsFeatureKey = 'projects';

export interface State extends EntityState<Project> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const reducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProjectActions.loadProjectsSuccess, (state, action) =>
    adapter.setAll(action.projects, state)
  ),
  on(
    ProjectActions.loadProjectsSuccess,
    ProjectActions.loadProjectsFailure,
    (state) => ({
      ...state,
      loaded: true,
      loading: false,
    })
  ),
  on(ProjectActions.toggleProjectVisibility, (state, { id }) =>
    adapter.updateOne(
      {
        id,
        changes: {
          detailsVisible: !(state.entities[id]?.detailsVisible || false),
        },
      },
      state
    )
  ),
  on(ProjectActions.upsertProject, (state, action) =>
    adapter.updateOne({ id: action.id, changes: { loading: true } }, state)
  ),
  on(ProjectActions.upsertProjectSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ProjectActions.upsertProjectSuccessp2, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ProjectActions.upsertProjectFailure, (state, action) =>
    adapter.updateOne({ id: action.id, changes: { loading: false } }, state)
  ),
  on(ProjectActions.updateProject, (state, action) =>
    adapter.updateOne(
      { id: action.project.id, changes: { loading: true } },
      state
    )
  ),
  on(ProjectActions.updateProjectSuccess, (state, { project }) =>
    adapter.updateOne(
      { id: project.id, changes: { ...project, loading: false } },
      state
    )
  ),
  on(ProjectActions.updateProjectFailure, (state, action) =>
    adapter.updateOne({ id: action.id, changes: { loading: false } }, state)
  ),
  on(ProjectActions.deleteProject, (state, action) =>
    adapter.updateOne({ id: action.id, changes: { loading: true } }, state)
  ),
  on(ProjectActions.deleteProjectSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ProjectActions.deleteProjectFailure, (state, action) =>
    adapter.updateOne({ id: action.id, changes: { loading: false } }, state)
  ),

  // auto generated --------------------------------------------------------------------------
  on(ProjectActions.addProject, (state, action) =>
    adapter.addOne(action.project, state)
  ),
  on(ProjectActions.addProjects, (state, action) =>
    adapter.addMany(action.projects, state)
  ),
  on(ProjectActions.upsertProjects, (state, action) =>
    adapter.upsertMany(action.projects, state)
  ),
  on(ProjectActions.updateProjects, (state, action) =>
    adapter.updateMany(action.projects, state)
  ),
  on(ProjectActions.deleteProjects, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(ProjectActions.clearProjects, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
