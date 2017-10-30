import { NgModule } from '@angular/core';

import { QuestionsIncomeRoutingModule } from './income-routes.module';
import { CleanQuestionsIncomeModule } from './clean-income.module';

@NgModule({
  imports: [
    // angular
    // third party
    // our npm
    // our local
    CleanQuestionsIncomeModule,
    QuestionsIncomeRoutingModule
  ]
})
export class QuestionsIncomeModule { }
