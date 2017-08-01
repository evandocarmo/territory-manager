import { Injectable, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

declare var $ : any;
declare var Materialize :any;

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
const API_URL = environment.API_URL;

@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(private router: Router, private http: Http) { }

  public loggedIn(){
  	if(tokenNotExpired()){
      console.log("you're already logged in");
  		return true;
  	}
  }

  public authenticate(username: string, password: string):Observable<boolean>{
   let body: string = JSON.stringify({"username":username,"password":password});
   return this.http.post(API_URL,body, { headers: contentHeaders })
      .map(response => {
          //localStorage.setItem('id_token', response.json().id_token);
          console.log(response);
          if(response.json().token){
            localStorage.setItem('token', response.json().token);
            let user = JSON.stringify(response.json().user);
            console.log(user);
            localStorage.setItem('user',user);
            return true;
          }else{
          	return false;
          }
        }
      );
  }
}
