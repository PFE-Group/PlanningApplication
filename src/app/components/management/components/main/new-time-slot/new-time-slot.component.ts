import {Component, OnInit} from '@angular/core';
import {Task, createTask} from 'src/app/shared/models/task';


@Component({
  selector: 'app-new-time-slot',
  templateUrl: './new-time-slot.component.html',
  styleUrls: ['./new-time-slot.component.css']
})
export class NewTimeSlotComponent implements OnInit {

  startDate: any;
  endDate: any;
  task: String;
  tasks: Array<Task>

  constructor() {
    this.tasks = new Array<Task>();
  }

  ngOnInit() {
  }

  getAllTasks() {
  }

  sendTimeSlot() {
    console.log("HELLO")
  }
}