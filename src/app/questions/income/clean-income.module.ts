import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CustomFormsModule } from 'ng2-validation';

import { QuestionsIncomeEmploymentCompanyNameComponent } from './employment/company-name/company-name.component';
import { QuestionsIncomeEmploymentTitleComponent } from './employment/title/title.component';
import { QuestionsIncomeEmploymentCompanyLocationComponent } from './employment/company-location/company-location.component';
import { QuestionsIncomeEmploymentMonthlyIncomeComponent } from './employment/monthly-income/monthly-income.component';
import { QuestionsIncomeEmploymentDurationComponent } from './employment/duration/employment-duration.component';
import { QuestionsIncomeOtherIncomeAmountComponent } from './other/income-amount/income-amount.component';
import { QuestionsIncomeOtherIncomeTypeComponent } from './other/type/type.component';
import { QuestionsIncomeRentalLocationComponent } from './other/rental-location/rental-location.component';
import { SharedModule } from '../../shared/shared.module';
import { QuestionsSharedModule } from '../shared/shared.module';
import { QuestionsIncomeCoreModule } from './core/core.module';
import { QuestionsIncomeCurrentEmploymentComponent } from './employment/current-employment.component';
import { QuestionsIncomePreviousEmploymentComponent } from './employment/previous-employment.component';
import { QuestionsIncomeOtherIncomeComponent } from './other/other-income.component';
import { incomeReducer } from './ngrx/reducers/index.reducer';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    RouterModule,
    // third party
    StoreModule.forFeature('income', incomeReducer),
    // our npm
    // our local
    SharedModule,
    QuestionsSharedModule,
    QuestionsIncomeCoreModule,
  ],
  declarations: [
    QuestionsIncomeEmploymentCompanyNameComponent,
    QuestionsIncomeEmploymentTitleComponent,
    QuestionsIncomeEmploymentCompanyLocationComponent,
    QuestionsIncomeEmploymentMonthlyIncomeComponent,
    QuestionsIncomeEmploymentDurationComponent,
    QuestionsIncomeOtherIncomeAmountComponent,
    QuestionsIncomeOtherIncomeTypeComponent,
    QuestionsIncomeRentalLocationComponent,
    QuestionsIncomeCurrentEmploymentComponent,
    QuestionsIncomePreviousEmploymentComponent,
    QuestionsIncomeOtherIncomeComponent,
  ],
  exports: [
    SharedModule,
    QuestionsSharedModule,
    QuestionsIncomeCoreModule,
  ]
})
export class CleanQuestionsIncomeModule { }
