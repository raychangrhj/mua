import { NgModule } from '@angular/core';

import { QuestionsCoBorrowerRoutingModule } from './co-borrower-routes.module';
import { SharedModule } from '../../shared/shared.module';
import { QuestionsSharedModule } from '../shared/shared.module';
import { CleanGeneralModule } from '../../general/clean-general.module';

@NgModule({
  imports: [
    // angular
    // third party
    // our npm
    // our local
    QuestionsCoBorrowerRoutingModule,
    SharedModule,
    QuestionsSharedModule,
    CleanGeneralModule
  ]
})
export class QuestionsCoBorrowerModule { }
