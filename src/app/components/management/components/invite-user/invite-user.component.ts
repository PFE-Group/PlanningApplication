import { Component, OnInit } from '@angular/core';
import { User, createUser } from 'src/app/shared/models/user'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  users = Array<User>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("okok");
    this.http.get('/users').subscribe((data)=>{
      console.log(data)
    })
    this.getAllUsers();

  }
  getAllUsers() {
    var jsonUsers = {
      "users": [{
        "firstName": "dani",
        "lastName": "rocha",
        "login": "danii",
        "profilePicture": "....."
      },
      {
        "firstName": "ismail",
        "lastName": "abdou",
        "login": "isma",
        "profilePicture": "....."
      }, {
        "firstName": "youness",
        "lastName": "Belhassnaoui",
        "login": "you",
        "profilePicture": "....."
      }
      ]
    }
    jsonUsers.users.forEach((el) => {
      this.users.push(createUser({
        firstName: el.firstName,
        lastName: el.lastName,
        login: el.login,
        profilePicture: el.profilePicture
      } as Partial<User>))
    })

  }

}
