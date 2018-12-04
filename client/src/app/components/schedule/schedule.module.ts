import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScheduleComponent } from '.';
import { CalendarComponent } from './components/calendar';
import { CalendarDetailsComponent } from './components/calendar-details';
import { CalendarInformationComponent } from './components/calendar-information';
import { CalendarEventsComponent } from './components/calendar-details/components/calendar-events';
import { CalendarStatsComponent } from './components/calendar-details/components/calendar-stats';
import { UserInformationComponent } from './components/user-information';
import { CalendarListComponent } from './components/calendar-list';
import { MemberListComponent } from './components/member-list';


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
];

const MODULES = [
    BrowserModule,
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  providers: [],
})
export class ScheduleModule { }
