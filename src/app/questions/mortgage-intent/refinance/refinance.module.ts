import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CustomFormsModule } from 'ng2-validation';
import { EffectsModule } from '@ngrx/effects';

import { QuestionsMortgageIntentSharedModule } from '../shared/mortgage-intent-shared.module';
import { QuestionsMortgageIntentRefinanceRoutingModule } from './refinance-routes.module';
import { QuestionsMortgageIntentRefinanceIntentComponent } from './intent/intent.component';
import { QuestionsMortgageIntentRefinanceLoansComponent } from './loans/loans.component';
import { QuestionsMortgageIntentRefinanceOweComponent } from './owe/owe.component';
import { QuestionsMortgageIntentRefinancePaymentsComponent } from './payments/payments.component';
import { QuestionsMortgageIntentRefinanceAppraisalComponent } from './appraisal/appraisal.component';
import { QuestionsMortgageIntentRefinanceLoanAmountComponent } from './loan-amount/loan-amount.component';
import { reducers } from './ngrx/reducers/index.reducer';
import { QuestionsMortgageIntentRefinanceCoreModule } from './core/core.module';
import { PropertyLocationEffect } from '../shared/ngrx/effects/property-location.effect';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    StoreModule.forFeature('refinance', reducers),
    EffectsModule.forFeature([PropertyLocationEffect]),
    // our npm
    // our local
    QuestionsMortgageIntentRefinanceCoreModule,
    QuestionsMortgageIntentRefinanceRoutingModule,
    QuestionsMortgageIntentSharedModule
  ],
  declarations: [
    QuestionsMortgageIntentRefinanceIntentComponent,
    QuestionsMortgageIntentRefinanceLoansComponent,
    QuestionsMortgageIntentRefinanceOweComponent,
    QuestionsMortgageIntentRefinancePaymentsComponent,
    QuestionsMortgageIntentRefinanceAppraisalComponent,
    QuestionsMortgageIntentRefinanceLoanAmountComponent
  ]
})
export class QuestionsMortgageIntentRefinanceModule { }
