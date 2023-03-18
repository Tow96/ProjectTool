// Libraries
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// Modules
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Actions
import { ThemeActions } from '../../data';
import { Observable } from 'rxjs';
// Selectors
import { CoreViewModels } from '../../data/selectors';
// Models
import { ToolbarViewModel } from '../../utils';
import * as animations from './tool-bar.animations';

@Component({
  selector: 'pt-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  animations: [animations.iconAnimation],
})
export class ToolBarComponent implements OnInit {
  vm$?: Observable<ToolbarViewModel>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.vm$ = this.store.select(CoreViewModels.selectToolbarViewModel);
  }

  onDarkModeToggle() {
    this.store.dispatch(ThemeActions.toggleDarkMode());
  }
}
