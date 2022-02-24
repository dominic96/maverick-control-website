import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';


/**
 * PrimeNG Modules
 */
import { ToastModule } from "primeng/toast";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { ProgressBarModule } from "primeng/progressbar";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    CardModule,
    InputTextModule,
    ProgressBarModule,
    ButtonModule
  ]
})
export class AuthenticationModule { }
