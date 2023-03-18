import { createAction } from '@ngrx/store';

export const setInitialMode = createAction('[App] Set Initial Theme');

export const toggleDarkMode = createAction('[Toolbar] Toggle Dark Mode');
