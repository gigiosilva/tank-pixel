import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConsoleComponent } from './console/console.component';
import { HomeComponent } from './pages/home/home.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ConsoleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
