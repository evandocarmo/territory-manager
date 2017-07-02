import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import { HouseholdService } from '../household.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-household',
  templateUrl: './new-household.component.html',
  styleUrls: ['./new-household.component.scss']
})
export class NewHouseholdComponent implements OnInit {

  neighborhoods;
  areas;
  macroareas;
  cod_cards;
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
    this.territoryService.getNeighborhoods().subscribe(
      response=>{
        this.neighborhoods = response;
      },
      error=>{}
    )
  }

}
