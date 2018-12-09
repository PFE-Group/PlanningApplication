import { Component, OnInit } from '@angular/core';
import {CalendarDetailsEnum} from './models/calendar-details.enum';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.css']
})
export class CalendarDetailsComponent implements OnInit {

  CalendarDetailsEnum = CalendarDetailsEnum;
  currentState: CalendarDetailsEnum;

  constructor() { }

  ngOnInit() {
    this.currentState = CalendarDetailsEnum.Events;
  }

  setState(value: CalendarDetailsEnum) {
    this.currentState = value;
  }
}
