import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomFormsModule } from 'ng2-validation';

import { QuestionsExistingCustomerHowToContinueComponent } from './how-to-continue/how-to-continue.component';
import { QuestionsExistingCustomerRoutingModule } from './existing-customer-routes.module';
import { QuestionsExistingCustomerLogInComponent } from './log-in/log-in.component';
import { QuestionsExistingCustomerSecurityQuestionsComponent } from './security-questions/security-questions.component';
import { QuestionsExistingCustomerAtmCardComponent } from './atm-card/atm-card.component';
import { QuestionsExistingCustomerConfirmAddressComponent } from './confirm-address/confirm-address.component';
import { QuestionsCustomerSharedModule } from '../shared/customer-shared.module';
import { QuestionsExistingCustomerCoreModule } from './core/core.module';
import { QuestionsCustomerCoreModule } from '../core/core.module';
import { AuthenticationEffects } from './ngrx/effects/authentication.effect';
import { reducer } from './ngrx/reducers/authentication.reducer';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    EffectsModule.forFeature([AuthenticationEffects]),
    StoreModule.forFeature('authentication', reducer),
    // our npm
    // our local
    QuestionsCustomerCoreModule,
    QuestionsExistingCustomerCoreModule,
    QuestionsExistingCustomerRoutingModule,
    QuestionsCustomerSharedModule
  ],
  declarations: [
    QuestionsExistingCustomerHowToContinueComponent,
    QuestionsExistingCustomerLogInComponent,
    QuestionsExistingCustomerSecurityQuestionsComponent,
    QuestionsExistingCustomerAtmCardComponent,
    QuestionsExistingCustomerConfirmAddressComponent
  ]
})
export class QuestionsExistingCustomerModule { }
