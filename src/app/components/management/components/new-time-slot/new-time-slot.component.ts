import { Component, OnInit } from '@angular/core';
import {PlanningEvent,createPlanningEvent} from 'src/app/shared/models/planning-event'


@Component({
  selector: 'app-new-time-slot',
  templateUrl: './new-time-slot.component.html',
  styleUrls: ['./new-time-slot.component.css']
})
export class NewTimeSlotComponent implements OnInit {
  tasks = Array<PlanningEvent>();

  constructor() { }

  ngOnInit() {
    this.getAllTasks();

  }
  getAllTasks() {
    var jsonTasks = {
      "tasks": [{
        "name": "math1",
        "expectedHours": 10,
        "doneHours": 5,
        "color": "red"
      },
      {
        "name": "pattern",
        "expectedHours": 5,
        "doneHours": 2,
        "color": "blue"
      },
      {
        "name": "SD",
        "expectedHours": 6,
        "doneHours": 0,
        "color": "vert"
      }
      ]
    }
    jsonTasks.tasks.forEach((el) => {
      this.tasks.push(createPlanningEvent({
        name: el.name,
        expectedHours: el.expectedHours,
        doneHours: el.doneHours,
        color: el.color
      } as Partial<PlanningEvent>))
    })
  }

}
