import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.css']
})
export class CalendarDetailsComponent implements OnInit {


  currentState : string;
  constructor() { }

  ngOnInit() {
    this.currentState = 'Events';
  }

  setState(value : string) {
    this.currentState = value;
  }
}
