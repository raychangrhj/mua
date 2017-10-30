import { NgModule } from '@angular/core';

import { MortgageIntentRefinanceRoutingService } from './refinance-routing.service';
import { CanActivateQuestionsMortgageIntentAppraisal } from './appraisal/appraisal.guard';
import { CanActivateQuestionsMortgageIntentIntent } from './intent/intent.guard';
import { CanActivateQuestionsMortgageIntentLoanAmount } from './loan-amount/loan-amount.guard';
import { CanActivateQuestionsMortgageIntentLoans } from './loans/loans.guard';
import { CanActivateQuestionsMortgageIntentOwe } from './owe/owe.guard';
import { CanActivateQuestionsMortgageIntentPayments } from './payments/payment.guard';
import { CanActivateQuestionsMortgageIntentPrimaryUse } from './primary-use/primary-use.guard';
import { CanActivateQuestionsMortgageIntentPrimaryResidence } from './primary-residence/primary-residence.guard';
import { CanActivateQuestionsMortgageIntentLocation } from './property-location/property-location.guard';
import { CanActivateQuestionsMortgageIntentConfirm } from './confirm/confirm.guard';

@NgModule({
  providers: [
    MortgageIntentRefinanceRoutingService,
    CanActivateQuestionsMortgageIntentAppraisal,
    CanActivateQuestionsMortgageIntentIntent,
    CanActivateQuestionsMortgageIntentLoanAmount,
    CanActivateQuestionsMortgageIntentLoans,
    CanActivateQuestionsMortgageIntentOwe,
    CanActivateQuestionsMortgageIntentPayments,
    CanActivateQuestionsMortgageIntentPrimaryUse,
    CanActivateQuestionsMortgageIntentPrimaryResidence,
    CanActivateQuestionsMortgageIntentLocation,
    CanActivateQuestionsMortgageIntentConfirm
  ]
})
export class QuestionsMortgageIntentRefinanceCoreModule { }
