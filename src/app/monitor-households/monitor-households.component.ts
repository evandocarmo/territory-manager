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
      this.householdService.deleteHousehold(house).subscribe(
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
    this.householdService.returnHouseholdsNoUpdate(cod,oldUser).subscribe(
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
        response.sort((a,b)=>{
          if(a['name'].toLowerCase() > b['name'].toLowerCase())
            return 1;
          else if (a['name'].toLowerCase() < b['name'].toLowerCase())
            return -1;
          else
            return 0;
        });
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
  return(house){
    if(!confirm(`Are you sure you want to take this from the publisher and make it available?`))
      return;
    console.log(house);
    this.loading = true;
    this.householdService.returnHouseholdsNoUpdate(house['COD'],house['ID']).subscribe(
      response=>{
        this.loading = false;
        Materialize.toast("House returned, no updates made.",4000,"green white-text");
        house['ID'] = 0;
        house['AVAILABLE'] = 1;
      },
      error=>{
        this.problem = true;
      }
    );

  }
  sortByAddress(){
    this.results.sort(
      function naturalSorter(as, bs){
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
            })
  }
  sortBy(parameter){
    this.results.sort(
      (a,b)=>{
        if(a[parameter].toLowerCase() > b[parameter].toLowerCase())
          return 1;
        else if(a[parameter].toLowerCase() < b[parameter].toLowerCase())
          return -1;
        else
          return 0;
      }
    )
  }
  sortByNumber(parameter){
    this.results.sort(
      (a,b)=>{
        return b[parameter] - a[parameter];
      });
  }
  sortByPublisher(){
    this.results.sort(
      (a,b)=>{
        let first = a['ID'] !== 0 ? this.usersHash[a['ID']].toLowerCase() : '';
        let second = b['ID'] !== 0 ? this.usersHash[b['ID']].toLowerCase() : '';
        if(first > second)
          return 1;
        if (first < second)
          return -1;
        return 0;
      }
    )
  }
}
