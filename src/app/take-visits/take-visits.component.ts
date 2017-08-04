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
  selectedNeighborhood = '';
  selectedUser = '';
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
    this.userService.getAllUsers().subscribe(
      response => {
        this.users = response;
        if(this.users[0]['name'] === 'UNKNOWN')
          this.users.shift();
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
        this.households.sort(function naturalSorter(as, bs){
            as = as['FULL_ADDRESS'];
            bs = bs['FULL_ADDRESS'];
            let a, b, a1, b1, i= 0, n, L,
            rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
            if(as=== bs) return 0;
            a= as.toLowerCase().match(rx);
            b= bs.toLowerCase().match(rx);
            L= a.length;
            while(i<L){
                if(!b[i]) return 1;
                a1= a[i],
                b1= b[i++];
                if(a1!== b1){
                    n= a1-b1;
                    if(!isNaN(n)) return n;
                    return a1>b1? 1:-1;
                }
            }
            return b[i]? -1:0;
        });
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
