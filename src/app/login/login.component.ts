import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";

declare var Materialize:any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http :Http,private authService: AuthService,private router: Router) {  }
  username:string;
  password:string;
  loading = false;
  ngOnInit() {
     this.router.navigate(['/home']);
  }

  login(event, username,password) {
    this.loading = true;
    this.authService.authenticate(username,password).subscribe(
      response=>{
        if(response){
          window.location.reload();
        }
        else{
          this.loading = false;
          Materialize.toast("Sorry. Incorrect name or password",4000,"red white-text");
        }
      }
    )
  }
}
