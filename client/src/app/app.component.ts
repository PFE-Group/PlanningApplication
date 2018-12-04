import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
	headers: new HttpHeaders({ 
		'Access-Control-Allow-Origin':'*',
	})
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'client';
	ajaxCall=function(){
		this.http.get('http://localhost:3030/users/current').subscribe(data => {
      console.log(data);
    });
	}
	
	constructor(private http:HttpClient) {}
  
}
