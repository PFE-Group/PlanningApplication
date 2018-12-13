import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { IWebApiService } from './webapi.service.interface';
import { AuthService } from 'src/app/services/auth.services';

import {Observable} from 'rxjs';
import {HttpMethod} from '../../models/webapi/http-method.enum';

@Injectable()
export class WebApiService implements IWebApiService {


  constructor(private http: HttpClient,private authService: AuthService) { }

  getResponse(url: string, method: HttpMethod, payload?: any, timeout: number = 10000): Promise<any> {
    var jwt = this.authService.retrieveToken() === null ? "" : this.authService.retrieveToken()
    var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization" : jwt
  
    };
    return new Promise((resolve, reject) => {
      let observable: Observable<Object>;
      switch (method) {
        case HttpMethod.GET:
          observable = this.http.get(url, {headers: headers});
          break;
        case HttpMethod.POST:
          observable = this.http.post(url, payload, {headers: headers});
          break;
        case HttpMethod.PUT:
          observable = this.http.put(url, payload, {headers: headers});
          break;
        case HttpMethod.DELETE:
          observable = this.http.delete(url, {headers: headers});
          break;
        case HttpMethod.PATCH:
          observable = this.http.patch(url, payload, {headers: headers});
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
