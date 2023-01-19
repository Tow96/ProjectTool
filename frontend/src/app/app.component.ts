// Libraries
import { Component, OnInit } from '@angular/core';

// NGRX
import { Store } from '@ngrx/store';
import ProjectActions, { ProjectSelectors } from './core/store';

// Services
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private readonly title = 'Project Manager';
  readonly data$ = this.store.select(ProjectSelectors.getProjectsForCards);

  constructor(
    private readonly titleService: Title,
    private readonly store: Store
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectActions.EffectActions.loadProjects());
  }
}
