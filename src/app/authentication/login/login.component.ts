import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize, first } from 'rxjs/operators';
import { User } from 'src/app/user/user';
import { AuthenticationService } from '../authentication.service';
import { Credentials } from '../credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  credentials: Credentials;
  loginForm: FormGroup;
  loading: boolean = false;
  statusMessage = '';
  user!: User;
  
  

  constructor(private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              private router: Router)
   { 
     this.loginForm = formBuilder.group({
       email: ['',Validators.required],
       password: ['' , Validators.required]
     });

     this.credentials = {email:'', password:''};
   }

  ngOnInit(): void {
  }



  /**
   * triggered from the html file
   */
  public login(): void {

    //if form is invalid report error and return to previous state
    if (this.loginForm.invalid) {
      this.statusMessage = 'email and/or password invalid';
      this.showError();
      return;
    }

    this.loading = true;
    console.log("Attempting to Login");
    this.credentials.email = this.loginForm.controls.email.value;
    this.credentials.password = this.loginForm.controls.password.value;

    this.authenticationService.login(this.credentials)
                                .pipe(first(), finalize( ()=> this.loading = false))
                                .subscribe(
                                  (resp) => {
                                    this.user = { ...resp.body!};
                                    //this.statusMessage = `Logged in User with email: ${user.email}`;
                                    const keys = resp.headers.keys();
                                    console.log("keys:: " + keys.length)
                                   
                                    console.log(this.statusMessage);
                                    this.showSuccess();
                                   
                                    this.router.navigate(['user'], {queryParams : {email: this.user.email}});

                                  },
                                  (err: Error) =>{
                                    this.statusMessage = `Failed to login User with Credentails: email: ${this.credentials.email}:`;
                                    console.log(this.statusMessage + err.message);
                                    console.error("login error", err.message);
                                    
                                    
                                    this.showError();
                                  }
                                )




  }

  /**
   * Triggered from the html and navigates to the signUp page
   */
  public signUp() {

  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }


}
