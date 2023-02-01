import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreStore } from '@app/core';
import { Store } from '@ngrx/store';
import { ProjectCardViewModel } from '../../models';
import { ProjectActions, ProjectSelectors } from '../../state';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  vm$?: Observable<ProjectCardViewModel>;
  @Input() projectIn = '0';

  projectForm$?: Observable<FormGroup>;
  detailsVisible = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<CoreStore.AppState>
  ) {}

  ngOnInit(): void {
    this.vm$ = this.store.select(
      ProjectSelectors.selectProjectCardViewModel(this.projectIn)
    );

    this.projectForm$ = this.store
      .select(ProjectSelectors.selectProjectCardViewModel(this.projectIn))
      .pipe(
        map(({ project }) =>
          this.fb.group({
            id: this.fb.control(project?.id),
            name: this.fb.control(project?.name, [Validators.required]),
            location: this.fb.control(project?.location, [Validators.required]),
            description: this.fb.control(project?.description),
          })
        )
      );
  }

  onDetailsClick(id: number) {
    this.store.dispatch(ProjectActions.toggleProjectVisibility({ id }));
  }

  onProjectFormSubmit(form: FormGroup, isUnregistered: boolean) {
    const invalid = [];
    for (const name in form.controls)
      if (form.controls[name].invalid) invalid.push(`${name} is required.`);

    if (invalid.length > 0) {
      this.store.dispatch(
        ProjectActions.formInvalidFields({
          message: invalid.join('\n'),
          title: 'Invalid fields',
        })
      );
    }

    if (isUnregistered)
      return this.store.dispatch(ProjectActions.upsertProject(form.value));

    return this.store.dispatch(
      ProjectActions.updateProject({ project: form.value })
    );
  }

  onDeleteClick(id: number) {
    this.store.dispatch(
      ProjectActions.promptDeleteModal({
        message: 'Are you sure you want to delete the project?',
        title: 'Delete project',
        next: ProjectActions.deleteProject({ id }),
      })
    );
  }
}
