import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.css']
})
export class NewSearchComponent implements OnInit {
  neighborhoodIsSelected = false;
  newNeighborhood = false;
  newArea = false;
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
    this.addedCard.cod_card = this.addedCard.area + this.addedCard.area_number;
    console.log(this.addedCard);
    this.territoryService.addNewCard(this.addedCard).subscribe(
      response=>{
        console.log(response);
      },
      error=>this.problem = true
    )
  }
}
