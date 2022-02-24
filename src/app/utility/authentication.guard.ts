import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * Authentication guard that guards against navigation to 
 * unauthorized pages
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationSerice: AuthenticationService,
              private router: Router) {

              }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authenticationSerice.userValue) {
        //authorize navigation if User is logged in
        return true;
      }
    //else redirect to login page
    
    this.router.navigate(['authenticate/login'], { queryParams: {returnUrl: state.url}});
    return false;
  }
  
}
