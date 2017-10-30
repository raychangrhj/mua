import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LenderComponent } from './lender/lender.component';
import { LoanOfficerManagerRoutingModule } from './loan-officer-manager-routes.module';

@NgModule({
  imports: [
    // angular
    CommonModule,
    // third party
    // our npm
    // our local
    LoanOfficerManagerRoutingModule
  ],
  declarations: [
    LenderComponent
  ]
})
export class LoanOfficerManagerModule { }
