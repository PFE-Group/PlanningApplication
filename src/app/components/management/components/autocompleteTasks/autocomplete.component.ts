import {Component, OnInit,Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PlanningEvent } from 'src/app/shared/models/planning-event';


/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'autocomplete-component-tasks',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css'],
})
export class AutocompleteComponentTasks implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<String[]>;
  @Input() tasks:Array<PlanningEvent>;
  ngOnInit(){
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    
  }
  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.tasks.map(task=>task.name).filter(name =>name.toLowerCase().indexOf(filterValue) === 0);
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */