import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
  title = 'Maverick Control Systems';

  constructor(private authenticationService: AuthenticationService,
               private router: Router) {

  }

  ngOnInit(): void{
    console.log("Initializing Application");
    this.router.navigate(['/home'])

  }

  
}
