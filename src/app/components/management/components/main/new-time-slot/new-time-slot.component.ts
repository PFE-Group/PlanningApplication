import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Task, createTask} from 'src/app/shared/models/task';
import { WebApiService } from 'src/app/shared/services/webapi';
import {HttpMethod} from 'src/app/shared/models/webapi';
import { AppStateService } from '../../../../../shared/services/app-state.service';
import { filter } from 'rxjs/internal/operators';
import {Planning} from '../../../../../shared/models/planning';

@Component({
  selector: 'app-new-time-slot',
  templateUrl: './new-time-slot.component.html',
  styleUrls: ['./new-time-slot.component.css']
})
export class NewTimeSlotComponent implements OnInit {

  startHour: Date;
  endHour: Date;
  task: String;

  message: String;

  myControl = new FormControl();
  filteredOptions: Observable<String[]>;
  @Input() tasks: Array<Task> = new Array<Task>();

  planningCurrent: Planning;

  constructor(private webApiService: WebApiService, private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
  }

  getAllTasks() {
  }

  listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planningCurrent=planning
      this.tasks = planning.tasks;
    })
  }

  sendTimeSlot() {
    console.log(this.planningCurrent)
    if(!this.startHour || !this.task || !this.endHour) {
      this.message = "Tous les champs sont requis. Veuillez prêter attention au format des dates.";
      return;
    }
    this.webApiService.getResponse("/api/plannings/"+this.planningCurrent.id+"/timeslot", HttpMethod.POST, { 
      task: this.task,
      startHour: this.startHour,
      endHour: this.endHour
    }).then((res) => {
      this.message = "Plage horaire sauvegardée";
    }).catch((error) => {
      if(error.error) {
        this.message = error.error.message;
      } else {
        this.message = "Erreur inconnue";
      }
    });
    
  }
}