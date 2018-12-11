import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/shared/models/task';
import {createTimeSlot, TimeSlot} from 'src/app/shared/models/time-slot';
import {AppStateService} from '../../../../../../shared/services/app-state.service';
import {Planning} from '../../../../../../shared/models/planning';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.css']
})
export class CalendarEventsComponent implements OnInit {

  tasks = Array<Task>();
  timeSlots = Array<TimeSlot>();
  planningName: string;

  constructor(private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
    console.log(this.planningName + ' - ' + this.tasks + ' - ' + this.timeSlots);
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
      this.planningName = planning.name;
      this.timeSlots = planning.timeSlots;
      this.tasks = planning.tasks;
    });
  }


}
