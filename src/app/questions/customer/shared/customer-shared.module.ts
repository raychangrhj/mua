import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CustomFormsModule } from 'ng2-validation';

import { QuestionsCustomerAddressComponent } from './address/address.component';
import { QuestionsCustomerAddressInfoComponent } from './address-info/address-info.component';
import { QuestionsCustomerMaritalStatusComponent } from './marital-status/marital-status.component';
import { SharedModule } from '../../../shared/shared.module';
import { customerReducer } from './ngrx/reducers/index.reducer';
import { QuestionsSharedModule } from '../../shared/shared.module';
import { QuestionsNewCustomerSSNComponent } from '../new/ssn/ssn.component';
import { QuestionsNewCustomerDOBComponent } from '../new/dob/dob.component';
import { QuestionsNewCustomerEmailComponent } from '../new/email/email.component';
import { QuestionsNewCustomerPhoneComponent } from '../new/phone/phone.component';
import { QuestionsNewCustomerNameComponent } from '../new/name/name.component';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    StoreModule.forFeature('customer', customerReducer),
    // our npm
    // our local
    SharedModule,
    QuestionsSharedModule
  ],
  declarations: [
    QuestionsCustomerAddressComponent,
    QuestionsCustomerAddressInfoComponent,
    QuestionsCustomerMaritalStatusComponent,
    QuestionsNewCustomerNameComponent,
    QuestionsNewCustomerPhoneComponent,
    QuestionsNewCustomerEmailComponent,
    QuestionsNewCustomerDOBComponent,
    QuestionsNewCustomerSSNComponent
  ],
  exports: [
    SharedModule,
    QuestionsSharedModule,
    QuestionsCustomerAddressComponent,
    QuestionsCustomerAddressInfoComponent,
    QuestionsCustomerMaritalStatusComponent
  ]
})
export class QuestionsCustomerSharedModule { }
