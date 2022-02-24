import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

/**
 * PrimeNG Modules 
 */

import { ToastModule } from "primeng/toast";
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { AvatarModule } from "primeng/avatar";


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ToastModule,
    AvatarModule,
    SidebarModule,
    ButtonModule
  ]
})
export class UserModule { }
