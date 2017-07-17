import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

declare var Materialize:any;

@Component({
  selector: 'app-new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.css']
})
export class NewSearchComponent implements OnInit {
  neighborhoodIsSelected = false;
  newNeighborhood = false;
  areaIsSelected = false;
  newArea = false;
  neighborhoodHash = {};
  errorMessage : string;
  sub : any;
  problem :boolean = false;
  loading = false;
  neighborhoods;
  areas;
  addedCard = {
    area:'',
    area_name:'',
    area_number:'',
    cod_card:'',
    macroarea:''
  }

  constructor(private territoryService:TerritoryService,private userService:UserService) { }

  ngOnInit() {
    this.loading = true;
    this.territoryService.getNeighborhoods().subscribe(
      response=>{
        this.neighborhoods = response;
        for(let neighborhood of this.neighborhoods){
          this.neighborhoodHash[neighborhood.area_name] = neighborhood.macroarea;
        }
        this.loading = false;
      },
      error=>{this.problem=true}
    )
  }
  populateAreas(){
    if(this.addedCard.area_name === ''){
      this.newNeighborhood = true;
      this.neighborhoodIsSelected = false;
    }else{
      this.addedCard.macroarea = this.neighborhoodHash[this.addedCard.area_name];
      this.loading = true;
      this.neighborhoodIsSelected = true;
      this.newNeighborhood = false;
      this.areas = Array();
      console.log(this.addedCard);
      this.territoryService.getAreaByNeighborhood(this.addedCard.area_name).subscribe(
        response=>{
          this.areas = response;
          this.loading = false;
        },
        error=>this.problem = true
      )
    }
  }
  addCard(){
    this.loading = true;
    this.addedCard.cod_card = this.addedCard.area + this.addedCard.area_number;
    console.log(this.addedCard);
    this.territoryService.addNewCard(this.addedCard).subscribe(
      response=>{
        this.loading = false;
        Materialize.toast('Card successfully added!',4000,'green white-text');
      },
      error=>this.problem = true
    )
  }
  areaSelected(){
    if(this.addedCard.area === ''){
      this.areaIsSelected = false;
      this.newArea = true;
    }else{
      this.areaIsSelected = true;
      this.newArea = false;
    }
  }
}
