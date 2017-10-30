import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CustomFormsModule } from 'ng2-validation';

import { SharedModule } from '../../../shared/shared.module';
import { QuestionsMortgageIntentPropertyLocationComponent } from './property-location/property-location.component';
import { QuestionsMortgageIntentPrimaryUseComponent } from './primary-use/primary-use.component';
import { QuestionsMortgageIntentPrimaryResidenceComponent } from './primary-residence/primary-residence.component';
import { QuestionsSharedModule } from '../../shared/shared.module';
import { reducers } from './ngrx/reducers/index.reducer';
import { QuestionsMortgageIntentDownPaymentComponent } from './down-payment/down-payment.component';
import { QuestionsMortgageIntentCostComponent } from './cost/cost.component';
import { QuestionsMortgageIntentConfirmLoanAmountComponent } from './confirm-loan-amount/confirm-loan-amount.component';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    StoreModule.forFeature('mortgageIntent', reducers),
    // our npm
    // our local
    SharedModule,
    QuestionsSharedModule
  ],
  declarations: [
    QuestionsMortgageIntentPropertyLocationComponent,
    QuestionsMortgageIntentPrimaryUseComponent,
    QuestionsMortgageIntentPrimaryResidenceComponent,
    QuestionsMortgageIntentDownPaymentComponent,
    QuestionsMortgageIntentCostComponent,
    QuestionsMortgageIntentConfirmLoanAmountComponent
  ],
  exports: [
    SharedModule,
    QuestionsSharedModule,
    QuestionsMortgageIntentPropertyLocationComponent,
    QuestionsMortgageIntentPrimaryUseComponent,
    QuestionsMortgageIntentPrimaryResidenceComponent,
    QuestionsMortgageIntentDownPaymentComponent,
    QuestionsMortgageIntentCostComponent,
    QuestionsMortgageIntentConfirmLoanAmountComponent
  ]
})
export class QuestionsMortgageIntentSharedModule { }
