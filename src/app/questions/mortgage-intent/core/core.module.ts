import { NgModule } from '@angular/core';

import { MortgageIntentRoutingService } from './mortgage-intent-routing.service';
import { CanActivateQuestionsMortgageIntent } from './mortgage-intent/mortgage-intent.guard';
import { CustomerRoutingService } from '../../customer/core/customer-routing.service';
import { PropertyLocationService } from './property-location.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CustomerRoutingService,
    MortgageIntentRoutingService,
    CanActivateQuestionsMortgageIntent,
    PropertyLocationService
  ]
})
export class QuestionsMortgageIntentCoreModule { }
