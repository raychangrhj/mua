import { NgModule } from '@angular/core';

import { QuestionsRequiredQuestionsRoutingModule } from './required-questions-routes.module';
import { CleanQuestionsRequiredQuestionsModule } from './clean-required-questions.module';

@NgModule({
  imports: [
    CleanQuestionsRequiredQuestionsModule,
    QuestionsRequiredQuestionsRoutingModule
  ]
})
export class QuestionsRequiredQuestionsModule { }
