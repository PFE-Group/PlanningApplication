import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../shared/models/user';
import {Planning} from '../../shared/models/planning';
import {Observable} from 'rxjs/index';

import {PlanningService} from '../../shared/services/planning';
import {AppStateService} from '../../shared/services/app-state.service';
import {filter} from 'rxjs/operators';
import {UserService} from '../../shared/services/user';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  user: Observable<User>;
  plannings: Observable<Array<Planning>>;
  @Input() hasBackdrop: string;
  @Input() mode: string;
  planningName: string;
  displaySideBar = false;

  constructor(private planningService: PlanningService, private userService: UserService, private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.userService.fetchCurrentUser();
    this.user = this.userService.getCurrentUser();
    this.listenToCurrentPlanning();
    this.planningService.fetchPlannings(this.listenToCurrentUser());
    this.plannings = this.planningService.getPlannings();
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
    ).subscribe((planning: Planning) => {
      this.planningName = planning.name;
    });
  }

  // @ts-ignore
  private listenToCurrentUser(): string {
    this.appStateService.getCurrentUser().pipe(
      filter((user: User) => !!user)
    ).subscribe((user: User) => {
      return user;
    });
  }

}
