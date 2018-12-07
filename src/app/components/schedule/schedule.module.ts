import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { MatDatepickerModule, MatNativeDateModule, MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material';

import { ScheduleComponent } from '.';
import { CalendarComponent } from './components/calendar';
import { CalendarDetailsComponent } from './components/calendar-details';
import { CalendarInformationComponent } from './components/calendar-information';
import { CalendarEventsComponent } from './components/calendar-details/components/calendar-events';
import { CalendarStatsComponent } from './components/calendar-details/components/calendar-stats';
import { UserInformationComponent } from './components/user-information';
import { CalendarListComponent } from './components/calendar-list';
import { MemberListComponent } from './components/member-list';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WebApiService} from "../../shared/services/webapi";
import {CalendarListService} from './components/calendar-list/services';

const COMPONENTS = [
    ScheduleComponent,
    CalendarComponent,
    CalendarDetailsComponent,
    CalendarInformationComponent,
    CalendarEventsComponent,
    CalendarStatsComponent,
    CalendarListComponent,
    MemberListComponent,
    UserInformationComponent
    // MatDrawer,
    // MatDrawerContainer,
    // MatDrawerContent
];

const MODULES = [
    BrowserModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
];

const PROVIDERS = [
  CalendarListService,
  WebApiService
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  providers: [
    ...PROVIDERS
  ],
})
export class ScheduleModule { }
