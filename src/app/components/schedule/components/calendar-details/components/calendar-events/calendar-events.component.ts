import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/shared/models/task';
import {createTimeSlot, TimeSlot} from 'src/app/shared/models/time-slot';
import {AppStateService} from '../../../../../../shared/services/app-state.service';
import {createPlannings, Planning} from '../../../../../../shared/models/planning';
import {filter} from 'rxjs/internal/operators';
import {forEach} from '@angular/router/src/utils/collection';
import {WebApiService} from '../../../../../../shared/services/webapi';
import {HttpMethod} from '../../../../../../shared/models/webapi';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.css']
})
export class CalendarEventsComponent implements OnInit {

  tasks = Array<Task>();
  timeSlots = Array<TimeSlot>();
  planning: Planning;

  constructor(private appStateService: AppStateService, private webApiService: WebApiService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
  }

  addEvent() {
    const today = new Date();
    this.timeSlots.push(createTimeSlot({
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours()),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours()),
      task: this.tasks[0],
      done: false
    } as Partial<TimeSlot>));
  }

  private listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planning = planning;
      console.log(this.planning.name);
      console.log(this.planning.id);
      this.timeSlots = planning.timeSlots;
      this.tasks = planning.tasks;
    });
  }

  deleteTimeSlot(timeSlot: TimeSlot){
    this.webApiService.getResponse(`/api/plannings/${this.planning.id}/timeslot/${timeSlot.id}`, HttpMethod.DELETE)
      .then(
      (data: any[]) => {
        // parse data
        console.log('plannings info ', data);
        // @ts-ignore
        // const planning = createPlanning(data);
        // console.log('plannings parsed ', planning);
      }, (error: any) => {
        console.error('error get plannings', error);
      }
    );
  }

}
