import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { QuestionsSharedModule } from '../../shared/shared.module';
import { QuestionsCoBorrowerAssetsRoutingModule } from './assets-routes.module';
import { CleanQuestionsAssetsModule } from '../../assets/clean-assets.module';

@NgModule({
  imports: [
    // angular
    // third party
    // our npm
    // our local
    QuestionsCoBorrowerAssetsRoutingModule,
    SharedModule,
    QuestionsSharedModule,
    CleanQuestionsAssetsModule
  ]
})
export class QuestionsCoBorrowerAssetsModule { }
