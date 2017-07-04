import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import { HouseholdService } from '../household.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-new-household',
  templateUrl: './new-household.component.html',
  styleUrls: ['./new-household.component.scss']
})
export class NewHouseholdComponent implements OnInit {
  loading = false;
  problem = false;
  neighborhoods;
  cod_cards;
  selectedCodCard = '';
  cardsHash = {};
  codCardSelected = false;
  neighborhoodSelected = false;
  addedHousehold = {
    cod_card:'',
    area:'',
    area_number:'',
    address:'',
    language:'',
    comments:'',
    area_name:'',
    full_address:'',
    macroarea:''
  }
  constructor(private territoryService:TerritoryService,private HouseholdService:HouseholdService) { }

  ngOnInit() {
    this.loading = true;
    this.territoryService.getNeighborhoods().subscribe(
      response=>{
        this.neighborhoods = response;
        this.loading = false;
      },
      error=>{
        this.problem = true;
      }
    )
  }
  populateCodCards(){
    this.neighborhoodSelected = true;
    this.loading = true;
    this.territoryService.getCardsByNeighborhood(this.addedHousehold.area_name).subscribe(
      response=>{
        response.sort(function(a,b){
          return a['AREA_NUMBER'] - b['AREA_NUMBER'];
        })
        for(let card of response){
          this.cardsHash[card['COD_CARD']] = card;
        }
        this.cod_cards = response;
        this.loading = false;
      },
      error=>{
        this.problem = true;
      }
    )
  }
  openAddress(){
    this.codCardSelected = true;
  }

  onSubmit(){
    Materialize.toast('Please, wait...',4000);
    let card = this.cardsHash[this.selectedCodCard];
    this.addedHousehold.cod_card = card.COD_CARD;
    this.addedHousehold.area = card.AREA;
    this.addedHousehold.area_number = card.AREA_NUMBER;
    this.addedHousehold.macroarea = card.MACROAREA;
    this.addedHousehold.full_address = this.addedHousehold.cod_card + ', ' + this.addedHousehold.address + ', ' + this.addedHousehold.area_name + ", Brasília DF";
    console.log(this.addedHousehold);
    this.territoryService.addNewCard(this.addedHousehold).subscribe(
      response=>{
        Materialize.toast('Household successfully added!',5000,'green white-text');
      },
      error=>{
        this.problem = true;
      }
    )
  }

}
