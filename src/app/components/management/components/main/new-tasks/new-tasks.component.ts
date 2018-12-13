import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { filter } from 'rxjs/internal/operators';
import { Planning } from '../../../../../shared/models/planning';
import { AppStateService } from '../../../../../shared/services/app-state.service';
import { WebApiService } from 'src/app/shared/services/webapi';
import { HttpMethod } from 'src/app/shared/models/webapi';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.css']
})
export class NewTasksComponent implements OnInit {
  taskName: string
  hourExpected: number
  color: string
  planningCurrent: Planning

  @Output() messageError = new EventEmitter<any>();
  @Output() messageOK = new EventEmitter<any>();
  constructor(private appStateService: AppStateService, private webApiService: WebApiService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
  }
  listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planningCurrent = planning
    })
  }
  createTask() {

    this.webApiService.getResponse('/api/plannings/' + this.planningCurrent.id + '/task', HttpMethod.PUT, {
      name: this.taskName,
      color: this.color,
      hoursExpected: this.hourExpected
    }).then((res) => {
      this.messageOK.emit();
    }).catch((res) => {
      this.messageError.emit();
    })
  }


}
