import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LENDER_PROVIDER } from './providers/lender.provider';
import { LenderService } from './services/lender.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    LenderService,
    LENDER_PROVIDER
  ]
})
export class RegionsManagingLoanOfficerModule { }
