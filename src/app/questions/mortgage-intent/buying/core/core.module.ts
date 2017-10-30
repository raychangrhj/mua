import { NgModule } from '@angular/core';

import { MortgageIntentBuyingRoutingService } from './buying-routing.service';
import { CanActivateQuestionsMortgageIntentConfirmLoanAmount } from './confirm-loan-amount/confirm-loan-amount.guard';
import { CanActivateQuestionsMortgageIntentConfirmLocation } from './confirm-location-details/confirm-location-details.guard';
import { CanActivateQuestionsMortgageIntentCost } from './cost/cost.guard';
import { CanActivateQuestionsMortgageIntentDownPayment } from './down-payment/down-payment.guard';
import { CanActivateQuestionsMortgageIntentProperty } from './property/property.guard';
import { CanActivateQuestionsMortgageIntentPrimaryResidence } from './primary-residence/primary-residence.guard';
import { CanActivateQuestionsMortgageIntentPrimaryUse } from './primary-use/primary-use.guard';
import { CanActivateQuestionsMortgageIntentPropertyLocation } from './property-location/property-location.guard';
import { CanActivateQuestionsMortgageIntentConfirm } from './confirm/cofirm.guard';

@NgModule({
  providers: [
    MortgageIntentBuyingRoutingService,
    CanActivateQuestionsMortgageIntentConfirmLoanAmount,
    CanActivateQuestionsMortgageIntentConfirmLocation,
    CanActivateQuestionsMortgageIntentCost,
    CanActivateQuestionsMortgageIntentDownPayment,
    CanActivateQuestionsMortgageIntentProperty,
    CanActivateQuestionsMortgageIntentPrimaryResidence,
    CanActivateQuestionsMortgageIntentPrimaryUse,
    CanActivateQuestionsMortgageIntentPropertyLocation,
    CanActivateQuestionsMortgageIntentConfirm
  ]
})
export class QuestionsMortgageIntentBuyingCoreModule { }
