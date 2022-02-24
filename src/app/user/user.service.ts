import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private baseUrl = `${environment.apiUrl}/itravel/rest/user/account`;


  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }
  

              /**
               * 
               * @param userId UserId for the user that has just logged in
               * @returns An observable containing account information for
               * that Userk
               */
  public loadUserAccount(userId: number): Observable<User> {
    const url = `${this.baseUrl}/get/user/${userId}`;
    return this.http.get<User>(url, this.httpOptions)
                      .pipe(
                        tap(
                          user=> {
                            console.log(` retrieved account for user with email: ${user.email}`);
                          }));
  }

  /**
   * Logs out the user and clears the account from the memory
   * and should also unsubscribe all the observables that
   * are still being subscribed to
   */
  public logout(userId: number): Observable<any> {
    const url = `${this.baseUrl}/logout/${userId}`
    return this.http.get<any>(url, this.httpOptions)
                      .pipe(tap(_=>{
                        console.log(`logging out user with Id: ${userId}`);
                        this.authenticationService.logout();
                      }))
                     



  }

    
}
