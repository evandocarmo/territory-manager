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
  selector: 'app-my-visits',
  templateUrl: './my-visits.component.html',
  styleUrls: ['./my-visits.component.scss']
})
export class MyVisitsComponent implements OnInit {
  sub : any;
  cods : any[];
  households:any[];
  problem :boolean = false;
  user = JSON.parse(localStorage.getItem('user'));
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private householdService:HouseholdService) { }

  ngOnInit() {
    this.householdService.getHouseholdsByUser(this.user.id).subscribe(
      response=>{
        this.households = response;
      },
      error=>{
        this.problem = true;
      }
    )
  }

}
