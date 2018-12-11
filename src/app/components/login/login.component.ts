import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserEmail: string;
  loginUserPassword: string;

  registerUserLastname: string;
  registerUserFirstname: string;
  registerUserLogin: string;
  registerUserEmail: string;
  registerUserPassword: string;

  authStatus: boolean;

  messageToShow: string;
  good: boolean = false;

  constructor(private httpClient: HttpClient, private authService: AuthService, private route: Router) { }

  logIn() {
    var jwt = this.authService.retrieveToken() === null ? "" : this.authService.retrieveToken()

    var httpOptions = {
      headers: new HttpHeaders({
        "Accept" : "application/json",
        "Content-type": "application/json", 
        "Authorization" : jwt
      })
    }
    this.httpClient
      .post('http://localhost:3030/api/login/login', {
        email: this.loginUserEmail,
        password: this.loginUserPassword
      }, httpOptions)
      .subscribe((data) => {
        console.log("DATa : ", data)
        this.authService.logIn(data["jwt"])
        this.good = true;
        this.messageToShow = "Success !"
        this.route.navigate(['schedule'])
      },
        (err) => {
          this.good = false;
          this.messageToShow = err
        })
  }

  signIn() {
    this.httpClient
      .post('http://localhost:3030/api/login/register', {
        email: this.registerUserEmail,
        password: this.registerUserPassword,
        lastName: this.registerUserLastname,
        firstName: this.registerUserFirstname,
        login: this.registerUserLogin
      })
      .subscribe(() => {
        this.loginUserEmail = this.registerUserEmail;
        this.loginUserPassword = this.registerUserPassword;
        this.logIn()
        this.good = true;
        this.messageToShow = "Success !"
      },
        (err) => {
          this.good = false;
          this.messageToShow = err.error.message
        })
  }

  signOut() {
    this.authService.logOut()
  }

  ngOnInit() {
    this.authStatus = this.authService.checkIfAuth()
    if (this.authStatus){
      this.route.navigate['schedule']
    }

  }
}