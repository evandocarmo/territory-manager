import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import { UserService } from '../user.service';
import { Codcard } from '../codcard';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router } from '@angular/router';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-my-search',
  templateUrl: './my-search.component.html',
  styleUrls: ['./my-search.component.scss']
})
export class MySearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
