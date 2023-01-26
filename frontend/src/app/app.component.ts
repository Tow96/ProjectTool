// Libraries
import { Component } from '@angular/core';

// Services
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private readonly title = 'Project Manager';

  constructor(private readonly titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
