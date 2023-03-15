import { Component } from '@angular/core';
import { Project } from '@pt/models';

@Component({
  selector: 'pt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  projects: Project[] = [];
  addProject(): void {
    this.projects.push({
      createdOn: new Date(),
      description: 'description',
      id: 0,
      imageLocation: 'path.jpg',
      lastArchived: new Date(),
      location: 'location',
      name: `PROJECT: ${this.projects.length}`,
      status: 0,
      tags: [],
    });
  }
}
