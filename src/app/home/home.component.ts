import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  screenName = this.user.name.charAt(0).toUpperCase() + this.user.name.slice(1);
  problem = false;
  constructor(private userService:UserService) {}

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      response=>{
        this.user = response[0];
        localStorage.setItem('user',JSON.stringify(this.user));
      },
      error=>this.problem = true
    )
  }

}
