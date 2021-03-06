import { Component, OnInit } from '@angular/core';
import { User, createUser } from 'src/app/shared/models/user';
import { Planning } from 'src/app/shared/models/planning';
import { filter } from 'rxjs/operators';
import { AppStateService } from '../../shared/services/app-state.service';
import { Observable } from 'rxjs';
import { PlanningService } from '../../shared/services/planning';
import { DivEnums } from './models/div.enums';
import { UserService } from '../../shared/services/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})

export class ManagementComponent implements OnInit {

  navbarOpen = false;
  plannings: Observable<Array<Planning>>;
  currentPlanning: Observable<Planning>;
  displaySideBar = false;
  DivEnums = DivEnums;
  currentDiv: DivEnums;
  showButton: boolean;
  user: Observable<User>;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onResize() {
    if (window.innerWidth < 1225) {
      this.showButton = true;
      this.currentDiv = DivEnums.management;
    } else {
      this.showButton = false;
      this.currentDiv = DivEnums.all;
    }
  }

  showDiv(div: DivEnums) {
    this.currentDiv = div;
  }

  constructor(private appStateService: AppStateService, private userService: UserService,
    private planningService: PlanningService) {

  }

  ngOnInit() {
    this.onResize();
    this.userService.fetchCurrentUser();
    this.user = this.userService.getCurrentUser();
    this.listenToCurrentPlanning();
    this.planningService.fetchPlannings();
    this.plannings = this.planningService.getPlannings();
  }

  private listenToCurrentPlanning() {
    this.currentPlanning = this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    );
  }

  deletePlanning(planning: Planning) {
    this.planningService.deletePlanning(planning);
  }

  toggleSideBar() {
    this.displaySideBar = !this.displaySideBar;
  }
}
