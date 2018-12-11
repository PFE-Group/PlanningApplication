import {Component, OnInit} from '@angular/core';
import {User, createUser} from 'src/app/shared/models/user';
import {WebApiService} from 'src/app/shared/services/webapi';
import {HttpMethod} from 'src/app/shared/models/webapi';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  // autoComplete
  myControl = new FormControl();
  filteredOptions: Observable<String[]>;

  users = Array<User>();
  loginUser: string;
  membre: boolean;

  constructor(private webApiService: WebApiService) {
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.webApiService.getResponse('/api/users', HttpMethod.GET, {}).then((res) => {
      this.users = res;
    });
  }

  inviteUser() {
    let role = '';
    if (this.membre === true) {
      role = 'membre';
    } else {
      role = 'invite';
    }
    this.webApiService.getResponse('/api/plannings/Q8KROwZvxkxwGxelnI9u/member', HttpMethod.PUT, {
      login: this.loginUser,
      role: role
    }).then((res) => {
      console.log(res.getResponse);
      /* clear input
       this.loginUser='';
      */
    });
  }


  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.users.map(user => user.login).filter(login => login.toLowerCase().indexOf(filterValue) === 0);
  }


}
