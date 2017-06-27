import { Component, OnInit,EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  errorMessage : string;
  sub : any;
  users = Array();
  problem :boolean = false;
  changePasswordUser = {id:0,password:''};
  newUser = {name:'',password:'',privilege:''};
  user;
  loading = false;

  constructor(private userService:UserService) { }

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
  AddNewUser(user){
    Materialize.toast("Please, wait...",1000);
    this.userService.addUser(user).subscribe(
      response=>{
        if(response.message)
          Materialize.toast(response.message,4000,"red white-text");
        else
          Materialize.toast("User succesfully added!",4000,"green white-text");
      },
      error=>this.problem = true
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
