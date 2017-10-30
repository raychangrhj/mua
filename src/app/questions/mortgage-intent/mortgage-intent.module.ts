import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { SharedModule } from '../../shared/shared.module';
import { QuestionsMortgageIntentComponent } from './mortgage-intent.component';
import { QuestionsMortgageIntentRoutingModule } from './mortgage-intent-routes.module';
import { QuestionsSharedModule } from '../shared/shared.module';
import { QuestionsMortgageIntentCoreModule } from './core/core.module';
import { QuestionsMortgageIntentSharedModule } from './shared/mortgage-intent-shared.module';

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
    SharedModule,
    QuestionsSharedModule,
    QuestionsMortgageIntentRoutingModule,
    QuestionsMortgageIntentCoreModule,
    QuestionsMortgageIntentSharedModule
  ],
  declarations: [
    QuestionsMortgageIntentComponent
  ]
})
export class QuestionsMortgageIntentModule { }
