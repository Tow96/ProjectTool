import { Component } from '@angular/core';
import { Project } from '@pt/models';
import * as animations from './main.animations';

@Component({
  selector: 'pt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [animations.cardAnimation],
})
export class MainComponent {
  projects: Project[] = [];
  addProject(): void {
    this.projects.push({
      createdOn: new Date(),
      description: 'description',
      id: 0,
      imageLocation: null,
      lastArchived: new Date(),
      location: 'location',
      name: `PROJECT: ${this.projects.length}`,
      status: 0,
      tags: [],
    });
  }
  popProject(): void {
    this.projects.pop();
  }
}
