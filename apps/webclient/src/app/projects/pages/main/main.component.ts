import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectActions, ProjectViewModels } from '../../data';
import { MainViewModel, ScreenSizeColumns } from '../../utils';
import * as animations from './main.animations';

@Component({
  selector: 'pt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [animations.cardAnimation],
})
export class MainComponent implements OnInit {
  vm$?: Observable<MainViewModel>;
  screenSize = this.getScreenSize();
  rowHeight = this.getRowHeight();

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.vm$ = this.store.select(
      ProjectViewModels.selectMainViewModel(this.screenSize)
    );
    this.store.dispatch(ProjectActions.loadProjects());
  }

  fillRow(length: number): number[] {
    let fillerCount = ScreenSizeColumns[this.screenSize] - length;
    fillerCount = fillerCount >= 0 ? fillerCount : 0;

    return Array(fillerCount).fill(0);
  }

  getRowHeight(): number {
    const screen = window.innerWidth;
    const columns = ScreenSizeColumns[this.getScreenSize()];
    const fixedHeight = 70;

    return fixedHeight + (screen - 16) / columns;
  }

  getScreenSize(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    const width = window.innerWidth;

    switch (true) {
      case width < 601:
        return 'xs';
      case width < 961:
        return 'sm';
      case width < 1281:
        return 'md';
      case width < 1921:
        return 'lg';
      default:
        return 'xl';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.rowHeight = this.getRowHeight();

    const newSize = this.getScreenSize();
    if (newSize !== this.screenSize) {
      this.screenSize = newSize;
      this.vm$ = this.store.select(
        ProjectViewModels.selectMainViewModel(newSize)
      );
    }
  }
}
