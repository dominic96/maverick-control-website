import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../user/user';

/**
 * @author Dominic Mundirewa
 * @implements a resolver that loads a User's account information
 * before the user Account component is added
 */
@Injectable({
  providedIn: 'root'
})
export class LoadUserResolver implements Resolve<User> {

  constructor(private authenticationService: AuthenticationService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | User | Promise<User> {

    let email: string | null = route.queryParamMap.get("email");
    console.log(`Resolving Account with email: ${email}`)
    return this.authenticationService.loadUserAccount(email);
  }
}
