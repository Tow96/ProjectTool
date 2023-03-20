// Libraries
import { Component, Input } from '@angular/core';
// Modules
import { MatCardModule } from '@angular/material/card';
// Services
import { MatButtonModule } from '@angular/material/button';
// Selectors
// Models
import { Project, ProjectStatus } from '@pt/models';
// Misc.
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'pt-projectcard',
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class ProjectcardComponent {
  imageUrl = environment.imageUrl;

  @Input() project: Project | null = null;

  getProjectName(): string {
    if (!this.project) return 'No name';
    if (this.project.status === ProjectStatus.UNREGISTERED)
      return `/${this.project.location}`;

    return this.project.name || 'NO NAME';
  }

  getImageLocation(img?: string | null): string {
    // TODO: Re-enable this
    // if (img) return `${this.imageUrl}/${img}`;

    // return '/assets/default.png';
    return `https://picsum.photos/${Math.abs(this.project?.id || 1) * 100}`;
  }

  getStatus(): string {
    if (!this.project) return 'NO PROJECT STATUS';
    switch (this.project.status) {
      case ProjectStatus.ACTIVE || ProjectStatus.BOTH:
        return 'Active';
      case ProjectStatus.ARCHIVED:
        return 'Archived';
      case ProjectStatus.UNREGISTERED:
        return 'Unregistered';
      default:
        return 'Lost';
    }
  }
}
