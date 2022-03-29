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
import { CardModule } from "primeng/card";

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
import { ServicesModule } from "./services/services.module";
import { LoadUserResolver } from './utility/load-user.resolver';
import { JwtInterceptor } from './utility/jwt.interceptor';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

import { ProductsComponent } from './products/products.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { AboutUsComponent } from './about-us/about-us.component';





@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NotFoundComponent,
    HomePageComponent,
    ProductsComponent,
    ContactInfoComponent,
    AboutUsComponent,
 
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
    CardModule,
    AuthenticationModule,
    UserModule,
    ServicesModule
  ],
  bootstrap: [AppComponent],
  providers: [LoadUserResolver, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true}]
})
export class AppModule { }
