import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {User} from 'src/app/shared/models/user';


/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'autocomplete-component-users',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css'],
})
export class AutocompleteComponentUser implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<String[]>;
  // ManagementEnum= ManagementEnum
  // currentState: ManagementEnum;
  @Input() users: Array<User>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.users.map(user => user.login).filter(login => login.toLowerCase().indexOf(filterValue) === 0);
  }
}

