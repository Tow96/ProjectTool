import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { EditProject, Project, ProjectStatus } from '@pt/models';
import { ProjectActions } from '../../data';

@Component({
  selector: 'pt-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ProjectFormComponent {
  form: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {
    this.form = fb.group({
      name: fb.control(data.name, [Validators.required]),
      location: fb.control({ value: data.location, disabled: true }, [Validators.required]),
      description: fb.control(data.description, [Validators.maxLength(140)]),
    });

    if (this.data.status === ProjectStatus.UNREGISTERED) {
      this.dialogRef.close();
      throw new Error('Adding unregistered projects is currently not supported');
    }
  }

  private getChanges(): EditProject {
    const changes: EditProject = {};
    if (this.form.valid) {
      const values = this.form.value;
      if (values.name !== this.data.name) changes.name = values.name;
      if (values.description !== this.data.description) changes.description = values.description;
    }

    return changes;
  }

  private validateAndSave(): void {
    const changes = this.getChanges();

    if (Object.keys(changes).length > 0) {
      this.store.dispatch(ProjectActions.updateProject({ id: this.data.id, changes }));
    }
  }

  isSaveBttnDisabled(): boolean {
    return this.form.invalid || Object.keys(this.getChanges()).length === 0;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit(): void {
    this.validateAndSave();
  }

  onSaveClick(): void {
    this.validateAndSave();
  }
}
