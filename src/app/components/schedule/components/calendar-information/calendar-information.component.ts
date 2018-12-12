import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { AppStateService } from '../../../../shared/services/app-state.service';
import { filter } from 'rxjs/internal/operators';
import { Planning } from '../../../../shared/models/planning';
import { WebApiService } from 'src/app/shared/services/webapi';
import { HttpMethod } from 'src/app/shared/models/webapi';


@Component({
  selector: 'app-calendar-information',
  templateUrl: './calendar-information.component.html',
  styleUrls: ['./calendar-information.component.css']
})

export class CalendarInformationComponent implements OnInit {
   //----------- pour stocker les nouvelles données s ------------------------
   planningNameBeforeUp: string
   startDateBeforeUp: Date
   endDateBeforeUp: Date
   //----------- pour afficher les données dans le div ------------------------
   endDate: Date
   startDate: Date
   planningName: string
   planningID: string
   //// gestion error--------------------
   showError: boolean
   showOk: boolean
   // variable pour le panel
   step: number
   @Input() matDatepicker;
 
   @Input() for;

  constructor(private webApiService: WebApiService, private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.listenToCurrentPlanning();
    this.showError = false
    this.showOk = false
    this.step=-1;

  }

  changer() {
    console.log(this.planningNameBeforeUp + ":" + this.planningID + ":" + this.startDate + ":" + this.endDate)
    this.webApiService.getResponse('/api/plannings/' + this.planningID, HttpMethod.PATCH, {
      name: this.planningNameBeforeUp,
      startDate: this.startDateBeforeUp,
      endDate: this.endDateBeforeUp,
    }).then((res) => {
      this.showError = false
      this.showOk = true
      

    }).catch((err) => {
      this.showError = true
      this.showOk = false
    })
  }
  setStep(index: number) {
    this.showError = false;
    this.showOk = false;
    this.planningNameBeforeUp=''
    this.startDateBeforeUp=null;
      this.endDateBeforeUp=null;

    this.step = index;
  }

  listenToCurrentPlanning() {
    this.appStateService.getCurrentPlanning().pipe(
      filter((planning: Planning) => !!planning)
    ).subscribe((planning: Planning) => {
      this.planningID = planning.id;
      this.planningName = planning.name;
      this.endDate = planning.endDate;
      this.startDate = planning.startDate;

    })
  }
  

}
