import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from "./services.component";
import { ServicesListComponent } from './services-list/services-list.component';

/**PrimeNg Modules */
import { CardModule } from "primeng/card";
import { EngineeringComponent } from './engineering/engineering.component';
import { AutomationComponent } from './automation/automation.component';
import { SecurityComponent } from './security/security.component';

@NgModule({
  declarations: [
    ServicesComponent,
    ServicesListComponent,
    EngineeringComponent,
    AutomationComponent,
    SecurityComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    CardModule
  ]
})
export class ServicesModule { }
