import { Component, OnInit, Input } from '@angular/core';
import { PlanningEvent } from 'src/app/shared/models/planning-event';
import { TimeSlot, createTimeSlot } from 'src/app/shared/models/time-slot';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.css']
})
export class CalendarEventsComponent implements OnInit {

  @Input() planningEvent : PlanningEvent;
  @Input() timeSlot : Array<TimeSlot>;

  today = new Date();

  constructor() { }

  ngOnInit() {
  }

  addEvent(){
    this.timeSlot.push(createTimeSlot({
      start: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), this.today.getHours()),
      end : new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), this.today.getHours()),
      event : this.planningEvent,
      done : false
    }as Partial<TimeSlot>));
  }

}
