import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ManagementComponent} from './management.component';
import {UserInformationComponent} from './components/user-information/user-information.component';
import {CalendarListComponent} from './components/calendar-list';
import {MemberListComponent} from './components/member-list/member-list.component';
import { MainComponent } from './components/main/main.component';
import { AutocompleteComponentUser } from './components/autocompleteUser/autocomplete.component';
import { AutocompleteComponentTasks } from './components/autocompleteTasks/autocomplete.component';


import {
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  
} from '@angular/material';

const MODULES = [
    BrowserModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule,
    MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatButtonToggleModule,MatCardModule,MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
]
const COMPONENTS=[
  ManagementComponent,
  MainComponent,
  UserInformationComponent,
  CalendarListComponent,
  MemberListComponent,
  AutocompleteComponentUser,
  AutocompleteComponentTasks
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    
  ],
  imports: [
    ...MODULES
  ],
  providers: [],
})
export class ManagementModule { }
