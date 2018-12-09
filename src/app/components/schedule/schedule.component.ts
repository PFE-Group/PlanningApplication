import { Component, OnInit, Input } from '@angular/core';
import { User, createUser } from '../../shared/models/user';
import { Planning } from '../../shared/models/planning';
import { PlanningEvent, createPlanningEvent } from 'src/app/shared/models/planning-event';
import { TimeSlot, createTimeSlot } from 'src/app/shared/models/time-slot';
import {CalendarListService} from './components/calendar-list/services';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  user: User;
  plannings: Observable<Array<Planning>>;
  planningEvent: PlanningEvent;
  timeSlot = Array<TimeSlot>();
  today = new Date();
  @Input() hasBackdrop: string;
  @Input() mode: string;

  displaySideBar = true;

  constructor(private calendarListService: CalendarListService) { }

  ngOnInit() {
    this.calendarListService.fetchPlannings('111');
    this.calendarListService.getPlannings();
    this.plannings = this.calendarListService.getPlannings();
    // this.planningEvent = createPlanningEvent({
    //   name: 'Math',
    //   expectedHours: 15,
    //   doneHours: 8,
    //   color: '#181800'
    //
    // }as Partial<PlanningEvent>);
    //
    // this.timeSlot.push(createTimeSlot({
    //   start: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), this.today.getHours()),
    //   end : new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), this.today.getHours()+7),
    //   event : this.planningEvent,
    //   done : false
    // }as Partial<TimeSlot>));
    //
    // this.timeSlot.push(createTimeSlot({
    //   start: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1, this.today.getHours()),
    //   end : new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1, this.today.getHours()+12),
    //   event : this.planningEvent,
    //   done : false
    // }as Partial<TimeSlot>));
    //
    this.user = createUser({
      firstName: 'Thomas',
      lastName: 'Ronsmans',
      login: 'T.R',
      profilePicture: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    }as Partial<User>);

    // this.plannings.push(createPlanning({
    //   name: 'Blocus',
    //   startDate: new Date('2018-12-06T09:00:00'),
    //   endDate: new Date('2018-12-06T15:00:00'),
    //   members: Array<User>(),
    //   events: Array<PlanningEvent>(),
    //   timeSlots: Array<TimeSlot>()
    // }as Partial<Planning>));
    //
    // this.plannings.push(createPlanning({
    //   name: 'PFE',
    //   startDate: new Date('2018-12-01T09:00:00'),
    //   endDate: new Date('2018-12-14T23:00:00'),
    //   members: Array<User>(),
    //   events: Array<PlanningEvent>(),
    //   timeSlots: Array<TimeSlot>()
    // }as Partial<Planning>));
    //
    // this.plannings.push(createPlanning({
    //   name: 'Projet Unity',
    //   startDate: new Date('2018-11-01T09:00:00'),
    //   endDate: new Date('2018-12-21T23:59:00'),
    //   members: Array<User>(),
    //   events: Array<PlanningEvent>(),
    //   timeSlots: Array<TimeSlot>()
    // }as Partial<Planning>));

    console.log(this.user);
    console.log(this.plannings);
  }

  deletePlanning(planning: Planning) {
    this.calendarListService.deletePlanning(planning);
  }

  toggleSideBar(){
    this.displaySideBar = !this.displaySideBar;
  }

}
