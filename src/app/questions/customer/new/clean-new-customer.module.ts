import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';

import { QuestionsNewCustomerNameComponent } from './name/name.component';
import { QuestionsNewCustomerPhoneComponent } from './phone/phone.component';
import { QuestionsNewCustomerEmailComponent } from './email/email.component';
import { QuestionsNewCustomerDOBComponent } from './dob/dob.component';
import { QuestionsNewCustomerSSNComponent } from './ssn/ssn.component';
import { QuestionsCustomerSharedModule } from '../shared/customer-shared.module';
import { QuestionsNewCustomerCoreModule } from './core/core.module';
import { QuestionsCustomerCoreModule } from '../core/core.module';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    RouterModule,
    // third party
    // our npm
    // our local
    QuestionsCustomerCoreModule,
    QuestionsNewCustomerCoreModule,
    QuestionsCustomerSharedModule
  ],
  declarations: [

  ],
  exports: [
    QuestionsCustomerCoreModule,
    QuestionsNewCustomerCoreModule,
    QuestionsCustomerSharedModule
  ]
})
export class CleanQuestionsNewCustomerModule { }
