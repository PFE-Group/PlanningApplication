import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ScheduleModule } from './components/schedule/schedule.module';
import { ManagementModule } from './components/management/management.module';

const MODULE=[
  BrowserModule,
  AppRoutingModule,
  ScheduleModule,ManagementModule
]
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ... MODULE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
