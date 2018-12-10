import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Planning} from '../../../../shared/models/planning';
import {Observable} from 'rxjs/index';
import {AppStateService} from '../../../../shared/services/app-state.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PlanningNameDialogComponent} from './components/planning-name-dialog/planning-name-dialog.component';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})

export class CalendarListComponent implements OnInit {

  planningNameDialogRef: MatDialogRef<PlanningNameDialogComponent>;

  @Input() plannings: Observable<Array<Planning>>;
  @Output() deletePlanningEmitter = new EventEmitter<Planning>();

  constructor(private appStateService: AppStateService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  deletePlanning(planning: Planning) {
    this.deletePlanningEmitter.emit(planning);
  }

  setCurrentPlanning(planning: Planning) {
    this.appStateService.setCurrentPlanning(planning);
  }

  openAddPlanningDialog(){
    this.planningNameDialogRef = this.dialog.open(PlanningNameDialogComponent);
  }

  updatePlanning(planning: Planning) {
    this.router.navigate(['management']);
  }

}
