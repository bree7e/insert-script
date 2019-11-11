import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PromiseBasedComponent } from './promise-based.component';
import { ObservableBasedComponent } from './observable-based.component';

@NgModule({
  declarations: [
    AppComponent,
    PromiseBasedComponent,
    ObservableBasedComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
