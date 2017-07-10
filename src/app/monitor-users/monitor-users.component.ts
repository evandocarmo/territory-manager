import { Component, OnInit,EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'monitor-users',
  templateUrl: './monitor-users.component.html',
  styleUrls: ['./monitor-users.component.scss']
})

export class MonitorUsersComponent {

  users = Array();
  loading = false;
  problem = false;
  user;

  constructor(private userService:UserService,private router:Router) { }

  saveUser(user){
    Materialize.toast("Please, wait...",1000);
    if(user.privilege === "ELDER"){
      user.max = 10;
      user.max_visiting = 30;
    }
    else{
      user.max = 3;
      user.max_visiting = 20;
    }
      this.userService.updateUser(user).subscribe(
        response=>{
          console.log(response);
          Materialize.toast("User updated! Thanks for your help.",4000,"green white-text");
        },
        error=>this.problem = true
      )
  }
  deleteUser(user){
    if(!confirm("Are you sure you want to delete " + user.name + "?"))
      return;
    Materialize.toast("Please, wait...",1000);
    this.userService.deleteUser(user).subscribe(
      response=>{
        Materialize.toast("User succesfully deleted!",4000,"green white-text");
        let index = this.users.indexOf(user);
        this.users.splice(index,1);
        console.log(response);
      },
      error=>{
        this.problem = true
      }
    )
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
}
