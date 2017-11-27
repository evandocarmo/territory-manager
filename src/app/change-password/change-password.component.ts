//Page that allows user to change their own passowrd.

import { UserService } from '../user.service';
import { MaterializeModule } from "angular2-materialize";
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var Materialize: any;


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
  loading = false;
  constructor(private userService: UserService) { }
  checkMatch() {
    if (this.confirmPassword === this.user.password) {
      this.match = true;
    } else {
      this.match = false;
    }
  }
  changePassword() {
    this.loading = true;
    this.userService.changePassword(this.user).subscribe(
      response => {
        this.loading = false;
        Materialize.toast("Password successfully changed!", 4000, "green white-text");
      },
      error => {
        this.problem = true;
      }
    )
  }
  ngOnInit() {
  }

}
