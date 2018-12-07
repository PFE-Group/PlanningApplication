import { Component, OnInit, Input } from '@angular/core';
import {CalendarDetailsEnum} from './models/calendar-details.enum';
import { PlanningEvent } from 'src/app/shared/models/planning-event';
import { TimeSlot } from 'src/app/shared/models/time-slot';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.css']
})
export class CalendarDetailsComponent implements OnInit {

  CalendarDetailsEnum = CalendarDetailsEnum;
  currentState: CalendarDetailsEnum;

  @Input() planningEvent : PlanningEvent;
  @Input() timeSlot : Array<TimeSlot>;

  constructor() { }

  ngOnInit() {
    this.currentState = CalendarDetailsEnum.Events;
  }

  setState(value: CalendarDetailsEnum) {
    this.currentState = value;
  }
}
