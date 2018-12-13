import { Component, OnInit } from '@angular/core';
import { WebApiService } from 'src/app/shared/services/webapi';
import { HttpMethod } from 'src/app/shared/models/webapi';

@Component({
  selector: 'app-planning-name-dialog',
  templateUrl: './planning-name-dialog.component.html',
  styleUrls: ['./planning-name-dialog.component.css']
})
export class PlanningNameDialogComponent implements OnInit {
  startDate: any
  endDate: any
  planningName: string
  showError: boolean
  showOk: boolean
  constructor(private webApiService: WebApiService) {
    this.showError = false;
    this.showOk = false;
  }

  ngOnInit() {
  }
  createPlanning() {
    this.webApiService.getResponse('/api/plannings/planning', HttpMethod.POST, {
      name: this.planningName,
      startDate: this.startDate,
      endDate: this.endDate
    }).then((res) => {
      this.showError=false;
      this.showOk=true;
    }).catch((res) => {
      this.showError=true;
      this.showOk=false;
    })
  }

}
