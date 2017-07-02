import { Component, OnInit,EventEmitter } from '@angular/core';
import { HouseholdService } from '../household.service';
import { Codcard } from '../codcard';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';

declare var $ : any;
declare var Materialize :any;
declare var FileSaver : any;
declare var html2canvas :any;

@Component({
  selector: 'app-display-households',
  templateUrl: './display-households.component.html',
  styleUrls: ['./display-households.component.css']
})
export class DisplayHouseholdsComponent implements OnInit {
  sub : any;
  cods : any[];
  households:any[];
  problem :boolean = false;
  loading = false;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private householdService:HouseholdService) { }
  exportTable(event){}
  ngOnInit() {
    this.loading = true;
    this.sub = this.route
      .queryParams
      .subscribe(params=>{
        this.cods = params.cods;
        this.householdService.getHouseholdsByCods(this.cods).subscribe(
          response => {
            this.households = response;
            this.loading = false},
          error => this.problem = true
        )
      });
  }
}
