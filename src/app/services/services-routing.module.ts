import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';
import { ServicesListComponent } from "./services-list/services-list.component";
import { EngineeringComponent } from "./engineering/engineering.component";
import { AutomationComponent } from "./automation/automation.component";
import { SecurityComponent } from "./security/security.component";

const routes: Routes = [
  {path: '', component: ServicesComponent,
  children: [
    {path: 'engineering', component: EngineeringComponent},
    {path: 'services/list', component: ServicesListComponent},
    {path: 'automation', component: AutomationComponent},
    {path: 'security', component: SecurityComponent}

    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
