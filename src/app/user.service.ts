import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../environments/environment';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('x-access-token',localStorage.getItem('token'));
//contentHeaders.append('Cache-Control','no-cache');
const API_URL: string = environment.API_URL + '/api/';

@Injectable()
export class UserService {

  constructor(private router: Router, private http: Http) { }

  public getAllUsers(): Observable<any>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    return this.http.get(API_URL + "users",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMaxedUsers(bool:boolean): Observable<any>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('maxed',bool ? "yes" : "no");
    options.params = params;
    return this.http.get(API_URL + "users",options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMaxedVisitingUsers(bool:boolean):Observable<any>{
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
    let params:URLSearchParams = new URLSearchParams();
    params.set('maxedVisits',bool ? "yes" : "no");
    options.params = params;
    return this.http.get(API_URL + "users", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateUser(user):Observable<any>{
    let putOptions = new RequestOptions( {method:'PUT', headers:contentHeaders});
    return this.http.put(API_URL+"users",JSON.stringify(user),putOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public changePassword(user){
    let password = user.password;
    user = user.id;
    console.log(user,password);
    let putOptions = new RequestOptions( {method:'PUT', headers:contentHeaders});
    return this.http.put(API_URL+"users/password",JSON.stringify({user:user,password:password}),putOptions)
      .map(this.extractData)
      .catch(this.handleError)

  }

  public addUser(user):Observable<any>{
    let postOptions = new RequestOptions({method:'POST',headers:contentHeaders});
    return this.http.post(API_URL+"users",JSON.stringify(user),postOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public deleteUser(user):Observable<any>{
    let deleteOptions = new RequestOptions({method:'DELETE',headers:contentHeaders});
    let params:URLSearchParams = new URLSearchParams();
    params.set("user",user.id);
    deleteOptions.params = params;
    return this.http.delete(API_URL+"users",deleteOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public getUserInfo(user?){
    let options = new RequestOptions( {method: 'GET', headers: contentHeaders });
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
