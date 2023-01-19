import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/core/models';
import ProjectStatus from 'src/app/core/constants/project-status';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project = {} as Project;

  detailsVisible = false;
  projectForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.projectForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: this.fb.control(this.project.name, [Validators.required]),
      location: this.fb.control(this.project.location, [Validators.required]),
      description: this.fb.control(this.project.description),
    });
  }

  printStatus(): string {
    switch (this.project.status) {
      case ProjectStatus.HOT:
        return 'Active';
      case ProjectStatus.COOL:
        return 'Backed-up';
      case ProjectStatus.COLD:
        return 'Archived';
      case ProjectStatus.LOST:
        return 'Missing';

      default:
        return 'Unregistered';
    }
  }

  isUnregistered(): boolean {
    return this.project.status === ProjectStatus.UNREGISTERED;
  }

  toggleDetails() {
    this.detailsVisible = !this.detailsVisible;
    this.projectForm.reset({
      name: this.project.name,
      location: this.project.location,
      description: this.project.description,
    });
  }

  onProjectFormSubmit() {
    console.log(this.projectForm.value);
    // this.toggleDetails();
  }
}
