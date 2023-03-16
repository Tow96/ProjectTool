import { Component } from '@angular/core';
import { ToastService } from './core';

@Component({
  selector: 'pt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly toast: ToastService) {}

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
}
