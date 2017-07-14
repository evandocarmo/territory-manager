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
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private householdService:HouseholdService,
    private territoryService:TerritoryService,
    private userService:UserService
  ) { }
  saveChanges(element){
    element['FULL_ADDRESS'] = element['AREA'] + " " + element['AREA_NUMBER'] + " " + element['ADDRESS'] + " " + element['AREA_NAME'] + " " + "Brasilia DF";
    this.loading = true;
    this.householdService.updateHousehold(element).subscribe(
      response =>{
        Materialize.toast("Saved! Thank you for your help.",4000,"green white-text");
        this.loading = false;
      },
      error => this.problem = true
    )
  }
  deleteHousehold(element,cod_card){
    if(confirm("Are you sure you want to delete this?")){
      this.loading = true;
      this.householdService.deleteHousehold(element.COD,this.user.id).subscribe(
        response=>{
          let index = this.householdsByCard[cod_card].households.indexOf(element);
          this.householdsByCard[cod_card].households.splice(index,1);
          this.loading = false;
          Materialize.toast("Household deleted! Thanks for your help.",4000,"green white-text");
        },
        error => this.problem = true
      )
    }
  }
  returnCard(card,name){
    if(confirm("Are you sure you want to return this card?")){
      this.loading = true;
      this.territoryService.returnCard(card.cod,this.user.id).subscribe(
        response=>{
          let index = this.codCardNames.indexOf(name);
          this.codCardNames.splice(index,1);
          Materialize.toast("Card returned! Thanks for your help",4000,'green white-text');
          this.loading = false;
        }
      )
    }
  }
  ngOnInit() {
        this.loading = true;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.territoryService.getCardsByUser(this.user.id).subscribe(
          response => {
            console.log(response);
            let temp = response;
            if(!response[0]){
              this.loading = false;
              Materialize.toast('This seems to be empty',4000);
              return;
            }
            for(let card of temp){
              this.householdsByCard[card['COD_CARD']] = {households:[]};
              this.codsByCard[card['COD_CARD']] = {cod:card['cod']};
              this.codCardNames.push(card['COD_CARD']);
              this.codCards.push(card['cod']);
            }
            this.householdService.getHouseholdsBycardCod(this.codCards).subscribe(
              response => {
                response.sort(function naturalSorter(as, bs){
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
                });
                for(let house of response){
                  this.householdsByCard[house.COD_CARD].households.push(house);
                }
                this.loading = false;
              },
              error => this.problem = true
            )
          },
          error => {
            this.errorMessage = error;
            this.problem = true;
          }
        )
  }
}
