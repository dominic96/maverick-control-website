import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


/**
 * ngprime modules
 * */
import { InputText, InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { TabViewModule } from "primeng/tabview";
import { DataViewModule } from "primeng/dataview";
import { PanelModule } from "primeng/panel";
import { RippleModule } from "primeng/ripple";
import { DialogModule } from "primeng/dialog";

/**
 * Project Modules
 * 
 */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


/**
 * Feature Modules
 */

import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';





@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    PasswordModule,
    ButtonModule,
    SidebarModule,
    TabViewModule,
    DataViewModule,
    PanelModule,
    RippleModule,
    DialogModule,
    AuthenticationModule,
    UserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
