import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material';
import { InviteUserComponent} from './invite-user.component';
import {MatInputModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
const MODULE =[
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,MatButtonToggleModule,
  ReactiveFormsModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule]
const COMPONENT=[InviteUserComponent,AutocompleteComponent]
@NgModule({
    declarations: [
     ...COMPONENT],
    imports: [
      ...MODULE
    ],

    providers: [],
  })
  export class InviteUserModule { }