import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlanningService} from '../../../../../../shared/services/planning';
import {NgForm} from '@angular/forms';
import {fullPlanning} from 'src/app/shared/models/planning';

@Component({
  selector: 'app-planning-name-dialog',
  templateUrl: './planning-name-dialog.component.html',
  styleUrls: ['./planning-name-dialog.component.css']
})
export class PlanningNameDialogComponent implements OnInit {

  @Output() onAdd = new EventEmitter();

  constructor(private planningService: PlanningService) {
  }

  ngOnInit() {
  }

  onSubmit(addPlanning: NgForm) {
    const planningToAdd = fullPlanning();
    planningToAdd.name = addPlanning.value.name;
    planningToAdd.endDate = new Date(addPlanning.value.endDate);
    planningToAdd.startDate = new Date(addPlanning.value.startDate);
    this.planningService.addPlanning(planningToAdd);
    this.onAdd.emit();
  }

}
