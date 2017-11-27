//Provides a skin for monitoring or adding new users, also for
// changing users' passwords. Most of the work happens in the HTML code

import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { MaterializeModule } from "angular2-materialize";
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  ngOnInit() {

  }
}
