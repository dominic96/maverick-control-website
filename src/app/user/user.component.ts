import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {

  user: User;
  sideBar: boolean = false;
  statusMessage: string = '';

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private route: ActivatedRoute) {
     this.user = {userId: 0, firstname: '', lastname: '', email: '', type: '', token: ''};
   }

  ngOnInit(): void {
    this.loadUserAccount();

  }


  /**
   * Initiatiates the User Session from the server side
   * Loads the User Accout information 
   * Initiates Feed if any is available
   */
  private loadUserAccount(): void {

    this.route.data.subscribe((_data) => {
       const _user: User = _data['user'];
       console.log(`user with email: ${_user.email} retrieved`)
    },
    (err) => {
      console.log(`Error loading user account: ${err.error.message}`)
    } )
    this.userService.loadUserAccount(this.authenticationService.userValue.userId)
                      .subscribe(
                        (user) => {
                          this.user = user;
                          this.statusMessage = 'loading account information...' ;
                          console.log(`${this.statusMessage} for user with email: ${this.user.email}`);
                          this.showSuccess();
                        },
                        (err) =>{
                          this.statusMessage = "Failed to load account information";
                          console.log(`${this.statusMessage} :: ${err.error.statusText}`);
                          this.showError();
                        }
                      )

  }

  public logout(): void {
    this.userService.logout(this.authenticationService.userValue.userId)
                      .subscribe(
                        ()=> {
                          this.statusMessage = "logging out..."
                          this.showSuccess();
                          console.log(this.statusMessage);
                        },
                        (err)=> {
                          this.statusMessage = "Logout failed!";
                          this.showError();
                          console.log(`${this.statusMessage} :: ${err.error.statusText}`);
                        }
                      )
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }

}
