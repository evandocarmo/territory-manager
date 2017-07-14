import { Component, OnInit,EventEmitter } from '@angular/core';
import { HouseholdService } from '../household.service';
import { Codcard } from '../codcard';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';

declare var $ : any;
declare var Materialize :any;
declare var FileSaver : any;
declare var html2canvas :any;

@Component({
  selector: 'app-display-households-in-cards',
  templateUrl: './display-households-in-cards.component.html',
  styleUrls: ['./display-households-in-cards.component.css']
})
export class DisplayHouseholdsInCardsComponent implements OnInit {
  errorMessage : string;
  sub : any;
  cardCods = Array();
  households;
  householdsByCard = {}; //HASH TABLE CARD -> HOUSEHOLDS
  codCardNames = Array();
  problem :boolean = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private householdService:HouseholdService
  ) { }

    downloadPicture(tableId){
    html2canvas(document.getElementById(tableId)).then(canvas=>{
      let is_safari = navigator.userAgent.indexOf("Safari") > -1;
      let saveAs = function(uri, filename) {
          let link = document.createElement('a');
          if (typeof link.download === 'string') {
              document.body.appendChild(link); // Firefox requires the link to be in the body
              link.download = filename;
              link.href = uri;
              link.click();
              document.body.removeChild(link); // remove the link when done
          } else {
              location.replace(uri);
          }
      };

      let img = canvas.toDataURL("image/jpg"),
          uri = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      if((is_safari))
          window.open(img);
      else
          saveAs(uri, 'tableExport.jpg');
    })
  }

  ngOnInit() {
    this.loading = true;
    this.sub = this.route
      .queryParams
      .subscribe(params=>{
        for(let cod of params.cod_card_cod){
          this.cardCods.push(cod);
        }
        console.log(this.cardCods);
        if(params.cod_card.constructor === Array)
          this.codCardNames = params.cod_card;
        else
          this.codCardNames.push(params.cod_card);
        for(let index in this.codCardNames){
          let cod_card = this.codCardNames[index];
          this.householdsByCard[cod_card] = { households:[] };
        }
        console.log(this.householdsByCard);
      });
    this.householdService.getHouseholdsBycardCod(this.cardCods).subscribe(
      response => {
        this.households = response;
        this.households.sort(function naturalSorter(as, bs){
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
        console.log(this.households);
        this.separatedHouseholdsByCard(this.households);
        this.loading = false;
      },
      error =>{
        console.log(error);
        this.problem = true;
      }
    );
  }

  separatedHouseholdsByCard(households){
    this.loading = true;
    for(let house in households){
        this.householdsByCard[households[house].COD_CARD]["households"].push(households[house]);
    }
    for(let card in this.householdsByCard){
      if(this.householdsByCard[card].households.length === 0)
        this.householdsByCard[card].households.push({message:"There are no foreigners registered here"});
    }
    console.log(this.householdsByCard);
    this.loading = false;
  }

}
