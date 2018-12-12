import { Component, OnInit, Input } from '@angular/core';
import { User, createUser } from '../../shared/models/user';
import { Planning, createPlanning } from '../../shared/models/planning';
import { PlanningEvent } from 'src/app/shared/models/planning-event';
import { TimeSlot } from 'src/app/shared/models/time-slot';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  user: User;
  plannings = Array<Planning>();
  planningSelected: Planning;

  @Input() hasBackdrop: string;
  @Input() mode: string;


  constructor() { }

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

}
