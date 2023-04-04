import { MatDialog } from '@angular/material/dialog';
import { Action, ActionCreator, Store } from '@ngrx/store';
import { CreateProject, EditProject } from '@pt/models';
import { catchError, map, Observable, of } from 'rxjs';
import { ProjectActions, ProjectApiService } from '../../data';

export class EffectHelpers {
  constructor(
    private readonly store: Store,
    private readonly api: ProjectApiService,
    private readonly dialogs: MatDialog
  ) {}

  // Pipes -----------------------------------------------------------
  createProject$(project: CreateProject, img?: File): Observable<Action> {
    return this.api.createProject(project, img).pipe(
      map((project) => {
        this.dialogs.closeAll();
        return ProjectActions.createProjectSuccess({ project });
      }),
      catchError((e) =>
        this.returnFailure$(e, ProjectActions.createProjectFailure, 'Failed creating project')
      )
    );
  }

  deleteProject$(id: number): Observable<Action> {
    return this.api.deleteProject(id).pipe(
      map(({ affected }) => {
        this.dialogs.closeAll();
        if (affected === 0) {
          return ProjectActions.deleteProjectFailure({ message: `Project couldn't be deleted` });
        }
        return ProjectActions.deleteProjectSuccess({ id });
      }),
      catchError((e) =>
        this.returnFailure$(e, ProjectActions.deleteProjectFailure, 'Failed deleting project')
      )
    );
  }

  getProjects$(): Observable<Action> {
    return this.api.getProjects().pipe(
      map((projects) => ProjectActions.loadProjectsSuccess({ projects })),
      catchError((e) =>
        this.returnFailure$(e, ProjectActions.loadProjectsFailure, 'Failed loading projects')
      )
    );
  }

  updateProject$(id: number, changes: EditProject, img?: File): Observable<Action> {
    return this.api.updateProject(id, changes, img).pipe(
      map((project) => {
        this.dialogs.closeAll();
        return ProjectActions.updateProjectSuccess({
          project: { id: project.id, changes: project },
        });
      }),
      catchError((e) =>
        this.returnFailure$(e, ProjectActions.updateProjectFailure, 'Failed updating project')
      )
    );
  }

  // Error processing pipes -------------------------------------------
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  returnFailure$(e: any, action: ActionCreator<any, any>, defaultMsg: string): Observable<Action> {
    return of(action({ message: e.message || defaultMsg }));
  }
  /*eslint-enable @typescript-eslint/no-explicit-any*/

  // Validation -------------------------------------------------------
  validateProjectCache(cache: Date): boolean {
    const cacheLongevity = 10 * 60 * 1000; // 10min in ms

    const compareDate = new Date();
    if (compareDate.getTime() - cache.getTime() < cacheLongevity) {
      console.log(`Using projects in cache`);
      this.store.dispatch(ProjectActions.loadProjectsCached());
      return false;
    }

    return true;
  }
}
