import {Component, OnInit} from '@angular/core';
import {AppStateService} from '../../../../shared/services/app-state.service';
import {convertTimeSlotsToCalendarEvent, TimeSlot} from '../../../../shared/models/time-slot';
import {Planning} from '../../../../shared/models/planning';
import {filter} from 'rxjs/internal/operators';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {PlanningService} from '../../../../shared/services/planning';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  date = new Date();
  calendarEvents = Array<CalendarEvent>();
  timeSlots = Array<TimeSlot>();
  planning: Planning;
  refresh = new Subject<void>();

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  constructor(private appStateService: AppStateService,
              private planningService: PlanningService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
  }

  back(): void {
    const currDate = this.date;
    switch (this.view) {
      case CalendarView.Day:
        this.date = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() - 1);
        break;
      case CalendarView.Month:
        this.date = new Date(currDate.getFullYear(), currDate.getMonth() - 1, currDate.getDate());
        break;
      case CalendarView.Week:
        this.date = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() - 7);
        break;
      default:
        break;
    }
  }

  forward(): void {
    const currDate = this.date;
    switch (this.view) {
      case CalendarView.Day:
        this.date = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 1);
        break;
      case CalendarView.Month:
        this.date = new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate());
        break;
      case CalendarView.Week:
        this.date = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 7);
        break;
      default:
        break;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    const index = this.calendarEvents.indexOf(event);
    if (index >= 0) {
      this.timeSlots[index].startHour = newStart;
      this.timeSlots[index].endHour = newEnd;
      this.planningService.updateTimeSlot(this.timeSlots[index], this.planning);
      this.refreshCalendar();
      this.listenToCurrentPlanning();
    }
  }

  private listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.calendarEvents = convertTimeSlotsToCalendarEvent(planning.timeSlots);
      this.timeSlots = planning.timeSlots;
      this.planning = planning;
    });
  }

  private refreshCalendar(): void {
    this.refresh.next();
  }


}
