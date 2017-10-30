import { NgModule } from '@angular/core';

import { CanActivateQuestionsNewCustomerName } from './name/name.guard';
import { CanActivateQuestionsNewCustomerEmail } from './email/email.guard';
import { CanActivateQuestionsNewCustomerDOB } from './dob/dob.guard';
import { CanActivateQuestionsNewCustomerPhone } from './phone/phone.guard';
import { CanActivateQuestionsNewCustomerSSN } from './ssn/ssn.guard';

@NgModule({
  providers: [
    CanActivateQuestionsNewCustomerDOB,
    CanActivateQuestionsNewCustomerEmail,
    CanActivateQuestionsNewCustomerName,
    CanActivateQuestionsNewCustomerPhone,
    CanActivateQuestionsNewCustomerSSN
  ]
})
export class QuestionsNewCustomerCoreModule { }
