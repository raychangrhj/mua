import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { QuestionsSharedModule } from '../../shared/shared.module';
import { QuestionsCoBorrowerRequiredQuestionsRoutingModule } from './required-questions-routes.module';
import { CleanQuestionsRequiredQuestionsModule } from '../../required-questions/clean-required-questions.module';

@NgModule({
  imports: [
    // angular
    // third party
    // our npm
    // our local
    QuestionsCoBorrowerRequiredQuestionsRoutingModule,
    SharedModule,
    QuestionsSharedModule,
    CleanQuestionsRequiredQuestionsModule
  ]
})
export class QuestionsCoBorrowerRequiredQuestionsModule { }
