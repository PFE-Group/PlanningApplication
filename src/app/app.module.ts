import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ScheduleModule } from './components/schedule/schedule.module';
import { InviteUserModule} from './components/invite-user/invite-user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    InviteUserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
