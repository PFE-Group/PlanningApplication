import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


const COMPONENTS = [
  
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
export class SharedModule { }
