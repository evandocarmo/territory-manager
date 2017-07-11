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
  closeNav(){
    $('#sidenav-overlay').velocity({opacity: 0}, {duration: 200,
        queue: false, easing: 'easeOutQuad',
      complete: function() {
        $(this).remove();
      } });
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    $( document ).ready(function(){
      $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
        }
      );
    })
  }
  isLoggedIn():boolean{
    return this.user ? true : false;
  }
}
