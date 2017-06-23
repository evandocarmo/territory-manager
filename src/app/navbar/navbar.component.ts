import { Component, OnInit } from '@angular/core';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router, NavigationStart } from '@angular/router';

declare var $ : any;
declare var Materialize :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  constructor(private router:Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    $(".button-collapse").sideNav();
  }
  isLoggedIn():boolean{
    return this.user ? true : false;
  }

}
