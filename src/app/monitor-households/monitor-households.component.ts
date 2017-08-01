import { Component, OnInit } from '@angular/core';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { HouseholdService } from "../household.service";
import { UserService } from "../user.service";
import { TerritoryService } from "../territory.service";
import { Router } from '@angular/router';
import { CsvService } from "angular2-json2csv";
import 'rxjs/Rx';
import { Languages } from "../../../languages";

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-monitor-households',
  templateUrl: './monitor-households.component.html',
  styleUrls: ['./monitor-households.component.css']
})
export class MonitorHouseholdsComponent implements OnInit {
  p;
  problem = false;
  loading = false;
  households;
  results;
  neighborhoods;
  macroareas;
  users = new Array();
  usersHash = {};
  queries={
    availability:'any',
    neighborhood:'any',
    user:'any',
    macroarea:'any',
    language:'any',
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
  currentUser = JSON.parse(localStorage.getItem('user'));
  languages = Languages;
  constructor(
    private householdService:HouseholdService,
    private territoryService:TerritoryService,
    private userService:UserService,
    private router:Router,
    private csv:CsvService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.populateNeighborhoods();
    this.populateUsers();
    this.populateHouseholds();
  }
  filter(){
    console.time('filter');
    this.loading = true;
    this.results = this.households;
    for(let property in this.queries){
      console.log(this.queries[property]);
      if(this.queries[property] !== 'any'){
        if(property === 'availability' && this.queries[property] === 'true'){
          this.results = this.results.filter(function(house){
            return house.AVAILABLE;
          });
        }
        else if(property === 'availability' && this.queries[property] === 'false'){
          this.results = this.results.filter(function(house){
            return !house.AVAILABLE;
          });
        }
        if(property === 'neighborhood'){
          let value = this.queries[property];
          this.results = this.results.filter(function(house){
            return house.AREA_NAME === value;
          });
        }
        if(property === 'macroarea'){
          let value = this.queries[property];
          this.results = this.results.filter(function(house){
            return house.MACROAREA === value;
          });
        }
        if(property === 'user'){
          let value = this.queries[property];
          this.results = this.results.filter(function(house){
            return house.ID === parseInt(value);
          });
        }
        if(property === 'language'){
          let value = this.queries[property];
          this.results = this.results.filter(function(house){
            return house.LANGUAGE === value;
          });
        }
      }
    }
    console.timeEnd('filter');
    this.loading = false;
  }

  setDate(date) {
    let newDate = new Date(date);
    return newDate;
  }
  parseInt(int){
    return parseInt(int);
  }
  delete(house){
    if(confirm("Are you sure you want to delete this household?")){
      this.loading = true;
      Materialize.toast('Please,wait...',3000);
      this.householdService.deleteHousehold(house.COD,this.currentUser.id).subscribe(
        response=>{
          Materialize.toast('Household successfully deleted!',5000,'green white-text');
          let index = this.households.indexOf(house);
          let rindex = this.results.indexOf(house);
          this.households.splice(index,1);
          this.results.splice(rindex,1);
          this.loading = false;
        },
        error=>{
          this.problem = true;
        }
      )
    }
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
    this.loading = true;
    let cod = this.checkoutOptions.house['COD'];
    let user = parseInt(this.checkoutOptions.user);
    let oldUser = this.checkoutOptions.house['ID'];
    this.householdService.returnedHouseholds(cod,oldUser).subscribe(
      response=>{
      },
      error=>{
        this.problem = true;
      }
    )
    this.householdService.checkoutHouseholds([cod],user).subscribe(
      response=>{
        Materialize.toast("This household is now under " + this.usersHash[user] + "'s name!",5000,'green white-text');
        let index = this.households.indexOf(this.checkoutOptions.house);
        this.households[index] = this.checkoutOptions.house;
        let rindex = this.results.indexOf(this.checkoutOptions.house);
        this.results[rindex].ID = user;
        this.loading = false;
      },
      error=>{
        this.problem = true;
      }
    )
  }
  saveHouse(house){
    this.loading = true;
    this.householdService.updateHousehold(house).subscribe(
      response=>{
        Materialize.toast("Household successfully updated!",5000,'green white-text');
        let index = this.households.indexOf(house);
        this.households[index] = house;
        let rindex = this.results.indexOf(house);
        this.results[rindex] = house;
        this.loading = false;
      },
      error=>{
        this.problem = true;
      }
    )
  }
  downloadExcel(){
    this.filter();
    this.csv.download(this.results,'households');
  }
  populateHouseholds(){
    this.householdService.getAllHouseholds().subscribe(
      response=>{
        this.households = response;
        this.loading = false;
      },
      error=>{
        this.problem = true;
      }
    )
  }
  populateNeighborhoods(){
    this.territoryService.getNeighborhoods().subscribe(
      response=>{
        this.neighborhoods = response;
      },
      error=>{
        this.problem = true;
      }
    )
  }
  populateUsers(){
    this.userService.getAllUsers().subscribe(
      response=>{
        response.splice(0,1);
        for(let user of response){
          this.usersHash[user.id] = user.name;
          this.users.push(user);
        }
      },
      error=>{
        this.problem = true;
      }
    )
  }
}
