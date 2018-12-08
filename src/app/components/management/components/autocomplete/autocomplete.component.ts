import {Component, OnInit,Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'autocomplete-component',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<String[]>;
  @Input() users:Array<User>;
  ngOnInit(){
    console.log(this.users);
    if(this.users!==undefined){
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    } 
  }
  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.users.map(user=>user.login).filter(login =>login.toLowerCase().indexOf(filterValue) === 0);
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */