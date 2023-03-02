// Libraries
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

// Services
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CoreStore } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  vm$?: Observable<{ loading: boolean }>;
  private readonly title = 'Project Manager';

  constructor(
    private readonly titleService: Title,
    private readonly store: Store
  ) {
    this.vm$ = this.store.select(CoreStore.Selectors.selectLoadingState);
    this.titleService.setTitle(this.title);
  }
}
