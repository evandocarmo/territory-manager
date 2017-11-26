import { Component, OnInit, EventEmitter } from '@angular/core';
import { HouseholdService } from '../household.service';
import { Codcard } from '../codcard';
import { MaterializeModule } from "angular2-materialize";
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { TerritoryService } from '../territory.service';
import * as FileSaver from 'file-saver';

declare var $: any;
declare var Materialize: any;
declare var html2canvas: any;


@Component({
  selector: 'app-my-search',
  templateUrl: './my-search.component.html',
  styleUrls: ['./my-search.component.scss']
})
export class MySearchComponent implements OnInit {

  errorMessage: string;
  sub: any;
  cardCods = Array();
  households;
  householdsByCard = {}; //HASH TABLE CARD -> HOUSEHOLDS
  codCardNames = Array();
  problem: boolean = false;
  user = JSON.parse(localStorage.getItem('user'));
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private householdService: HouseholdService,
    private territoryService: TerritoryService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.territoryService.getCardsByUser(this.user.id).subscribe(
      response => {
        if (!response[0]) {
          this.loading = false;
          Materialize.toast('This seems to be empty', 4000);
          return;
        }
        for (let card of response) {
          this.cardCods.push(card['cod']);
          this.codCardNames.push(card['COD_CARD']);
          this.householdsByCard[card['COD_CARD']] = { households: [] };
        }
        console.log(this.householdsByCard);
        this.householdService.getHouseholdsBycardCod(this.cardCods).subscribe(
          response => {
            this.households = response;
            this.households.sort(function naturalSorter(as, bs) {
              as = as['FULL_ADDRESS'];
              bs = bs['FULL_ADDRESS'];
              let a, b, a1, b1, i = 0, n, L,
                rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
              if (as === bs) return 0;
              a = as.toLowerCase().match(rx);
              b = bs.toLowerCase().match(rx);
              L = a.length;
              while (i < L) {
                if (!b[i]) return 1;
                a1 = a[i],
                  b1 = b[i++];
                if (a1 !== b1) {
                  n = a1 - b1;
                  if (!isNaN(n)) return n;
                  return a1 > b1 ? 1 : -1;
                }
              }
              return b[i] ? -1 : 0;
            });
            console.log(this.households);
            for (let house of this.households) {
              if (this.householdsByCard[house.COD_CARD])
                this.householdsByCard[house.COD_CARD]['households'].push(house);
            }
            this.loading = false;
          },
          error => {
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
  downloadPicture(tableId) {
    html2canvas(document.getElementById(tableId)).then(canvas => {
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

      var img = canvas.toDataURL("image/jpg"),
        uri = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      if ((is_safari))
        window.open(img);
      else
        saveAs(uri, 'tableExport.jpg');
    })
  }
}
