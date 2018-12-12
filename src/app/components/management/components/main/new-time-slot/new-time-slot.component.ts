import {Component, OnInit} from '@angular/core';
import {Task, createTask} from 'src/app/shared/models/task';


@Component({
  selector: 'app-new-time-slot',
  templateUrl: './new-time-slot.component.html',
  styleUrls: ['./new-time-slot.component.css']
})
export class NewTimeSlotComponent implements OnInit {
  tasks = Array<Task>();

  constructor() {
  }

  ngOnInit() {
    this.getAllTasks();

  }

  getAllTasks() {
    const jsonTasks = {
      'tasks': [{
        'name': 'math1',
        'expectedHours': 10,
        'doneHours': 5,
        'color': 'red'
      },
        {
          'name': 'pattern',
          'expectedHours': 5,
          'doneHours': 2,
          'color': 'blue'
        },
        {
          'name': 'SD',
          'expectedHours': 6,
          'doneHours': 0,
          'color': 'vert'
        }
      ]
    };
    jsonTasks.tasks.forEach((el) => {
      this.tasks.push(createTask({
        name: el.name,
        expectedHours: el.expectedHours,
        doneHours: el.doneHours,
        color: el.color
      } as Partial<Task>));
    });
  }

}