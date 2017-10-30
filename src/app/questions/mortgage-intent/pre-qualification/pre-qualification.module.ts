import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { QuestionsMortgageIntentPreQualificationRoutingModule } from './pre-qualification-routes.module';
import { QuestionsMortgageIntentSharedModule } from '../shared/mortgage-intent-shared.module';
import { QuestionsMortgageIntentPreQualificationOnBoardingComponent } from './on-boarding/on-boarding.component';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    // our npm
    // our local
    QuestionsMortgageIntentPreQualificationRoutingModule,
    QuestionsMortgageIntentSharedModule,
  ],
  declarations: [
    QuestionsMortgageIntentPreQualificationOnBoardingComponent
  ]
})
export class QuestionsMortgageIntentPreQualificationModule { }
