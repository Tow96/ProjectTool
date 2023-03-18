import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeActions } from './core';
// import { StyleManagerService } from './core/utils';

@Component({
  selector: 'pt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ThemeActions.setInitialMode());
  }
}
