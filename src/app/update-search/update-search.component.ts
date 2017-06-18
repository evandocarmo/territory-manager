/***USERS WILL BE ALLOWED TO UPDATE THE HOUSEHOLDS IN THE cod_cards THEY HAVE
OR RETURN THE COD_CARDS THEY HOLD
***/
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
declare var FileSaver : any;
declare var html2canvas :any;

@Component({
  selector: 'app-update-search',
  templateUrl: './update-search.component.html',
  styleUrls: ['./update-search.component.css']
})
export class UpdateSearchComponent implements OnInit {

  errorMessage : string;
  sub : any;
  codCards = Array();
  codsByCard = {} //HASH TABLE
  households;
  householdsByCard = {}; //HASH TABLE CARD -> HOUSEHOLDS
  codCardNames = Array();
  problem :boolean = false;
  user;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private householdService:HouseholdService,
    private territoryService:TerritoryService,
    private userService:UserService
  ) { }
  saveChanges(element){
    console.log("Change",element);
  }
  deleteHousehold(element){
    console.log("Delete",element);
  }
  returnCard(card){
    console.log("Return",card);
  }
  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      response => {
        this.user = response;
        this.territoryService.getCardsByUser(this.user.id).subscribe(
          response => {
            console.log(response);
            let temp = response;
            for(let card of temp){
              this.householdsByCard[card['COD_CARD']] = {households:[]};
              this.codsByCard[card['COD_CARD']] = {cod:card['cod']};
              this.codCardNames.push(card['COD_CARD']);
              this.codCards.push(card['cod']);
            }
            this.householdService.getHouseholdsBycardCod(this.codCards).subscribe(
              response => {
                for(let house of response){
                  this.householdsByCard[house.COD_CARD].households.push(house);
                }
              },
              error => this.problem = true
            )
          },
          error => {
            this.errorMessage = error;
            this.problem = true;
          }
        )
      },
      error => this.problem = true
    )
    console.log(this);
  }
}
