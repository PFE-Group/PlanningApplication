import { Component, OnInit } from '@angular/core';
import { User ,createUser } from 'src/app/shared/models/user';
import { Planning } from 'src/app/shared/models/planning';
import { filter } from 'rxjs/operators';
import { AppStateService } from '../../shared/services/app-state.service';
import { Observable } from 'rxjs';
import { PlanningService } from '../../shared/services/planning';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})

export class ManagementComponent implements OnInit {

  // control navbar 
  navbarOpen = false;
  plannings: Observable<Array<Planning>>;
  currentPlanning: Observable<Planning>;
  displaySideBar = false;

  user: User;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private appStateService: AppStateService, private planningService: PlanningService){

  }

  ngOnInit() {
    this.user = createUser({
      firstName: 'Thomas',
      lastName: 'Ronsmans',
      login: 'T.R',
      profilePicture: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    }as Partial<User>);
    this.listenToCurrentPlanning();
    this.planningService.fetchPlannings('111');
    this.plannings = this.planningService.getPlannings();
    console.log(this.plannings);
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
