import { createReducer, on } from '@ngrx/store';
import { ThemeActions } from '../actions';

export const featureKey = 'theme';

enum localStorageLocations {
  themes = 'default-themes',
}

export interface State {
  dark: boolean;
}

export const initialState: State = JSON.parse(
  localStorage.getItem(localStorageLocations.themes) || '{"dark": true}'
);

const storeData = (state: State): State => {
  localStorage.setItem(localStorageLocations.themes, JSON.stringify(state));
  return state;
};

export const reducer = createReducer(
  initialState,
  // Toggle Dark Mode
  on(ThemeActions.toggleDarkMode, (state) => ({ ...state, dark: !state.dark })),
  // Store all data
  on(ThemeActions.toggleDarkMode, (state) => storeData(state))
);
