import { Injectable, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";

declare var $ : any;
declare var Materialize :any;

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
const API_URL: string = "https://apiterritory.herokuapp.com/";

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

  public authenticate(username: string, password: string):any{
   if(!this.redirectUrl)
       this.redirectUrl = "home";
   if(this.loggedIn())
     this.router.navigate([this.redirectUrl]);
   console.log("not logged in. Try and auth");
   let body: string = JSON.stringify({"username":username,"password":password});
   this.http.post(API_URL,body, { headers: contentHeaders })
      .subscribe(
        response => {
          //localStorage.setItem('id_token', response.json().id_token);
          console.log(response);
          if(response.json().token){
            localStorage.setItem('token', response.json().token);
            let user = JSON.stringify(response.json().user);
            console.log(user);
            localStorage.setItem('user',user);
            console.log("redirect url is " + this.redirectUrl);
            window.location.reload(true);
            return;
          }else{
            Materialize.toast("Sorry! Your credentials are incorrect.",4000,"red white-text");
          	return false;
          }
        },
        error => {
          console.log(error.text());
          return false;
        }
      );
  }
}
