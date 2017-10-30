import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { QuestionsSharedModule } from '../../shared/shared.module';
import { QuestionsCoBorrowerIncomeRoutingModule } from './income-routes.module';
import { CleanQuestionsIncomeModule } from '../../income/clean-income.module';

@NgModule({
  imports: [
    // angular
    // third party
    // our npm
    // our local
    QuestionsCoBorrowerIncomeRoutingModule,
    SharedModule,
    QuestionsSharedModule,
    CleanQuestionsIncomeModule
  ]
})
export class QuestionsCoBorrowerIncomeModule { }
