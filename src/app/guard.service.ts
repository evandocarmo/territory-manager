import { Injectable } from '@angular/core';
import {
	CanActivate, Router,
	RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url = route.url;
    return this.checkLogin(url);
  }
  checkLogin(url): boolean {
  	if (this.authService.loggedIn()){
  		return true;
  	}else{
  		this.authService.redirectUrl = url;
  		this.router.navigate(['login']);
  		return false;
  	}
  }
}
