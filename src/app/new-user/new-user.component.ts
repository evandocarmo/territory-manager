import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { MaterializeModule } from "angular2-materialize";
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  users = Array();
  problem: boolean = false;
  newUser = { name: '', password: '', privilege: '' };
  loading = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      response => {
        console.log(response);
        response.splice(0, 1);
        this.users = response;
        this.loading = false;
      },
      error => this.problem = true
    )
  }
  AddNewUser(user) {
    this.loading = true;
    this.userService.addUser(user).subscribe(
      response => {
        if (response.message) {
          this.loading = false;
          Materialize.toast(response.message, 4000, "red white-text");
        }
        else {
          this.loading = false;
          Materialize.toast("User succesfully added!", 4000, "green white-text");
        }
      },
      error => this.problem = true
    )
  }
}
