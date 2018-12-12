import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { IWebApiService } from './webapi.service.interface';
import { AuthService } from 'src/app/services/auth.services';

import {Observable} from 'rxjs';
import {HttpMethod} from '../../models/webapi/http-method.enum';

@Injectable()
export class WebApiService implements IWebApiService {
  jwt = this.authService.retrieveToken() === null ? "" : this.authService.retrieveToken()
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization" : this.jwt

  };

  constructor(private http: HttpClient,private authService: AuthService) { }

  getResponse(url: string, method: HttpMethod, payload?: any, timeout: number = 10000): Promise<any> {
    return new Promise((resolve, reject) => {
      let observable: Observable<Object>;
      switch (method) {
        case HttpMethod.GET:
          observable = this.http.get(url, { headers: this.headers });
          break;
        case HttpMethod.POST:
          observable = this.http.post(url, payload, { headers: this.headers });
          break;
        case HttpMethod.PUT:
          observable = this.http.put(url, payload, { headers: this.headers });
          break;
      }
      observable.pipe(
        take(1)
      ).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });

    });
  }

}
