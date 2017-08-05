import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import {CsvService} from "angular2-json2csv";
 import 'rxjs/Rx' ;

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-monitor-search',
  templateUrl: './monitor-search.component.html',
  styleUrls: ['./monitor-search.component.css']
})
export class MonitorSearchComponent implements OnInit {

  errorMessage : string;
  sub : any;
  problem :boolean = false;
  loading = false;
  users;
  usersHash = {};
  macroareas;
  area_names;
  query = {
    macroarea:'',
    available:'',
    user:'',
    area_name:'',
    last:'',
    more_than:''
  };
  result;
  p;
  constructor(private territoryService:TerritoryService,private userService:UserService,private csv:CsvService) { }

  ngOnViewInit() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
    );
  }

  delete(card){
    if(confirm("Are you sure you want to delete this card? This action cannot be undone.")){
      this.loading = true;
      this.territoryService.deleteCard(card.cod).subscribe(
        response=>{
          let index = this.result.indexOf(card);
          this.result.splice(index,1);
          this.loading = false;
        },
        error=>{
          this.problem = true;
        }
      )
    }
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      response=>{
        this.users = response;
        for(let user of this.users){
          this.usersHash[user['id']] = user['name'];
        }
        this.usersHash[0] = 'Nobody';
        console.log(this.usersHash);
        this.users.splice(0,1);
        this.users.sort((a,b)=>{
          if(a['name'].toLowerCase() > b['name'].toLowerCase())
            return 1;
          else if (a['name'].toLowerCase() < b['name'].toLowerCase())
            return -1;
          else
            return 0;
        });
        this.territoryService.getMacroareas().subscribe(
          response=>{
            this.macroareas = response;
            this.territoryService.getNeighborhoods().subscribe(
              response=>
              {
                this.area_names=response;
                this.loading = false;
              },
              error=>this.problem=true
            )
          },
          error => this.problem = true
        );
      },
      error => this.problem = true
    );
  }
  log(){
    this.loading = true;
    console.log(this.query);
    this.territoryService.getCustomQuery(this.query).subscribe(
      response=>{
        this.result = response;
        this.loading = false;
      },
      error=>this.problem = true
    );
  }
  excel(){
    this.csv.download(this.result,'search-territory');
  }
  sortByCod_Card(){
    this.result.sort(
      function naturalSorter(as, bs){
          as = as['COD_CARD'];
          bs = bs['COD_CARD'];
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
      }
    );
  }
  sortByDate(parameter){
    this.result.sort(
      (a,b)=>{
        let firstDate:any = new Date(a[parameter]);
        let secondDate:any = new Date(b[parameter]);
        return firstDate - secondDate;
      });
  }
  sortByPublisher(){
    this.result.sort(
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
