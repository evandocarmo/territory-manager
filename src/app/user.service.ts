import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('x-access-token',localStorage.getItem('token'));
let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
const API_URL: string = "https://modern-territory-evandocarmo.c9users.io/api/";

@Injectable()
export class UserService {

  constructor(private router: Router, private http: Http) { }

  public getAllUsers(): Observable<any>{
    return this.http.get(API_URL + "users",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMaxedUsers(bool:boolean): Observable<any>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('maxed',bool ? "yes" : "no");
    options.params = params;
    return this.http.get(API_URL + "users",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMaxedVisitingUsers(bool:boolean):Observable<any>{
    let params:URLSearchParams = new URLSearchParams();
    params.set('maxedVisits',bool ? "yes" : "no");
    options.params = params;
    return this.http.get(API_URL + "users", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUserInfo(user?){
    let info = user ? user : "me";
    let params:URLSearchParams = new URLSearchParams();
    params.set('info',info);
    options.params = params;
    return this.http.get(API_URL + "users", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    (JSON.stringify(body));
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
