import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { QuestionsSharedModule } from '../../shared/shared.module';
import { CleanQuestionsNewCustomerModule } from '../../customer/new/clean-new-customer.module';
import { QuestionsCoBorrowerPersonalInformationRoutingModule } from './personal-information-routes.module';

@NgModule({
  imports: [
    // angular
    // third party
    // our npm
    // our local
    QuestionsCoBorrowerPersonalInformationRoutingModule,
    SharedModule,
    QuestionsSharedModule,
    CleanQuestionsNewCustomerModule,
  ]
})
export class QuestionsCoBorrowerPersonalInformationModule { }
