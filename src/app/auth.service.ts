import { Injectable, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
const API_URL: string = "https://modern-territory-evandocarmo.c9users.io/";

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

  public authenticate(username: string, password: string){
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
            this.router.navigate(["home"]);
          }else{
          	return false;
          }
        },
        error => {
          alert(error.text());
          console.log(error.text());
          return false;
        }
      );
  }
}
