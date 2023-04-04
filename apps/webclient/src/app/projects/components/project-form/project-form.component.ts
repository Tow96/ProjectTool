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
import { CreateProject, EditProject, Project, ProjectStatus } from '@pt/models';
import { Observable } from 'rxjs';
import { ProjectFormViewModel } from '../../utils';
import { environment } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../../../core';

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
    MatIconModule,
  ],
})
export class ProjectFormComponent implements OnInit {
  file?: File;
  fileUrl?: string;
  form: FormGroup;
  removeImg = false;
  title = 'Edit Project';

  vm$?: Observable<ProjectFormViewModel>;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ProjectFormComponent>,
    private readonly modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {
    this.form = fb.group({
      name: fb.control(data.name, [Validators.required]),
      location: fb.control({ value: data.location, disabled: true }, [Validators.required]),
      description: fb.control(data.description || '', [Validators.maxLength(140)]),
    });

    if (this.data.status === ProjectStatus.UNREGISTERED) {
      this.title = 'Add Project';
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
      if (this.removeImg) changes.removeImg = 'remove';
    }

    return changes;
  }

  private validateAndSave(): void {
    if (this.form.invalid) return;

    if (this.data.status == ProjectStatus.UNREGISTERED) {
      const newProject: CreateProject = this.form.getRawValue();
      this.store.dispatch(ProjectActions.createProject({ project: newProject, img: this.file }));
    } else {
      const changes = this.getChanges();
      if (Object.keys(changes).length > 0 || this.file) {
        this.store.dispatch(
          ProjectActions.updateProject({ id: this.data.id, changes, img: this.file })
        );
      }
    }
  }

  // Get functions -----------------------------------------------------------------
  getPreviewUrl(): string {
    if (this.fileUrl) return this.fileUrl;

    return `${environment.imageUrl}/${this.data.imageLocation}`;
  }

  // Is functions ------------------------------------------------------------------
  isDeleteVisible(): boolean {
    return this.data.status !== ProjectStatus.UNREGISTERED;
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
    return (
      !this.removeImg &&
      (this.file !== undefined ||
        (this.data.imageLocation !== null && this.data.imageLocation !== undefined))
    );
  }

  // On functions ------------------------------------------------------------------
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteProjectClick(): void {
    this.modalService.openDialog(
      `Are you sure you want to remove project: ${this.data.name}?`,
      'Delete project',
      ProjectActions.deleteProject({ id: this.data.id })
    );
  }

  onFormSubmit(): void {
    this.validateAndSave();
  }

  onRemoveImageClick(): void {
    this.file = undefined;
    this.fileUrl = undefined;
    this.removeImg = true;
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
      this.removeImg = false;

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => (this.fileUrl = reader.result?.toString());
    }
  }
}
