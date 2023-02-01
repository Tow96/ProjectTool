import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreStore } from '@app/core';
import { ProjectActions, ProjectSelectors } from './state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-viewer',
  templateUrl: './project-viewer.component.html',
  styleUrls: ['./project-viewer.component.css'],
})
export class ProjectViewerComponent implements OnInit {
  vm$?: Observable<number[]>;

  constructor(private readonly store: Store<CoreStore.AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.select(ProjectSelectors.selectProjectViewerViewModel);
    this.store.dispatch(ProjectActions.loadProjects());
  }
}
