//Provides a skin for monitoring or adding the search territory. Most of the
//work happens in the HTML code

import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeModule } from "angular2-materialize";
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
