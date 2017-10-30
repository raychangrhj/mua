import { NgModule } from '@angular/core';

import { QuestionsNewCustomerRoutingModule } from './new-customer-routes.module';
import { CleanQuestionsNewCustomerModule } from './clean-new-customer.module';

@NgModule({
  imports: [
    CleanQuestionsNewCustomerModule,
    QuestionsNewCustomerRoutingModule,
  ]
})
export class QuestionsNewCustomerModule { }
