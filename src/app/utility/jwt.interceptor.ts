import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * intercept a request and add an JWT token is User is logged in
     * and if the request is gping to the URL indicated
     */
    console.log("Intercepted Request");
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.token;
    
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    console.log(`isLoggedIn: ${isLoggedIn} AND isApiUrl: ${isApiUrl}`);
    
    let ok: string;
    if(isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `${user.token}`
        }
      });

      console.log("Added Authorization Header");
    }

    return next.handle(request).pipe(tap ({ next: (event) => (this.getHeaders(event))}))
  }

  private  getHeaders(event : HttpEvent<any>) {

    if (event instanceof HttpResponse) {   
      const keys = event.headers.keys();
      console.log(`recovered Header keys: ${keys.length}`);
    }
    
  }
}
