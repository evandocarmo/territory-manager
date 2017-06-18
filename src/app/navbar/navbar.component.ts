import { Component, OnInit } from '@angular/core';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    $(".button-collapse").sideNav();
  }
}
