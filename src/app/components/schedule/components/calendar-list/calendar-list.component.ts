import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Planning} from '../../../../shared/models/planning';
import {Observable} from 'rxjs/index';
import {AppStateService} from '../../../../shared/services/app-state.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent implements OnInit {

  @Input() plannings: Observable<Array<Planning>>;
  @Output() deletePlanningEmitter = new EventEmitter<Planning>();

  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
  }

  deletePlanning(planning: Planning) {
    this.deletePlanningEmitter.emit(planning);
  }

  setCurrentPlanning(planning: Planning) {
    this.appStateService.setCurrentPlanning(planning);
  }

}
