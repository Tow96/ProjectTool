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
    this.store.dispatch(ProjectActions.loadProjects());
  }
}
