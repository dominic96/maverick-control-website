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
import { EmployeeComponent } from './employee/employee.component';
import { AdminstratorComponent } from './adminstrator/adminstrator.component';


@NgModule({
  declarations: [
    UserComponent,
    EmployeeComponent,
    AdminstratorComponent
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
