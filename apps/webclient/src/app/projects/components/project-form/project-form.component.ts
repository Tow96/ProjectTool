import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Project, ProjectStatus } from '@pt/models';

@Component({
  selector: 'pt-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ProjectFormComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {
    if (this.data.status === ProjectStatus.UNREGISTERED) {
      this.dialogRef.close();
      throw new Error(
        'Adding unregistered projects is currently not supported'
      );
    }
  }
}
