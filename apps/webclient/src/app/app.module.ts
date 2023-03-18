// Libraries
import { NgModule } from '@angular/core';
// Modules
import { CoreModule } from './core';
import { AppRoutingModule } from './app.routing';
// Components
import { AppComponent } from './app.component';

// TODO: Remove after tests are done

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
