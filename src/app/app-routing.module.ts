import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './utility/authentication.guard';


const routes: Routes = [
  {path: 'authenticate', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'user',loadChildren: ()=> import('./user/user.module').then(m => m.UserModule), canActivate: [AuthenticationGuard]},
  {path: 'root', component: AppComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
