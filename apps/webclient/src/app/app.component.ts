import { Component } from '@angular/core';
import { ToastService } from './core';
import { StyleManagerService } from './core/utils';

@Component({
  selector: 'pt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDark = this.styleManager.isDark;

  constructor(
    private readonly styleManager: StyleManagerService,
    private readonly toast: ToastService
  ) {}

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = this.styleManager.isDark;
  }

  onBasicClck() {
    this.toast.basic('BASIC');
  }

  onAccentClck() {
    this.toast.accent('ACCENT');
  }

  onPrimaryClck() {
    this.toast.primary('Primary');
  }

  onWarnClck() {
    this.toast.warn('Warn');
  }

  onThrowClck() {
    throw new Error('This is a test error');
  }
}
