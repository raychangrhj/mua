import { NgModule } from '@angular/core';

import { CustomerRoutingService } from './customer-routing.service';
import { CanActivateQuestionsCustomerAddress } from './address/address.guard';
import { CanActivateQuestionsCustomerAddressInfo } from './address-info/address-info.guard';
import { CanActivateQuestionsCustomerMaritalStatus } from './marital-status/marital-status.guard';
import { CanActivateQuestionsCustomerConfirm } from './confirm/confirm.guard';

@NgModule({
  providers: [
    CustomerRoutingService,
    CanActivateQuestionsCustomerAddress,
    CanActivateQuestionsCustomerAddressInfo,
    CanActivateQuestionsCustomerMaritalStatus,
    CanActivateQuestionsCustomerConfirm
  ]
})
export class QuestionsCustomerCoreModule { }
