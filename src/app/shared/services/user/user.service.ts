import { Injectable } from '@angular/core';
import { WebApiService } from '../webapi';
import { HttpMethod } from '../../models/webapi';
import { AppStateService } from '../app-state.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { createUser, User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  userSubject = new BehaviorSubject<User>(undefined);
  usersSubjects = new BehaviorSubject<Array<User>>([]);

  constructor(private appStateService: AppStateService, private webApiService: WebApiService, private router: Router) {

  }

  fetchCurrentUser() {
    this.webApiService.getResponse(`/api/users/current`, HttpMethod.GET)
      .then(
        (data: any[]) => {
          // @ts-ignore
          const user = createUser(data);
          this.userSubject.next(user);
        },
        (error: any) => {
        });
  }

  getCurrentUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  logOut(): void {
    this.userSubject = undefined;
    this.usersSubjects = undefined;
    this.router.navigate(['login']);
    localStorage.removeItem("token");
  }

}
