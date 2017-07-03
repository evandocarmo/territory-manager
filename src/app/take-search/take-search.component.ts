import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import { UserService } from '../user.service';
import { Codcard } from '../codcard';
import { Macroarea } from '../macroarea';
import { Area } from '../area';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router } from '@angular/router';

declare var $ : any;
declare var Materialize :any;
@Component({
  selector: 'app-take-search',
  templateUrl: './take-search.component.html',
  styleUrls: ['./take-search.component.css']
})
export class TakeSearchComponent implements OnInit {

  errorMessage : string;
  codcards : Codcard[];
  neighborhoods = {};
  neighborhoodNames : string[] = Array();
  users :any[];
  selectedUser = '';
  selectedCards = Array();
  problem :boolean = false;
  selectedCardNames = Array();
  currentUser = JSON.parse(localStorage.getItem('user'));
  loading = false;
  sortedByNumber = true;
  sortedByDate = false;

  constructor(private territoryService : TerritoryService, private userService : UserService,private router : Router) { }

  ngOnInit() {
  	this.getData();
  }

  ngAfterViewInit(){
  }

  getData(){
    this.loading = true;
    this.territoryService.getNeighborhoods().subscribe(
      response => {
        if(response["fatal"]){
          this.problem = true;
          return;
        }
        let array :any= response;
        for(let index in array){
          let current = array[index];
          this.neighborhoods[current.area_name] = {};
          this.neighborhoods[current.area_name].name = current.area_name;
          this.neighborhoods[current.area_name].macroarea = current.macroarea;
          this.neighborhoods[current.area_name].codcards = [];
          this.neighborhoodNames.push(current.area_name);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.problem = true;
      }
    );
  	this.territoryService.getAllAvailableCards().subscribe(
  		response=> {
        if(response["fatal"]){
          this.problem = true;
          return;
        }
  			let array = response;
        for(let index in array){
          let card = array[index];
          this.neighborhoods[card.AREA_NAME].codcards.push(card);
  		  }
        this.userService.getMaxedUsers(false).subscribe(
          response => {
            if(response["fatal"]){
              this.router.navigate['/take-search'];
              return;
            }
            this.users = response;
            console.log(this.users);
            this.loading = false;
            let myself = this.currentUser;
            myself.name = "Myself";
            this.users.unshift(myself);
          },
          error => {
            this.errorMessage = <any>error;
            this.problem = true;
          }
        );
      },
  		error => {
            this.errorMessage = <any>error;
            this.problem = true;
          }
  	);
  }
  pushIntoSelected(card){
    if(!this.selectedCards.includes(card.cod))
      this.selectedCards.push(card.cod);
    else
      this.selectedCards.splice(this.selectedCards.indexOf(card.cod),1);
    console.log(this.selectedCards);
    if(!this.selectedCardNames.includes(card.COD_CARD))
      this.selectedCardNames.push(card.COD_CARD);
    else
      this.selectedCardNames.splice(this.selectedCardNames.indexOf(card.COD_CARD),1);
    console.log(this.selectedCardNames);
  }
  onSubmit(){
    this.territoryService.checkOutCards(this.selectedCards,this.selectedUser).subscribe(
      response => {
          this.router.navigate(["/display-households-in-cards"],{queryParams:{
            cod_card_cod:this.selectedCards,cod_card:this.selectedCardNames
          }});
      },
      error => {
        this.onSubmit();
        this.errorMessage = <any>error;
        this.problem = true;
      }
    );
  }

  sortByDate(){
    this.sortedByDate = true;
    this.sortedByNumber = false;
    console.log("working?");
    for(let area in this.neighborhoods){
      this.neighborhoods[area].codcards.sort(
        function(a,b) {
          return(new Date(a.LAST_UPDATE) > new Date(b.LAST_UPDATE))
          ? 1
          : ((new Date(b.LAST_UPDATE) > new Date(a.LAST_UPDATE)) ? -1 : 0);} );
    }
  }
  sortByNumber(){
    this.sortedByDate = false;
    this.sortedByNumber = true;
    for(let area in this.neighborhoods){
      this.neighborhoods[area].codcards.sort(
        function(a,b) {
          return a.AREA_NUMBER - b.AREA_NUMBER;
        });
    }
  }


}
