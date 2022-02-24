import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { Credentials } from './credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private userSubject: BehaviorSubject<User>;
  private  user: Observable<User>;
  private baseUrl = `${environment.apiUrl}/itravel/rest/users`;

   //options header
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'})
  };

  constructor(private router: Router, private http: HttpClient) { 

    /**
     * fetch a currently logged in user when service is intiated
     */
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  /**
   * Returns the current value of User
   * The value is null if no user is currently logged in OR 
   * a Valid User object is User is logged in
   */
  public get userValue(): User {
    return this.userSubject.value;
  }


  /**
   * this method checks whether or not there is an already existing account 
   * logged in
   * 
   * if No User is found boolean false is returned otherwise the Object of 
   *  currently logged in User is returned used for further processing 
   */
  public checkLogin(): void{

      if (Object.keys(this.userValue).length == 0) {
        console.log("No User Currently Logged In");
        this.loginPage();
      }     

  }


  /**
   * simply navigates to a login page
   */
  loginPage() {
    this.router.navigate(['authenticate/login']);
  }

  /**
   * this function is called when a User wants to sign with 
   * the Credentials object containing an email and password.
   * @returns User
   * @requires Credentials
   */

  public login(credentials: Credentials): Observable<User> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<User>(url, credentials,this.httpOptions)
                      .pipe(
                        tap( user=>{
                          console.log(`Successfuly Logged in User with Email: ${user.email}`)
                        }),
                        map( user =>{

                          //set user into the local storage
                          localStorage.setItem('user', JSON.stringify(user));
                          this.userSubject.next(user);
                          return user;

                        }));

  }

  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next({userId: 0, firstname: '',lastname: '', email: '', type: '', token: ''});
    this.loginPage();
  }
  
}
