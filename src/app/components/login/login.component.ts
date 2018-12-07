import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  userPassword: string;
  messageToShow:string;
  good: boolean = false;

  constructor(private httpClient: HttpClient) { }
  
  storeToken(token){
    const serialized = JSON.stringify(token);
    localStorage.setItem("token", serialized);
  }

  retrieveToken(){
    const serialized = localStorage.getItem("token");
    return JSON.parse(serialized);
  }

  clearToken(){
    localStorage.removeItem("token");
  }

  logIn(){
    this.httpClient
      .post('http://localhost:3030/api/login/login',{
        email : this.userEmail,
        password : this.userPassword
      })
      .subscribe( (data) => {
        this.storeToken(data)
        this.good = true;
        this.messageToShow = "Success !"
      },
      (err) => {
        this.good = false;
        this.messageToShow = err.error.message
      })
  }

  signIn(){
    this.httpClient
      .post('http://localhost:3030/api/login/register', {
        email : this.userEmail,
        password : this.userPassword
      })
      .subscribe( () => {
        this.logIn()
        this.good = true;
        this.messageToShow = "Success !"
      },
      (err) => {
        this.good = false;
        this.messageToShow = err.error.message
      })
  }

  ngOnInit() {
  }

}
