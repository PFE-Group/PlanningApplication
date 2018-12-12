import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../../shared/shared.module';
import {MatDatepickerModule, MatNativeDateModule, MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material';
import {MatDialogModule} from '@angular/material';

import {ScheduleComponent} from '.';
import {CalendarComponent} from './components/calendar';
import {CalendarDetailsComponent} from './components/calendar-details';
import {CalendarInformationComponent} from './components/calendar-information';
import {CalendarEventsComponent} from './components/calendar-details/components/calendar-events';
import {CalendarStatsComponent} from './components/calendar-details/components/calendar-stats';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WebApiService} from '../../shared/services/webapi';
import {AppStateService} from '../../shared/services/app-state.service/app-state.service';
import {PlanningService} from '../../shared/services/planning';
import {CalendarListComponent} from './components/calendar-list';
import {PlanningNameDialogComponent} from './components/calendar-list/components/planning-name-dialog';
import {UserService} from '../../shared/services/user';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';


const COMPONENTS = [
  ScheduleComponent,
  CalendarComponent,
  CalendarDetailsComponent,
  CalendarInformationComponent,
  CalendarEventsComponent,
  CalendarStatsComponent,
  CalendarListComponent,
  PlanningNameDialogComponent,

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
  MatDialogModule,
 DlDateTimePickerDateModule,

  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
  })
];

const PROVIDERS = [
  WebApiService,
  AppStateService,
  PlanningService,
  UserService
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
  entryComponents: [PlanningNameDialogComponent]
})
export class ScheduleModule {
}
