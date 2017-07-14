import { Component, OnInit,EventEmitter } from '@angular/core';
import { HouseholdService } from '../household.service';
import { TerritoryService } from '../territory.service';
import { UserService } from '../user.service';
import { Codcard } from '../codcard';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-update-visits',
  templateUrl: './update-visits.component.html',
  styleUrls: ['./update-visits.component.scss']
})
export class UpdateVisitsComponent implements OnInit {

  errorMessage : string;
  sub : any;
  households = Array();
  problem :boolean = false;
  user;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private householdService:HouseholdService,
    private territoryService:TerritoryService,
    private userService:UserService
  ) { }
  returnHouse(house){
    if(!confirm("Are you sure you want to RETURN this?"))
      return;
    Materialize.toast("Please, wait...",1000);
    this.householdService.returnedHouseholds(house.COD,this.user.id).subscribe(
      response=>{
        console.log(response);
        Materialize.toast("Household returned! Thank you for your help",4000,"green white-text");
        let index = this.households.indexOf(house);
        this.households.splice(index,1);
      },
      error=>{
        this.errorMessage = error;
        this.problem = true;
      }
    )
  }
  saveHouse(house){
    Materialize.toast('Please, wait...',1000);
    this.householdService.updateHousehold(house).subscribe(
      response=>{
        Materialize.toast("Saved! Thank you for your help.",4000,"green white-text");
        console.log(response);
      },
      error=>{
        this.errorMessage = error;
        this.problem = true;
      }
    )
  }
  deleteHouse(house){
    if(!confirm("Are you sure you want to DELETE this?"))
      return;
    Materialize.toast('Please, wait...',1000);
    this.householdService.deleteHousehold(house.COD,this.user.id).subscribe(
      response=>{
        this.user.visiting -= 1;
        this.userService.updateUser(this.user).subscribe(
          response=>{
            Materialize.toast("Household deleted! Thanks for your help.",4000,"green white-text");
            let index = this.households.indexOf(house);
            this.households.splice(index,1);
          },
          error=>{
            this.errorMessage = error;
            this.problem = true;
          }
        )
      },
      error=>{
        this.errorMessage = error;
        this.problem = true;
      }
    )
  }
  ngAfterViewInit(){
  }
  ngOnInit() {
    this.loading = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.householdService.getHouseholdsByUser(this.user.id).subscribe(
      response=>{
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
      },
      error => {
        this.errorMessage = error;
        this.problem = true;
      }
    )
  }

}
