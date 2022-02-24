import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { catchError } from 'rxjs/operators';

/**
 * Intercepts Errors from requests and handle the 
 * error according to its status code
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      //Auto logout if the current user is not authorized
      if (err.status === 401) {
        this.authenticationService.loginPage();

      }
      const error = err.error.message || err.statusText;
      return throwError(error)
    }));
  }
}
