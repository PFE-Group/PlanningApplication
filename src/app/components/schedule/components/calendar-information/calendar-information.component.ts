import {Component, OnInit, Input} from '@angular/core';
import {Planning} from 'src/app/shared/models/planning';
import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {AppStateService} from '../../../../shared/services/app-state.service';
import {WebApiService} from '../../../../shared/services/webapi';
import {PlanningService} from '../../../../shared/services/planning';


@Component({
  selector: 'app-calendar-information',
  templateUrl: './calendar-information.component.html',
  styleUrls: ['./calendar-information.component.css']
})

export class CalendarInformationComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  planning: Planning;

  constructor(private appStateService: AppStateService, private webApiService: WebApiService, private planningService: PlanningService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
  }

  updatePlanningEndDate(event) {
    this.planning.endDate = event;
    this.planningService.updatePlanning(this.planning);
    this.listenToCurrentPlanning();
  }

  updatePlanningStartDate(event) {
    this.planning.startDate = event;
    this.planningService.updatePlanning(this.planning);
    this.listenToCurrentPlanning();
  }

  private listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planning = planning;
    });
  }

}
