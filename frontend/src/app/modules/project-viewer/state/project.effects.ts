import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectActions } from '.';
import { catchError, map, of, switchMap, tap, delay, concatMap } from 'rxjs';
import { ProjectViewerService } from '../project-viewer.service';
import { Store } from '@ngrx/store';

@Injectable()
export class ProjectEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly api: ProjectViewerService,
    private readonly store: Store
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      switchMap(() =>
        this.api.getProjects().pipe(
          map((res) => ProjectActions.loadProjectsSuccess({ projects: res })),
          catchError((error) =>
            of(
              ProjectActions.loadProjectsFailure({
                message: error.message || 'Error loading projects',
              })
            )
          )
        )
      )
    )
  );

  createUnregisteredProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.upsertProject),
      concatMap((cProject) =>
        this.api.createProject({ ...cProject, tags: [] }).pipe(
          // This is done to force the cdk-virtual-scroll to update
          tap((res) =>
            this.store.dispatch(ProjectActions.addProject({ project: res }))
          ),
          delay(1),
          map(() => ProjectActions.upsertProjectSuccessp2({ id: cProject.id })),
          catchError((error) =>
            of(
              ProjectActions.upsertProjectFailure({
                id: cProject.id,
                message: error.error.message || 'Error creating project',
              })
            )
          )
        )
      )
    )
  );

  updateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.updateProject),
      switchMap(({ project }) =>
        this.api.updateProject(project).pipe(
          map((res) =>
            ProjectActions.updateProjectSuccess({
              project: res,
            })
          ),
          catchError((error) =>
            of(
              ProjectActions.updateProjectFailure({
                id: project.id,
                message: error.error.message || 'Error updating project',
              })
            )
          )
        )
      )
    );
  });

  deleteProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.deleteProject),
      switchMap((action) =>
        this.api.deleteProject(action.id).pipe(
          map((res) => {
            if (res.affected === 0) {
              return ProjectActions.deleteProjectFailure({
                id: action.id,
                message: 'The project was not deleted',
              });
            }
            return ProjectActions.deleteProjectSuccess({ id: action.id });
          }),
          catchError((error) =>
            of(
              ProjectActions.deleteProjectFailure({
                id: action.id,
                message:
                  error.error.message || 'Error while deleting the project',
              })
            )
          )
        )
      )
    );
  });
}
