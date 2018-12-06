import { Component, OnInit, Input } from '@angular/core';
import { User, createUser } from '../../shared/models/user';
import { Planning, createPlanning } from '../../shared/models/planning';
import { PlanningEvent, createPlanningEvent } from 'src/app/shared/models/planning-event';
import { TimeSlot, createTimeSlot } from 'src/app/shared/models/time-slot';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  user : User;
  plannings : Array<Planning>;

  constructor() { }

  ngOnInit() {

    this.user = createUser({
      firstName: 'Thomas',
      lastName: 'Ronsmans',
      login: 'T.R',
      profilePicture: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    }as Partial<User>);
/*
    this.plannings.push(createPlanning({
      name: 'Blocus',
      startDate: new Date('2018-12-06T03:09:00'),
      endDate: new Date('2018-12-06T03:15:00'),
      members: Array<User>(),
      events: Array<PlanningEvent>(),
      timeSlots: Array<TimeSlot>()
    }as Partial<Planning>));
*/
    console.log(this.user);

  }

}
