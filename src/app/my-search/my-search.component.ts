import { Component, OnInit,EventEmitter } from '@angular/core';
import { HouseholdService } from '../household.service';
import { Codcard } from '../codcard';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';
import { TerritoryService } from '../territory.service';
import * as FileSaver  from 'file-saver';

declare var $ : any;
declare var Materialize :any;
declare var html2canvas : any;


@Component({
  selector: 'app-my-search',
  templateUrl: './my-search.component.html',
  styleUrls: ['./my-search.component.scss']
})
export class MySearchComponent implements OnInit {

  errorMessage : string;
  sub : any;
  cardCods = Array();
  households;
  householdsByCard = {}; //HASH TABLE CARD -> HOUSEHOLDS
  codCardNames = Array();
  problem :boolean = false;
  user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private householdService:HouseholdService,
    private territoryService:TerritoryService
  ) { }

  ngOnInit() {
    this.territoryService.getCardsByUser(this.user.id).subscribe(
      response => {
        for(let card of response){
          this.cardCods.push(card['cod']);
          this.codCardNames.push(card['COD_CARD']);
          this.householdsByCard[card['COD_CARD']] = { households:[] };
        }
        console.log(this.householdsByCard);
        this.householdService.getHouseholdsBycardCod(this.cardCods).subscribe(
          response => {
            this.households = response;
            console.log(this.households);
            for(let house of this.households){
              this.householdsByCard[house.COD_CARD].households.push(house);
            }
          },
          error =>{
            console.log(error);
            this.problem = true;
          }
        );
      },
      error => {
        this.errorMessage = error;
        this.problem = true;
      }
    )
  }
  downloadPicture(tableId){
    html2canvas(document.getElementById(tableId),{
      onrendered:function(canvas:any){
        canvas.toDataURL();
      }
    })
  }
}
