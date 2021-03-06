import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { Credentials } from './credentials';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private userSubject: BehaviorSubject<User>;
  private  user: Observable<User>;
  private baseUrl = `${environment.apiUrl}`;

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

    //this method doesnt work properly in the case that an error encountered 
    // the catch phrase is failing to catch the error 
  
      if (Object.keys(this.userValue).length == 0) {
        console.log("No User Currently Logged In");
        this.loginPage();
      } else {
        console.log("attempting to reload user account")
        try {
          console.log("trying")
          this.router.navigate(['user'], {queryParams : {email: this.userValue.email}});
          console.log("tried");

        } catch (error) {

          console.log("caught error");
          this.loginPage();
        }
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

  public login(credentials: Credentials): Observable<HttpResponse<User>> {
    const url = `${this.baseUrl}/login/login`;
    return this.http.post<User>(url, credentials, {observe: 'response'})
                      .pipe(
                        tap( resp =>{
                          //console.log(`Successfuly Logged in User with Email: ${user.email}`)
                          const keys = resp.headers.keys();
  
                          console.log("recovered headers" + keys.length)
                          keys.forEach( (key) => console.log("header key " + key + " "))

                          //get user from body and set user into the local storage and userSubject
                          let _user: User  = {...resp.body!};
                          this.userSubject.next(_user);
                          localStorage.setItem('user', JSON.stringify(_user));
                          
                        }),
                        catchError(this.handleError));

  }


  /**
   * loadUserAccount
   * Loads the user account information after a successful log in 
   */
  public loadUserAccount(email: string | null ) : Observable<User>{

    console.log("Loading Account information")
    const url = `${this.baseUrl}/station/manager/load/account/${email}`;
    return this.http.get<User>(url, this.httpOptions)
                      .pipe(
                        tap( user => {
                          console.log(`successfuly Loaded account information Email: ${user.email}`)
                        }),
                        catchError(this.handleError)
                      );
  }

  public logout(): void {

    localStorage.removeItem('user');
    this.userSubject.next({userId: 0, firstname: '',lastname: '', email: '', type: '', token: ''});
    this.loginPage();

    //implemment this to send a logout request to the server 
  }

   handleError(error: HttpErrorResponse) {
      //this functions throws an error that i'm fqiling to catch 
      // this is a bug

    if (error.status === 0) {
      //client side or network error 
      console.error("An error occured: ", error.error);
      
    }else{
      //backend responded with an unsuccessful error code
      console.error(`Server returned error code: ${error.status}, and Body: `, error.error);

      if (error.status === 401 ) {
        //this.router.navigate(['authenticate/login']);
       // console.error("User unauthorized redirecting to login page");
        //this.router.navigate(['authenticate/login']);
        
      }
      
    }

    //Return an Observable with a User friendly error message
    return throwError(() => new Error("Something went wrong, Please try again in a few minutes"));
  }
  
}
