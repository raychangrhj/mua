import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CustomFormsModule } from 'ng2-validation';

import { QuestionsMortgageIntentBuyingRoutingModule } from './buying-routes.module';
import { QuestionsMortgageIntentPropertyComponent } from './property/property.component';
import { QuestionsMortgageIntentConfirmLocationDetailsComponent } from './confirm-location-details/confirm-location-details.component';
import { QuestionsMortgageIntentSharedModule } from '../shared/mortgage-intent-shared.module';
import { QuestionsMortgageIntentBuyingCoreModule } from './core/core.module';
import { PropertyLocationEffect } from '../shared/ngrx/effects/property-location.effect';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    EffectsModule.forFeature([PropertyLocationEffect]),
    // our npm
    // our local
    QuestionsMortgageIntentBuyingRoutingModule,
    QuestionsMortgageIntentSharedModule,
    QuestionsMortgageIntentBuyingCoreModule
  ],
  declarations: [
    QuestionsMortgageIntentPropertyComponent,
    QuestionsMortgageIntentConfirmLocationDetailsComponent
  ]
})
export class QuestionsMortgageIntentBuyingModule { }
