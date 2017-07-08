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
  selector: 'app-display-households',
  templateUrl: './display-households.component.html',
  styleUrls: ['./display-households.component.css']
})
export class DisplayHouseholdsComponent implements OnInit {
  sub : any;
  cods : any[];
  households:any[];
  problem :boolean = false;
  loading = false;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private householdService:HouseholdService) { }
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

        var img = canvas.toDataURL("image/jpg"),
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
        this.cods = params.cods;
        this.householdService.getHouseholdsByCods(this.cods).subscribe(
          response => {
            this.households = response;
            this.loading = false},
          error => this.problem = true
        )
      });
  }
}
