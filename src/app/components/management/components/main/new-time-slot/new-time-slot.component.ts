import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Task, createTask} from 'src/app/shared/models/task';
import { WebApiService } from 'src/app/shared/services/webapi';
import {HttpMethod} from 'src/app/shared/models/webapi';
import { AppStateService } from '../../../../../shared/services/app-state.service';
import { filter } from 'rxjs/internal/operators';
import {Planning} from '../../../../../shared/models/planning';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-new-time-slot',
  templateUrl: './new-time-slot.component.html',
  styleUrls: ['./new-time-slot.component.css']
})
export class NewTimeSlotComponent implements OnInit {

  startHour: Date;
  endHour: Date;
  task: String;

  myControl = new FormControl();

  message: String;

  filteredOptions: Observable<String[]>;
  tasks = [];

  planningCurrent: Planning;

  constructor(private webApiService: WebApiService, private appStateService: AppStateService) {
  }

  ngOnInit() {
    if (this.myControl) {
      this.myControl.valueChanges.subscribe(v => {
          this.task = v;
      });
    }
    this.listenToCurrentPlanning();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  }

  getAllTasks() {
  }

  listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planningCurrent=planning;
      for(var i in planning.tasks){
        this.tasks[i] = planning.tasks[i].name;
      }
    })
  }

  sendTimeSlot() {
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tasks.filter(option => option.toLowerCase().includes(filterValue));
  }
}