import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleModule } from './components/schedule/schedule.module';
import { ManagementModule } from './components/management/management.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserInformationComponent } from './components/schedule/components/user-information';

@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ManagementModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
