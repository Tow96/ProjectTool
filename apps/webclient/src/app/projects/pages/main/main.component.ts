import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectActions, ProjectViewModels } from '../../data';
import { MainViewModel } from '../../utils';
import * as animations from './main.animations';

@Component({
  selector: 'pt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [animations.cardAnimation],
})
export class MainComponent implements OnInit {
  vm$?: Observable<MainViewModel>;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.vm$ = this.store.select(ProjectViewModels.selectMainViewModel);
  }

  addProject(): void {
    this.store.dispatch(
      ProjectActions.testAddProject({
        project: {
          createdOn: new Date(),
          description: 'description',
          id: 0,
          imageLocation: null,
          lastArchived: new Date(),
          location: 'location',
          name: `PROJECT:`,
          status: 0,
          tags: [],
        },
      })
    );
  }

  popProject(): void {
    this.store.dispatch(ProjectActions.testPopProject());
  }
}
