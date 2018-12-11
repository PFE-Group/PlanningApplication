import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleModule } from './components/schedule/schedule.module';
import { ManagementModule } from './components/management/management.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserInformationComponent } from './components/schedule/components/user-information';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.services'

@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ManagementModule,
    FormsModule,
    HttpClientModule

  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  providers: [
    AuthService
  ],
})
export class AppModule { }
