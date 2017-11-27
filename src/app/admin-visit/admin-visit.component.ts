//Provides a skin for monitoring or adding the visit territory. Most of the
//work happens in the HTML code

import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeModule } from "angular2-materialize";
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-visit',
  templateUrl: './admin-visit.component.html',
  styleUrls: ['./admin-visit.component.css']
})
export class AdminVisitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
