// Libraries
import { Component, Input } from '@angular/core';
// Modules
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Services
import { MatButtonModule } from '@angular/material/button';
// Models
import { Project, ProjectStatus } from '@pt/models';
// Misc.
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ProjectHelpers } from '../../utils';

@Component({
  selector: 'pt-projectcard',
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ProjectcardComponent {
  imageUrl = environment.imageUrl;
  loading = true;

  @Input() project: Project | null = null;

  getProjectName(): string {
    if (!this.project) return 'No name';
    if (this.project.status === ProjectStatus.UNREGISTERED)
      return `/${this.project.location}`;

    return this.project.name || 'NO NAME';
  }

  getImageLocation(img?: string | null): string {
    if (img) return `${this.imageUrl}/${img}`;

    return '/assets/default.png';
  }

  getImageStyle(): Record<string, number | string> {
    return {
      opacity: this.loading ? 0 : 1,
      visibility: this.loading ? 'hidden' : 'visible',
    };
  }

  getStatus(): string {
    if (!this.project) return 'NO PROJECT STATUS';
    return ProjectHelpers.getStatusText(this.project.status);
  }

  onImgLoad(): void {
    this.loading = false;
  }
}
