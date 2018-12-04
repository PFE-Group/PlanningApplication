import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  currentState : string;

  constructor() { }

  ngOnInit() {
    this.currentState = 'Events';
  }


  setState(value : string) {
    this.currentState = value;
  }
}
