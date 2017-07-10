import { Component, OnInit,EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-change-passwords',
  templateUrl: './change-passwords.component.html',
  styleUrls: ['./change-passwords.component.css']
})
export class ChangePasswordsComponent implements OnInit {

  problem :boolean = false;
  changePasswordUser = {id:0,password:''};
  loading = false;
  users = Array();
  match = false;
  confirmPassword = '';

  constructor(private userService:UserService) { }
  checkMatch(){
    if(this.confirmPassword === this.changePasswordUser.password){
      this.match = true;
    } else {
      this.match = false;
    }
  }
  ngOnInit() {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      response=>{
        console.log(response);
        response.splice(0,1);
        this.users = response;
        this.loading = false;
      },
      error => this.problem = true
    )
  }

  changePassword(user){
    Materialize.toast("Please, wait...",1000);
    this.userService.changePassword(user).subscribe(
      response=>{
        Materialize.toast("Password successfully changed!",4000,"green white-text");
        console.log(response);
      },
      error=>{
        this.problem = true;
      }
    )
  }

}
