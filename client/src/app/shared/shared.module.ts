import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,  
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const COMPONENTS = [
  
];

const MODULES = [
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ],
  providers: [MatDatepickerModule],
})
export class SharedModule { }
