import { Component, OnInit } from '@angular/core';
import { TimeSlot } from 'src/app/shared/models/time-slot';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  date = new Date();
  timeslots = Array<TimeSlot>();

  constructor() { }

  ngOnInit() {
  }

  gotoLastWeek() {
    const today = this.date;
    this.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  }

  goToNextWeek() {
    const today = this.date;
    this.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  }

}
