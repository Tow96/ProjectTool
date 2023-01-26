import { createReducer, on } from '@ngrx/store';

// NGRX
import ProjectState, { initialState } from './project.state';
import { ReducerActions } from './project.actions';

// Models
import { Project } from '../models';

const ProjectReducer = createReducer(
  initialState,
  on(ReducerActions.setProjectList, (state, props) =>
    _setProjectList(state, props)
  )
);

export default ProjectReducer;

const _setProjectList = (
  state: ProjectState,
  { payload }: { payload: Project[] }
): ProjectState => {
  return {
    ...state,
    projects: payload,
  };
};
