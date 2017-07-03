import { Component, OnInit } from '@angular/core';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { HouseholdService } from "../household.service";
import { UserService } from "../user.service";
import { TerritoryService } from "../territory.service";
import { Router } from '@angular/router';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-monitor-households',
  templateUrl: './monitor-households.component.html',
  styleUrls: ['./monitor-households.component.css']
})
export class MonitorHouseholdsComponent implements OnInit {

  problem = false;
  loading = false;
  households;
  results;
  neighborhoods;
  macroareas;
  users;
  usersHash = {};
  queries={
    availability:'any',
    neighborhood:'any',
    user:'any',
    macroarea:'any',
  }
  checkoutOptions = {
    house:'',
    user:''
  }
  editedHouse = {
    COD:'',
    LANGUAGE:'',
    ADDRESS:'',
    COMMENTS:''
  };

  constructor(
    private householdService:HouseholdService,
    private territoryService:TerritoryService,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.householdService.getAllHouseholds().subscribe(
      response=>{
        this.households = response;
        this.results = this.households;
        this.territoryService.getNeighborhoods().subscribe(
          response=>{
            this.neighborhoods = response;
                this.userService.getAllUsers().subscribe(
                  response=>{
                    response.splice(0,1);
                    this.users = response;
                    for(let user of this.users){
                      this.usersHash[user.id] = user.name;
                    }
                    this.loading = false;
                  },
              error=>{
                this.problem = true;
              }
            )
          },
          error=>{
            this.problem = true;
          }
        )

      },
      error=>{
        this.problem = true;
      }
    )
  }
  filter(){
    this.loading = true;
    this.results = this.households;
    for(let property in this.queries){
      if(this.queries[property] !== 'any'){
        if(property === 'availability' && this.queries[property] === 'true'){
          this.results = this.results.filter(function(house){
            return house.AVAILABLE;
          });
          this.loading = false;
        }
        else if(property === 'availability' && this.queries[property] === 'false'){
          this.results = this.results.filter(function(house){
            return !house.AVAILABLE;
          });
          this.loading = false;
        }
        if(property === 'neighborhood'){
          let value = this.queries[property];
          this.results = this.results.filter(function(house){
            return house.AREA_NAME === value;
          });
          this.loading = false;
        }
        if(property === 'macroarea'){
          let value = this.queries[property];
          this.results = this.results.filter(function(house){
            return house.MACROAREA === value;
          });
          this.loading = false;
        }
        if(property === 'user'){
          let value = this.queries[property];
          this.results = this.results.filter(function(house){
            return house.ID === parseInt(value);
          });
          this.loading = false;
        }
      }
    }
    console.log(this.results);
  }

  setDate(date) {
    let newDate = new Date(date);
    return newDate;
  }
  parseInt(int){
    return parseInt(int);
  }
  delete(house){
    console.log('delete',house);
  }
  openCheckout(house){
    this.checkoutOptions.house = house;
    $('#modal').modal('open');
  }
  openEdit(house){
    this.editedHouse = house;
    $('#edit').modal('open');
  }
  checkout(){
    Materialize.toast("Please, wait...",3000);
    let cod = this.checkoutOptions.house['COD'];
    let user = parseInt(this.checkoutOptions.user);
    this.householdService.checkoutHouseholds([cod],user).subscribe(
      response=>{
        Materialize.toast("This household is now under "+ this.usersHash[user] + "'s name!",5000,'green white-text');
      },
      error=>{
        this.problem = true;
      }
    )
  }
  saveHouse(house){
    Materialize.toast('Please, wait...',3000);
    this.householdService.updateHousehold(house).subscribe(
      response=>{
        Materialize.toast("Household successfully updated!",5000,'green white-text');
      },
      error=>{
        this.problem = true;
      }
    )
  }
}
