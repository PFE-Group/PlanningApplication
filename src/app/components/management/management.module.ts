import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material';
import { InviteUserComponent} from './components/invite-user/invite-user.component';
import {MatInputModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ManagementComponent} from './management.component';
import { PlanningsComponent } from './components/plannings/plannings.component';
import { TimeSlotsComponent } from './components/time-slots/time-slots.component';
import { TasksComponent } from './components/tasks/tasks.component';

const MODULES = [
    BrowserModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule,
    MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatButtonToggleModule
]
const COMPONENTS=[
  ManagementComponent,
  PlanningsComponent,AutocompleteComponent,InviteUserComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    TimeSlotsComponent,
    TasksComponent
  ],
  imports: [
    ...MODULES
  ],
  providers: [],
})
export class ManagementModule { }