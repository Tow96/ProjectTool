import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
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
  searchForm$?: Observable<FormGroup>;

  screenSize = this.getScreenSize();
  rowHeight = this.getRowHeight();

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(ProjectActions.loadProjects());

    this.vm$ = this.store.select(
      ProjectViewModels.selectMainViewModel(this.screenSize)
    );
    this.searchForm$ = this.store
      .select(ProjectViewModels.selectMainViewModel(this.screenSize))
      .pipe(
        map((x) =>
          this.fb.group({
            search: this.fb.control(x.searchInput),
          })
        )
      );
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

  onInputKeyUp(form: FormGroup) {
    const values = form.value;

    this.store.dispatch(
      ProjectActions.updateSearchForm({
        searchInput: values.search,
      })
    );
  }
}
