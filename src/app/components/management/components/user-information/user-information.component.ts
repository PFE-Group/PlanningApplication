import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../../../shared/models/user';
import {UserService} from '../../../../shared/services/user';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Planning} from '../../../../shared/models/planning';
import {convertTimeSlotsToCalendarEvent} from '../../../../shared/models/time-slot';
import {AppStateService} from '../../../../shared/services/app-state.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {

  logOutLogo = 'http://cdn.onlinewebfonts.com/svg/img_235476.png';
  user: User;

  constructor(private userService: UserService, private appStateService : AppStateService) {
  }

  ngOnInit() {
    this.userService.fetchCurrentUser();
    this.userService.getCurrentUser().pipe(
      filter((user: User) => !!user)
    ).subscribe((user: User) => {
      this.user = user;
    });
  }

  logOut() {
    this.userService.logOut();
  }

}
