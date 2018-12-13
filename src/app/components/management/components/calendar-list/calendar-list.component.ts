import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Planning} from '../../../../shared/models/planning';
import {Observable} from 'rxjs/index';
import {AppStateService} from '../../../../shared/services/app-state.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PlanningNameDialogComponent} from './components/planning-name-dialog/planning-name-dialog.component';
import {PlanningService} from '../../../../shared/services/planning';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})

export class CalendarListComponent implements OnInit {

  @Input() plannings: Observable<Array<Planning>>;

  constructor(private appStateService: AppStateService, private router: Router,
              private dialog: MatDialog, private planningService: PlanningService) {
  }

  ngOnInit() {
  }

  deletePlanning(planning: Planning) {
    this.planningService.deletePlanning(planning);
    this.plannings = this.planningService.getPlannings();
  }

  setCurrentPlanning(planning: Planning) {
    this.appStateService.setCurrentPlanning(planning);
  }

  openAddPlanningDialog() {
    const planningNameDialogRef = this.dialog.open(PlanningNameDialogComponent);
    planningNameDialogRef.afterClosed().subscribe(() => {
      this.planningService.fetchPlannings();
      this.plannings = this.planningService.getPlannings();
    });
  }

  updatePlanning(planning: Planning) {
    this.router.navigate(['management']);
  }

}
