import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/shared/models/task';
import {TimeSlot} from 'src/app/shared/models/time-slot';
import {AppStateService} from '../../../../../../shared/services/app-state.service';
import {Planning} from '../../../../../../shared/models/planning';
import {filter} from 'rxjs/internal/operators';
import {WebApiService} from '../../../../../../shared/services/webapi';
import {Subject} from 'rxjs';
import {PlanningService} from '../../../../../../shared/services/planning';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.css']
})

export class CalendarEventsComponent implements OnInit {

  tasks = Array<Task>();
  timeSlots = Array<TimeSlot>();
  planning: Planning;
  refresh: Subject<any> = new Subject();

  constructor(private router: Router, private appStateService: AppStateService,
              private webApiService: WebApiService, private planningService: PlanningService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
  }

  private listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planning = planning;
      this.timeSlots = planning.timeSlots.sort((val1, val2) => {
        return (new Date(val1.startHour).getTime() - new Date(val2.startHour).getTime());
      });
      this.tasks = planning.tasks;
    });
  }

  addTimeSlot() {
    this.planningService.addTimeSlot(this.planning);
    this.listenToCurrentPlanning();
  }

  deleteTimeSlot(timeSlot: TimeSlot) {
    this.planningService.deleteTimeSlot(timeSlot, this.planning);
    this.listenToCurrentPlanning();
  }

  updateTimeSlotName(event, timeSlot: TimeSlot) {
    const newVal = event.target.value;
    timeSlot.task.name = newVal;
    this.planningService.updateTimeSlot(timeSlot, this.planning);
    this.listenToCurrentPlanning();
  }

  updateTaskColor(event, task: Task) {
    const newVal = event.target.value;
    task.color = newVal;
    this.planningService.updateTask(task, this.planning);
    this.listenToCurrentPlanning();
  }

  updateTimeSlotStartHour(event, timeSlot: TimeSlot) {
    timeSlot.startHour = event;
    this.planningService.updateTimeSlot(timeSlot, this.planning);
    this.listenToCurrentPlanning();
  }

  updateTimeSlotEndHour(event, timeSlot: TimeSlot) {
    timeSlot.endHour = event;
    this.planningService.updateTimeSlot(timeSlot, this.planning);
    this.listenToCurrentPlanning();
  }

}
