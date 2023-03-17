// Libraries
import { NgModule } from '@angular/core';
// Modules
import { CoreModule } from './core';
import { AppRoutingModule } from './app.routing';
// Components
import { AppComponent } from './app.component';

// TODO: Remove after tests are done
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    CoreModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
