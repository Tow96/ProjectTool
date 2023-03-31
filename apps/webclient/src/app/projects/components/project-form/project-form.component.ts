// Libraries
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
// Modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// Services
import { MatDialogRef } from '@angular/material/dialog';
// Actions
import { ProjectActions, ProjectViewModels } from '../../data';
// Models
import { EditProject, Project, ProjectStatus } from '@pt/models';
import { Observable } from 'rxjs';
import { ProjectFormViewModel } from '../../utils';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'pt-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
})
export class ProjectFormComponent implements OnInit {
  file?: File;
  fileUrl?: string;
  form: FormGroup;

  vm$?: Observable<ProjectFormViewModel>;

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

  ngOnInit() {
    this.vm$ = this.store.select(ProjectViewModels.selectFormViewModel);
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

    if (Object.keys(changes).length > 0 || this.file) {
      this.store.dispatch(
        ProjectActions.updateProject({ id: this.data.id, changes, img: this.file })
      );
    }
  }

  getPreviewUrl(): string {
    if (this.fileUrl) return this.fileUrl;

    return `${environment.imageUrl}/${this.data.imageLocation}`;
  }

  isFormLoading(loading: boolean): Record<string, boolean> {
    return {
      project__form__loading: loading,
    };
  }

  isSaveBttnDisabled(): boolean {
    return this.form.invalid || (Object.keys(this.getChanges()).length === 0 && !this.file);
  }

  isPreviewVisible(): boolean {
    return this.file !== undefined || this.data.imageLocation !== null;
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

  onImageUpload(event: Event) {
    if (event.target && (event.target as HTMLInputElement).files) {
      const inputEvent = event.target as HTMLInputElement;
      if (!inputEvent.files || inputEvent.files.length === 0) return;

      const mimeType = inputEvent.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        throw new Error('Only images are supported.');
      }

      this.file = inputEvent.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => (this.fileUrl = reader.result?.toString());
    }
  }
}
