import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CanActivateQuestionsExistingCustomerConfirmAddress } from './confirm-address/confirm-address.guard';
import { AuthenticationService } from './authentication/authentication.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CanActivateQuestionsExistingCustomerConfirmAddress,
    AuthenticationService
  ]
})
export class QuestionsExistingCustomerCoreModule { }
