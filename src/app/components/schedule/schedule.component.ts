import { Component, OnInit, Input } from '@angular/core';
import { User, createUser } from '../../shared/models/user';
import { Planning } from '../../shared/models/planning';
import { PlanningEvent, createPlanningEvent } from 'src/app/shared/models/planning-event';
import { TimeSlot, createTimeSlot } from 'src/app/shared/models/time-slot';
import {Observable} from 'rxjs/index';
import {PlanningService} from '../../shared/services/planning';
import {AppStateService} from '../../shared/services/app-state.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  user: User;
  plannings: Observable<Array<Planning>>;
  @Input() hasBackdrop: string;
  @Input() mode: string;

  planningName: string;
  displaySideBar = false;

  constructor(private planningService: PlanningService, private appStateService: AppStateService) { }

  ngOnInit() {
    this.listenToCurrentPlanning();
    this.planningService.fetchPlannings('111');
    this.plannings = this.planningService.getPlannings();
    this.user = createUser({
      firstName: 'Thomas',
      lastName: 'Ronsmans',
      login: 'T.R',
      profilePicture: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    }as Partial<User>);
  }

  deletePlanning(planning: Planning) {
    this.planningService.deletePlanning(planning);
  }

  toggleSideBar() {
    this.displaySideBar = !this.displaySideBar;
  }

  private listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) =>  {
      this.planningName = planning.name;
    });
  }

}
