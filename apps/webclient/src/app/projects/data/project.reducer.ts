import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Project } from '@pt/models';
import { ProjectActions } from '.';

export const projectsFeatureKey = 'projects';

export interface State extends EntityState<Project> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(ProjectActions.testAddProject, (state, action) =>
    adapter.addOne(
      {
        ...action.project,
        id: state.ids.length,
        name: `PROJECT: ${state.ids.length}`,
      },
      state
    )
  ),
  on(ProjectActions.testPopProject, (state) =>
    adapter.removeOne(state.ids.slice(-1).toString(), state)
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
