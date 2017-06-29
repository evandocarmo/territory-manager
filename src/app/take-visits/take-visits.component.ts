import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import { UserService } from '../user.service';
import { HouseholdService } from '../household.service';
import { Codcard } from '../codcard';
import { Macroarea } from '../macroarea';
import { Area } from '../area';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router } from '@angular/router';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-take-visits',
  templateUrl: './take-visits.component.html',
  styleUrls: ['./take-visits.component.css']
})
export class TakeVisitsComponent implements OnInit {
  neighborhoods = Array();
  households = Array();
  users = Array();
  errorMessage :string;
  quantity : number = 0;
  selectedNeighborhood;
  selectedUser;
  selectedHouseholds;
  selectedHouseholdCards;
  problem :boolean = false;
  cods = Array();
  loading = false;
  currentUser = JSON.parse(localStorage.getItem('user'));
  housesLoaded = false;

  constructor(
    private territoryService : TerritoryService,
    private userService : UserService,
    private router : Router,
    private householdService : HouseholdService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.territoryService.getNeighborhoods().subscribe(
      response => {
        this.neighborhoods = response;
      },
      error=> {
        this.errorMessage = error;
        this.problem = true;

      }
    );
    this.userService.getMaxedVisitingUsers(false).subscribe(
      response => {
        this.users = response;
        this.loading = false;
        let myself = this.currentUser;
        myself.name = "Myself";
        this.users.unshift(myself);
      },
      error => {
        this.errorMessage = error;
        this.problem = true;
      }
    );
    console.log(this);
  }
  populate(){
    this.housesLoaded = false;
    this.loading = true;
    if(!this.selectedUser && !this.quantity && !this.selectedNeighborhood)
      return;
    this.householdService.getHouseholdsByQuantity(this.quantity,this.selectedNeighborhood).subscribe(
      response => {
        this.households = response;
        this.loading = false;
        this.housesLoaded = true;
      },
      error => {
        this.errorMessage = error;
        this.problem = true;
      }
    );
  }
  onSubmit(){
    for(let house in this.households)
      this.cods.push(this.households[house].COD);
    this.householdService.checkoutHouseholds(this.cods,this.selectedUser).subscribe(
      response => {
        this.router.navigate(["/display-households"],{queryParams:{
          cods:this.cods
        }});
      },
      error => this.problem = true
    );
  }
}
