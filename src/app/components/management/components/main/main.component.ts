import { Component, OnInit } from '@angular/core';
import { User, createUser } from 'src/app/shared/models/user'
import {PlanningEvent,createPlanningEvent} from 'src/app/shared/models/planning-event'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
// export class MainComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

export class MainComponent implements OnInit {
  step = 0;
  users = Array<User>();
  tasks = Array<PlanningEvent>();

  ngOnInit() {
    this.getAllUsers();
    this.getAllTasks();
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor() {

  }

  getAllUsers() {
    var jsonUsers = {
      "users": [{
        "firstName": "dani",
        "lastName": "rocha",
        "login": "danii",
        "profilePicture": "....."
      },
      {
        "firstName": "ismail",
        "lastName": "abdou",
        "login": "isma",
        "profilePicture": "....."
      }, {
        "firstName": "youness",
        "lastName": "Belhassnaoui",
        "login": "you",
        "profilePicture": "....."
      }
      ]
    }
    jsonUsers.users.forEach((el) => {
      this.users.push(createUser({
        firstName: el.firstName,
        lastName: el.lastName,
        login: el.login,
        profilePicture: el.profilePicture
      } as Partial<User>))
    })

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


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */