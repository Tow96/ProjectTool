import { Action, Store } from '@ngrx/store';
import { EditProject } from '@pt/models';
import { catchError, map, Observable, of } from 'rxjs';
import { ProjectActions, ProjectApiService } from '../../data';

export class EffectHelpers {
  constructor(private readonly store: Store, private readonly api: ProjectApiService) {}

  // Pipes -----------------------------------------------------------
  getProjects$(): Observable<Action> {
    return this.api.getProjects().pipe(
      map((projects) => ProjectActions.loadProjectsSuccess({ projects })),
      catchError((e) => this.getProjectsFailure$(e))
    );
  }

  updateProject$(id: number, changes: EditProject): Observable<Action> {
    return this.api.updateProject(id, changes).pipe(
      map((project) =>
        ProjectActions.updateProjectSuccess({
          project: { id: project.id, changes: project },
        })
      ),
      catchError((e) => this.updateProjectFailure$(e))
    );
  }

  // Error processing pipes -------------------------------------------
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  getProjectsFailure$(e: any): Observable<Action> {
    return of(
      ProjectActions.loadProjectsFailure({
        message: e.message || 'Failed loading projects',
      })
    );
  }

  updateProjectFailure$(e: any): Observable<Action> {
    return of(
      ProjectActions.updateProjectFailure({
        message: e.message || 'Failed updating project',
      })
    );
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
