import { Component, OnInit } from '@angular/core';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { HouseholdService } from "../household.service";
import { UserService } from "../user.service";
import { TerritoryService } from "../territory.service";

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
  queries={
    availability:'any',
    neighborhood:'any',
    user:'any',
    macroarea:'any',
  }

  constructor(private householdService:HouseholdService,private territoryService:TerritoryService,private userService:UserService) { }

  ngOnInit() {
    this.loading = true;
    this.householdService.getAllHouseholds().subscribe(
      response=>{
        this.households = response;
        this.results = this.households;
        this.territoryService.getNeighborhoods().subscribe(
          response=>{
            this.neighborhoods = response;
            this.territoryService.getMacroareas().subscribe(
              response=>{
                this.macroareas = response;
                this.userService.getAllUsers().subscribe(
                  response=>{
                    this.users = response;
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

}
