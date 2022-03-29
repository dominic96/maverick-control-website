import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { AuthenticationGuard } from './utility/authentication.guard';
import { LoadUserResolver } from './utility/load-user.resolver';



const routes: Routes = [
  {path: 'authenticate', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'user',loadChildren: ()=> import('./user/user.module').then(m => m.UserModule), 
    canActivate: [AuthenticationGuard],
    resolve: {user: LoadUserResolver}
  },

  /** new paths for the new project  */
  {path: 'landing/page', component: LandingPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'services', loadChildren: ()=> import('./services/services.module').then(m => m.ServicesModule)},
  {path: 'contact/info', component: ContactInfoComponent},
{path: 'about/maverick', component: AboutUsComponent},
  {path: '404', component: NotFoundComponent},
  {path: 'root', component: AppComponent},
  {path: '**', redirectTo: '404'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
