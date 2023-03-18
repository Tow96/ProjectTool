import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '@pt/models';
import { environment } from 'apps/webclient/src/environments/environment';

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

  getImageLocation(img?: string | null): string {
    if (img) return `${this.imageUrl}/${img}`;

    return '/assets/default.png';
  }

  getStatus() {
    return this.project?.status;
  }
}
