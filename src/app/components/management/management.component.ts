import { Component, OnInit } from '@angular/core';
import {ManagementEnum} from './models/management.enum';
import { User ,createUser} from 'src/app/shared/models/user';
import {Planning,createPlanning} from 'src/app/shared/models/planning';
import { PlanningEvent } from 'src/app/shared/models/planning-event';
import { TimeSlot } from 'src/app/shared/models/time-slot';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  // control navbar 
  navbarOpen = false;
  plannings = Array<Planning>();

  user: User;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  //show the good screen 
  ManagementEnum = ManagementEnum; 
  currentState : ManagementEnum;
  constructor() { 
    this.currentState=ManagementEnum.plannings;
  }

  ngOnInit() {
    this.user = createUser({
      firstName: 'Thomas',
      lastName: 'Ronsmans',
      login: 'T.R',
      profilePicture: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    }as Partial<User>);
    this.plannings.push(createPlanning({
      name: 'Blocus',
      startDate: new Date('2018-12-06T09:00:00'),
      endDate: new Date('2018-12-06T15:00:00'),
      members: Array<User>(),
      events: Array<PlanningEvent>(),
      timeSlots: Array<TimeSlot>()
    }as Partial<Planning>));
    this.plannings.push(createPlanning({
      name: 'PFE',
      startDate: new Date('2018-12-01T09:00:00'),
      endDate: new Date('2018-12-14T23:00:00'),
      members: Array<User>(),
      events: Array<PlanningEvent>(),
      timeSlots: Array<TimeSlot>()
    }as Partial<Planning>));
    this.plannings.push(createPlanning({
      name: 'Projet Unity',
      startDate: new Date('2018-11-01T09:00:00'),
      endDate: new Date('2018-12-21T23:59:00'),
      members: Array<User>(),
      events: Array<PlanningEvent>(),
      timeSlots: Array<TimeSlot>()
    }as Partial<Planning>));
    console.log(this.user);
    console.log(this.plannings);
  }
  setState(value: ManagementEnum) {
    this.currentState = value;
  }
  
}
