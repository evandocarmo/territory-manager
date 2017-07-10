import { UserService } from '../user.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var $ : any;
declare var Materialize :any;


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  problem = false;
  match = false;
  confirmPassword = '';
  constructor(private userService:UserService) { }
  checkMatch(){
    if(this.confirmPassword === this.user.password){
      this.match = true;
    } else {
      this.match = false;
    }
  }
  changePassword(){
    Materialize.toast("Please, wait...",1000);
    this.userService.changePassword(this.user).subscribe(
      response=>{
        Materialize.toast("Password successfully changed!",4000,"green white-text");
        console.log(response);
      },
      error=>{
        this.problem = true;
      }
    )
  }
  ngOnInit() {
  }

}
