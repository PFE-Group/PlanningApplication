import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-calendar-information',
  templateUrl: './calendar-information.component.html',
  styleUrls: ['./calendar-information.component.css']
})

export class CalendarInformationComponent implements OnInit {
  picker: Date;
  picker2: Date;

  @Input()
  matDatepicker;
  
  @Input() 
  for;

  constructor() { }

  ngOnInit() {
    this.picker = new Date();
    this.picker2 = new Date();
  }

  modifyName(){

  }

}
